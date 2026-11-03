import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DB_PATH = path.join(__dirname, 'database.sqlite');

// Connect to SQLite: uses better-sqlite3 when available, or Node's built-in SQLite engine
let db;
try {
  const BetterSqlite3 = (await import('better-sqlite3')).default;
  db = new BetterSqlite3(DB_PATH);
} catch {
  // Built-in synchronous SQLite in Node.js (Node 22+)
  const { DatabaseSync } = await import('node:sqlite');
  db = new DatabaseSync(DB_PATH);
}

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

/**
 * Initializes all required tables for the Africa University Student Record Portal.
 * Each claim (course, certification, achievement) includes a status column:
 * 'Self-Reported', 'Endorsed', or 'Rejected', plus an 'endorsed_by' column.
 */
export function initDatabase() {
  db.exec(`
    -- 1. Students: Profile & Academic Standing
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      student_id TEXT NOT NULL UNIQUE,
      programme TEXT NOT NULL,
      faculty TEXT NOT NULL,
      year_of_study TEXT NOT NULL,
      gpa TEXT NOT NULL,
      academic_standing TEXT NOT NULL,
      about_me TEXT,
      result_slip_url TEXT,
      result_slip_name TEXT,
      result_slip_uploaded_at TEXT
    );

    -- 2. Academic Staff: Reviewers and Verifiers
    CREATE TABLE IF NOT EXISTS staff (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    -- 3. Courses & Results (Claims)
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      code TEXT NOT NULL,
      title TEXT NOT NULL,
      grade TEXT NOT NULL,
      credits INTEGER NOT NULL,
      semester TEXT NOT NULL,
      instructor_name TEXT,
      status TEXT NOT NULL CHECK(status IN ('Self-Reported', 'Endorsed', 'Rejected')),
      endorsed_by TEXT,
      verified_at TEXT,
      verification_hash TEXT,
      evidence_name TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    -- 4. Certifications & External Credentials (Claims)
    CREATE TABLE IF NOT EXISTS certifications (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      credential_id TEXT,
      credential_url TEXT,
      image_url TEXT,
      status TEXT NOT NULL CHECK(status IN ('Self-Reported', 'Endorsed', 'Rejected')),
      endorsed_by TEXT,
      verified_at TEXT,
      verification_hash TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    -- 5. Achievements & Awards (Claims)
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      year TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      status TEXT NOT NULL CHECK(status IN ('Self-Reported', 'Endorsed', 'Rejected')),
      endorsed_by TEXT,
      verified_at TEXT,
      verification_hash TEXT,
      evidence_name TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    -- 6. Endorsements: Audit trail of verification actions
    CREATE TABLE IF NOT EXISTS endorsements (
      id TEXT PRIMARY KEY,
      claim_type TEXT NOT NULL CHECK(claim_type IN ('course', 'certification', 'achievement')),
      claim_id TEXT NOT NULL,
      staff_id TEXT NOT NULL,
      staff_name TEXT NOT NULL,
      action TEXT NOT NULL CHECK(action IN ('Endorsed', 'Rejected')),
      notes TEXT,
      created_at TEXT NOT NULL
    );
  `);
}

export default db;
