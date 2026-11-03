import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db, { initDatabase } from './db.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database tables
initDatabase();

// -------------------------------------------------------------
// Helper: Format date as DD/MM/YYYY
// -------------------------------------------------------------
function getTodayDDMMYYYY() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// -------------------------------------------------------------
// Middleware Layer
// -------------------------------------------------------------

// 1. Cross-Origin Resource Sharing
app.use(cors());

// 2. JSON body parser
app.use(express.json({ limit: '10mb' }));

// 3. Simple Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 4. Role Authorization Middleware: Only Academic Staff can endorse/reject
export function requireAcademicStaff(req, res, next) {
  const role = req.headers['x-user-role'] || req.query.role;
  if (role !== 'academic-staff' && role !== 'staff') {
    return res.status(403).json({
      error: 'Access denied: Only Academic Staff can review, endorse, or reject student claims.',
      requiredRole: 'academic-staff',
      receivedRole: role || 'unauthenticated'
    });
  }
  next();
}

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// Root health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AU Student Record API', time: getTodayDDMMYYYY() });
});

/**
 * GET /api/staff
 * Lists or searches academic staff directory with university emails
 */
app.get('/api/staff', (req, res, next) => {
  try {
    const { q } = req.query;
    if (q) {
      const term = `%${q}%`;
      const staffMembers = db.prepare(`
        SELECT * FROM staff 
        WHERE name LIKE ? OR email LIKE ? OR department LIKE ?
        ORDER BY name ASC
      `).all(term, term, term);
      return res.json(staffMembers);
    }
    const staffMembers = db.prepare('SELECT * FROM staff ORDER BY name ASC').all();
    res.json(staffMembers);
  } catch (err) {
    next(err);
  }
});

/**
 * 1. GET /api/students/:id
 * Returns complete student profile with courses, certifications, achievements, and claims
 */
