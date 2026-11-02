export type UserRole = 'student' | 'lecturer';

export type RequestStatus = 'Pending' | 'In Review' | 'Completed' | 'Declined';

export type RequestPurpose = 
  | 'Scholarship' 
  | 'Internship' 
  | 'Job Application' 
  | 'Graduate School' 
  | 'Research Fellowship'
  | 'Exchange Programme';

export type VerificationStatus = 
  | 'verified-institution' // Verified by Africa University Registrar or Faculty Honours Board
  | 'verified-issuer'      // Cryptographically verified by external vendor (AWS, Cisco, Google)
  | 'pending-review'       // Uploaded evidence awaiting referee/supervisor accreditation
  | 'unverified';          // Self-reported by student without verified evidence

export interface VerificationMetadata {
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
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
  lecturerName?: string;
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
  issueDate: string;
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
  resultSlipUploadedAt?: string;
  courses: Course[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  leadership: Leadership[];
}


export interface RecommendationRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentProgramme: string;
  studentYear: string;
  lecturerId: string;
  lecturerName: string;
  lecturerDepartment: string;
  purpose: RequestPurpose;
  deadline: string;
  shortNote: string;
  status: RequestStatus;
  submittedAt: string;
  resultSlipUrl?: string;
  relevantCourses: {
    code: string;
    title: string;
    grade: string;
  }[];
  generatedLetter?: string;
}


export interface Lecturer {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  taughtCourses: string[];
}
