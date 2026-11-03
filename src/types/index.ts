// User Roles in the portal: Students build verified records, Academic Staff review and verify claims
export type UserRole = 'student' | 'academic-staff';

// Status of an optional recommendation letter request
export type RequestStatus = 'Pending' | 'In Review' | 'Completed' | 'Declined';

export type RequestPurpose = 
  | 'Scholarship' 
  | 'Internship' 
  | 'Job Application' 
  | 'Graduate School' 
  | 'Research Fellowship'
  | 'Exchange Programme';

// Verification status of an academic record item (Simulated demo)
export type VerificationStatus = 
  | 'verified-institution' // Verified by Academic Staff or Faculty Board (Simulated)
  | 'verified-issuer'      // Verified by External Issuer / Credential Registry (Simulated)
  | 'pending-review'       // Uploaded evidence awaiting academic staff verification
  | 'unverified';          // Self-reported by student without verified evidence

export interface VerificationMetadata {
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string; // Format: DD/MM/YYYY
  verificationHash?: string;
  issuerRegistryUrl?: string;
  evidenceName?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  grade: string;
  credits: number;
  semester: string;
  instructorName?: string; // Academic Staff member teaching the course
  lecturerName?: string;   // Backward-compatible alias
  verification?: VerificationMetadata;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Domain';
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced';
  endorsedBy?: string[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
  period: string;
  imageUrl?: string;
  verification?: VerificationMetadata;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // Format: DD/MM/YYYY
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  verification?: VerificationMetadata;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  imageUrl?: string;
  verification?: VerificationMetadata;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  imageUrl?: string;
  verification?: VerificationMetadata;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  studentId: string;
  programme: string;
  faculty: string;
  yearOfStudy: string;
  gpa: string;
  academicStanding: string;
  aboutMe: string;
  avatarUrl?: string;
  resultSlipUrl?: string;
  resultSlipName?: string;
  resultSlipUploadedAt?: string; // Format: DD/MM/YYYY
  courses: Course[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  leadership: Leadership[];
}

// Optional recommendation letter request attached to a verified academic record
export interface RecommendationRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentProgramme: string;
  studentYear: string;
  staffId: string;
  staffName: string;
  staffDepartment: string;
  // Aliases for compatibility
  lecturerId?: string;
  lecturerName?: string;
  lecturerDepartment?: string;
  purpose: RequestPurpose;
  deadline: string; // Format: DD/MM/YYYY
  shortNote: string;
  status: RequestStatus;
  submittedAt: string; // Format: DD/MM/YYYY
  resultSlipUrl?: string;
  relevantCourses: {
    code: string;
    title: string;
    grade: string;
  }[];
  generatedLetter?: string;
}

// Academic Staff member who reviews and verifies student claims
export interface AcademicStaff {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  taughtCourses: string[];
}

// Backward-compatible alias for Lecturer
export type Lecturer = AcademicStaff;