app.get('/api/students/:id', (req, res, next) => {
  try {
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);

    if (!student) {
      return res.status(404).json({ error: `Student with ID "${req.params.id}" not found.` });
    }

    const courses = db.prepare('SELECT * FROM courses WHERE student_id = ?').all(student.id);
    const certifications = db.prepare('SELECT * FROM certifications WHERE student_id = ?').all(student.id);
    const achievements = db.prepare('SELECT * FROM achievements WHERE student_id = ?').all(student.id);

    res.json({
      ...student,
      courses,
      certifications,
      achievements
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 2. POST /api/certifications
 * Submits a new certification claim with status 'Self-Reported'
 */
app.post('/api/certifications', (req, res, next) => {
  try {
    const {
      studentId,
      title,
      issuer,
      issueDate,
      credentialId,
      credentialUrl,
      imageUrl
    } = req.body;

    if (!studentId || !title || !issuer) {
      return res.status(400).json({ error: 'Missing required fields: studentId, title, and issuer are required.' });
    }

    const id = 'cert-' + Date.now();
    const formattedDate = issueDate || getTodayDDMMYYYY();

    const insert = db.prepare(`
      INSERT INTO certifications (
        id, student_id, title, issuer, issue_date, credential_id,
        credential_url, image_url, status, endorsed_by, verified_at, verification_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Self-Reported', NULL, NULL, NULL)
    `);

    insert.run(
      id,
      studentId,
      title,
      issuer,
      formattedDate,
      credentialId || null,
      credentialUrl || null,
      imageUrl || null
    );

    const created = db.prepare('SELECT * FROM certifications WHERE id = ?').get(id);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

/**
 * 3. POST /api/achievements
 * Submits a new achievement claim with status 'Self-Reported'
 */
app.post('/api/achievements', (req, res, next) => {
  try {
    const {
      studentId,
      title,
      organization,
      year,
      description,
      imageUrl
    } = req.body;

    if (!studentId || !title || !organization) {
      return res.status(400).json({ error: 'Missing required fields: studentId, title, and organization are required.' });
    }

    const id = 'ach-' + Date.now();
    const achYear = year || new Date().getFullYear().toString();

    const insert = db.prepare(`
      INSERT INTO achievements (
        id, student_id, title, organization, year, description,
        image_url, status, endorsed_by, verified_at, verification_hash, evidence_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Self-Reported', NULL, NULL, NULL, 'Self-Reported Claim (Awaiting Staff Review)')
    `);

    insert.run(
      id,
      studentId,
      title,
      organization,
      achYear,
      description || '',
      imageUrl || null
    );

    const created = db.prepare('SELECT * FROM achievements WHERE id = ?').get(id);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

/**
 * 4. GET /api/staff/queue
 * Returns records and claims awaiting academic staff review (status = 'Self-Reported')
 */
app.get('/api/staff/queue', (req, res, next) => {
  try {
    // Collect all pending claims across the three claim tables
    const pendingCourses = db.prepare(`
      SELECT c.*, s.full_name as student_name, s.student_id as student_uni_id, 'course' as claim_type
      FROM courses c
      JOIN students s ON c.student_id = s.id
      WHERE c.status = 'Self-Reported'
    `).all();

    const pendingCertifications = db.prepare(`
      SELECT cert.*, s.full_name as student_name, s.student_id as student_uni_id, 'certification' as claim_type
      FROM certifications cert
      JOIN students s ON cert.student_id = s.id
      WHERE cert.status = 'Self-Reported'
    `).all();

    const pendingAchievements = db.prepare(`
      SELECT a.*, s.full_name as student_name, s.student_id as student_uni_id, 'achievement' as claim_type
      FROM achievements a
      JOIN students s ON a.student_id = s.id
      WHERE a.status = 'Self-Reported'
    `).all();

    const allPending = [...pendingCourses, ...pendingCertifications, ...pendingAchievements];

    res.json({
      count: allPending.length,
      queue: allPending
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 5. PATCH /api/claims/:id/endorse
 * Protected by requireAcademicStaff middleware:
 * Endorses or Rejects a student claim and logs an audit record in 'endorsements'
 */
app.patch('/api/claims/:id/endorse', requireAcademicStaff, (req, res, next) => {
  try {
    const claimId = req.params.id;
    const { claimType, action, notes, staffId, staffName } = req.body;

    if (!claimType || !action || !['Endorsed', 'Rejected'].includes(action)) {
      return res.status(400).json({
        error: 'Invalid request: "claimType" (course, certification, or achievement) and "action" (Endorsed or Rejected) are required.'
      });
    }

    const today = getTodayDDMMYYYY();
    const verifierName = staffName || 'Academic Staff Reviewer (Simulated)';
    const verificationHash = action === 'Endorsed' ? `AU-SIM-${Math.random().toString(36).substring(2, 7).toUpperCase()}` : null;

    let updatedClaim = null;

    if (claimType === 'course') {
      const update = db.prepare(`
        UPDATE courses 
        SET status = ?, endorsed_by = ?, verified_at = ?, verification_hash = ?
        WHERE id = ?
      `);
      const result = update.run(action, verifierName, today, verificationHash, claimId);
      if (result.changes === 0) return res.status(404).json({ error: `Course claim "${claimId}" not found.` });
      updatedClaim = db.prepare('SELECT * FROM courses WHERE id = ?').get(claimId);

    } else if (claimType === 'certification') {
      const update = db.prepare(`
        UPDATE certifications 
        SET status = ?, endorsed_by = ?, verified_at = ?, verification_hash = ?
        WHERE id = ?
      `);
      const result = update.run(action, verifierName, today, verificationHash, claimId);
      if (result.changes === 0) return res.status(404).json({ error: `Certification claim "${claimId}" not found.` });
      updatedClaim = db.prepare('SELECT * FROM certifications WHERE id = ?').get(claimId);

    } else if (claimType === 'achievement') {
      const update = db.prepare(`
        UPDATE achievements 
        SET status = ?, endorsed_by = ?, verified_at = ?, verification_hash = ?
        WHERE id = ?
      `);
      const result = update.run(action, verifierName, today, verificationHash, claimId);
      if (result.changes === 0) return res.status(404).json({ error: `Achievement claim "${claimId}" not found.` });
      updatedClaim = db.prepare('SELECT * FROM achievements WHERE id = ?').get(claimId);

    } else {
      return res.status(400).json({ error: `Invalid claimType: "${claimType}". Must be "course", "certification", or "achievement".` });
    }

    // Insert audit log in endorsements table
    const endorsementId = 'end-' + Date.now();
    db.prepare(`
      INSERT INTO endorsements (
        id, claim_type, claim_id, staff_id, staff_name, action, notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      endorsementId,
      claimType,
      claimId,
      staffId || 'staff-demo-001',
      verifierName,
      action,
      notes || `Claim status updated to ${action}`,
      today
    );

    res.json({
      message: `Claim successfully ${action.toLowerCase()}.`,
      claim: updatedClaim,
      endorsementId
    });
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------------------
// Global Error Handler Middleware
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: err.message || 'Internal server error occurred.' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`✓ AU Student Record API listening on http://localhost:${PORT}`);
});
