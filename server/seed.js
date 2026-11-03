import db, { initDatabase } from './db.js';

/**
 * Seeds the database with clean placeholder demo data.
 * All data uses placeholder names (no real people) and DD/MM/YYYY dates.
 */
export function seedDatabase() {
  initDatabase();

  // Clear existing rows before seeding
  db.exec(`
    DELETE FROM endorsements;
    DELETE FROM achievements;
    DELETE FROM certifications;
    DELETE FROM courses;
    DELETE FROM staff;
    DELETE FROM students;
  `);

  // 1. Seed Placeholder Student
  const insertStudent = db.prepare(`
    INSERT INTO students (
      id, full_name, email, student_id, programme, faculty,
      year_of_study, gpa, academic_standing, about_me,
      result_slip_url, result_slip_name, result_slip_uploaded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStudent.run(
    'stu-demo-001',
    'Demo Student',
    'student.demo@university.edu',
    'AU-2026-0001',
    'B.Sc. Computer Information Systems',
    'Faculty of Engineering & Applied Sciences',
    'Year 3',
    '3.84',
    'Good Standing · Dean\'s List',
    'Passionate undergraduate focusing on web systems, database architectures, and distributed systems. Committed to maintaining a verified, documented academic portfolio.',
    'https://placehold.co/800x1100/FAF9F6/1E1E24.png?text=Official+Result+Slip+Demo',
    'Official_Result_Slip_Demo.pdf',
    '18/10/2026'
  );

  // 2. Seed Placeholder Academic Staff
  const insertStaff = db.prepare(`
    INSERT INTO staff (id, name, title, department, email)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertStaff.run(
    'staff-demo-001',
    'Demo Academic Staff',
    'Senior Lecturer & Head of Department',
    'Department of Computer Science',
    'staff.demo@university.edu'
  );

  insertStaff.run(
    'staff-demo-002',
    'Second Academic Staff Demo',
    'Associate Professor',
    'Department of Information Systems',
    'staff2.demo@university.edu'
  );

  // 3. Seed Courses (Claims: Endorsed & Self-Reported)
  const insertCourse = db.prepare(`
    INSERT INTO courses (
      id, student_id, code, title, grade, credits, semester,
      instructor_name, status, endorsed_by, verified_at,
      verification_hash, evidence_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCourse.run(
    'c-1',
    'stu-demo-001',
    'CSC 301',
    'Advanced Web & Enterprise Systems',
    'A',
    4,
    'Semester 1, 2026',
    'Demo Academic Staff',
    'Endorsed',
    'Demo Academic Staff',
    '15/06/2026',
    'AU-SIM-2026-301A',
    'Department Academic Record (Simulated)'
  );

  insertCourse.run(
    'c-2',
    'stu-demo-001',
    'CSC 204',
    'Data Structures & Algorithms',
    'A-',
    4,
    'Semester 2, 2025',
    'Demo Academic Staff',
    'Endorsed',
    'Demo Academic Staff',
    '20/11/2025',
    'AU-SIM-2025-204A',
    'Department Academic Record (Simulated)'
  );

  insertCourse.run(
    'c-3',
    'stu-demo-001',
    'CSC 102',
    'Introductory Programming & Logic',
    'B+',
    3,
    'Semester 1, 2025',
    'Demo Academic Staff',
    'Self-Reported',
    null,
    null,
    null,
    'Self-Reported Grade (Awaiting Review)'
  );

  // 4. Seed Certifications (Claims: Endorsed & Self-Reported)
  const insertCert = db.prepare(`
    INSERT INTO certifications (
      id, student_id, title, issuer, issue_date, credential_id,
      credential_url, image_url, status, endorsed_by, verified_at, verification_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCert.run(
    'cert-1',
    'stu-demo-001',
    'Cloud Practitioner Certificate Demo',
    'Cloud Training Academy (Demo)',
    '15/01/2026',
    'DEMO-VAL-99214',
    'https://example.edu/verify/DEMO-VAL-99214',
    'https://placehold.co/900x650/F8F7F5/1E1E24.png?text=Cloud+Certificate+Demo',
    'Endorsed',
    'Demo Academic Staff',
    '15/01/2026',
    'DEMO-SIM-99214'
  );

  insertCert.run(
    'cert-2',
    'stu-demo-001',
    'Database Systems Associate',
    'Database Institute (Demo)',
    '10/08/2026',
    'DEMO-DB-401',
    null,
    null,
    'Self-Reported',
    null,
    null,
    null
  );

  // 5. Seed Achievements (Claims: Endorsed, Self-Reported & Rejected)
  const insertAchievement = db.prepare(`
    INSERT INTO achievements (
      id, student_id, title, organization, year, description,
      image_url, status, endorsed_by, verified_at, verification_hash, evidence_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAchievement.run(
    'ach-1',
    'stu-demo-001',
    'Dean\'s Academic Honor List',
    'Faculty of Engineering & Applied Sciences',
    '2025 - 2026',
    'Awarded for maintaining a semester GPA in the top 5% of the cohort.',
    'https://placehold.co/900x650/FAF0F1/A51C30.png?text=Dean+Honor+List+Demo',
    'Endorsed',
    'Demo Academic Staff',
    '10/02/2026',
    'AU-SIM-HON-889',
    'Faculty Dean Honor Roll (Simulated)'
  );

  insertAchievement.run(
    'ach-2',
    'stu-demo-001',
    'Winner - National FinTech Hackathon 2026',
    'National Innovation Hub (Demo)',
    '2026',
    'Awarded 1st place for low-bandwidth mobile financial inclusion prototype.',
    'https://placehold.co/900x650/F0F9FF/0369A1.png?text=Hackathon+Certificate+Proof',
    'Self-Reported',
    null,
    null,
    null,
    'Student Submission (Awaiting Academic Staff Review)'
  );

  insertAchievement.run(
    'ach-3',
    'stu-demo-001',
    'Extracurricular Workshop Participation',
    'External Organization (Demo)',
    '2024',
    'Participation in community outreach technology seminar.',
    null,
    'Rejected',
    'Demo Academic Staff',
    '05/03/2026',
    null,
    'Rejected: Missing Verification Documentation'
  );

  // 6. Seed Endorsements Audit Trail
  const insertEndorsement = db.prepare(`
    INSERT INTO endorsements (
      id, claim_type, claim_id, staff_id, staff_name, action, notes, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertEndorsement.run(
    'end-1',
    'course',
    'c-1',
    'staff-demo-001',
    'Demo Academic Staff',
    'Endorsed',
    'Course performance verified against departmental records.',
    '15/06/2026'
  );

  insertEndorsement.run(
    'end-2',
    'achievement',
    'ach-1',
    'staff-demo-001',
    'Demo Academic Staff',
    'Endorsed',
    'Dean Honor Roll membership verified.',
    '10/02/2026'
  );

  console.log('✓ SQLite database initialized and seeded successfully with placeholder data.');
}

// Run directly when called via `node seed.js`
seedDatabase();
