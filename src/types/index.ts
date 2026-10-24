export type UserRole = 'student' | 'lecturer';

export type RequestStatus = 'Pending' | 'In Review' | 'Completed' | 'Declined';

export type RequestPurpose = 
  | 'Scholarship' 
  | 'Internship' 
  | 'Job Application' 
  | 'Graduate School' 
  | 'Research Fellowship'
  | 'Exchange Programme';

export interface Course {
  id: string;
  code: string;
  title: string;
  grade: string;
  credits: number;
  semester: string;
  lecturerName?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Domain';
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced';
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
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  imageUrl?: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  imageUrl?: string;
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
