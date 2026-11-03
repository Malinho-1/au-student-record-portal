import type { StudentProfile, RecommendationRequest, AcademicStaff, Lecturer } from '../types';
import { SAMPLE_RESULT_SLIP, SAMPLE_CERTIFICATE_AWS, SAMPLE_CERTIFICATE_DEANS } from './sampleDocuments';

export const initialStudent: StudentProfile = {
  id: 'stu-au-2023-0492',
  fullName: 'Tapiwa Moyo',
  email: 'student.demo@university.edu',
  studentId: 'AU-2023-0492',
  programme: 'B.Sc. Computer Information Systems',
  faculty: 'Faculty of Engineering & Applied Sciences',
  yearOfStudy: 'Year 3',
  gpa: '3.84',
  academicStanding: 'Good Standing · Dean\'s List',
  aboutMe: 'Passionate computer science undergraduate with deep interest in web applications, distributed systems, and educational tech. Proven track record of consistent high academic performance and collaborative project leadership.',
  resultSlipUrl: SAMPLE_RESULT_SLIP,
  resultSlipName: 'AU_Official_Result_Slip_Semester1_2026.pdf',
  resultSlipUploadedAt: '18/10/2026', // Standardized DD/MM/YYYY
  courses: [
    {
      id: 'c-1',
      code: 'CSC 301',
      title: 'Advanced Web & Enterprise Systems',
      grade: 'A',
      credits: 4,
      semester: 'Semester 1, 2026',
      instructorName: 'Dr. Farai Muringani',
      lecturerName: 'Dr. Farai Muringani',
      verification: {
        status: 'verified-institution',
        verifiedBy: 'Department Academic Review Board (Simulated)',
        verifiedAt: '15/06/2026', // Standardized DD/MM/YYYY
        verificationHash: 'AU-SIM-2026-301A',
        evidenceName: 'Department Academic Record (Simulated)'
      }
    },
    {
      id: 'c-2',
      code: 'CSC 204',
      title: 'Data Structures & Algorithms',
      grade: 'A-',
      credits: 4,
      semester: 'Semester 2, 2025',
      instructorName: 'Dr. Farai Muringani',
      lecturerName: 'Dr. Farai Muringani',
      verification: {
        status: 'verified-institution',
        verifiedBy: 'Department Academic Review Board (Simulated)',
        verifiedAt: '20/11/2025', // Standardized DD/MM/YYYY
        verificationHash: 'AU-SIM-2025-204A',
        evidenceName: 'Department Academic Record (Simulated)'
      }
    }
  ],
  skills: [
    { id: 's-1', name: 'React & TypeScript', category: 'Technical', proficiency: 'Advanced', endorsedBy: ['Dr. Farai Muringani'] },
    { id: 's-2', name: 'REST & GraphQL APIs', category: 'Technical', proficiency: 'Advanced', endorsedBy: ['Dr. Farai Muringani'] },
    { id: 's-3', name: 'Database Architecture (SQL)', category: 'Technical', proficiency: 'Intermediate' },
    { id: 's-4', name: 'Technical Leadership & Git', category: 'Soft', proficiency: 'Advanced', endorsedBy: ['Prof. Tendai Chitiyo'] }
  ],
  projects: [
    {
      id: 'p-1',
      title: 'AU Student Record & Recommendation System',
      role: 'Lead Frontend Developer',
      description: 'Designed and engineered a high-fidelity web application empowering students to build verified academic records and documented portfolios reviewed by academic staff.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: 'https://github.com/africa-university/student-records',
      period: 'Aug 2026 - Present',
      verification: {
        status: 'verified-institution',
        verifiedBy: 'Dr. Farai Muringani (Academic Supervisor, Simulated)',
        verifiedAt: '10/09/2026', // Standardized DD/MM/YYYY
        verificationHash: 'AU-SIM-CAP-081',
        evidenceName: 'Departmental Project Review (Simulated)'
      }
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '15/01/2026', // Standardized DD/MM/YYYY
      credentialId: 'AWS-AU-99214',
      imageUrl: SAMPLE_CERTIFICATE_AWS,
      verification: {
        status: 'verified-issuer',
        verifiedBy: 'Amazon Web Services (Simulated Verification)',
        verifiedAt: '15/01/2026', // Standardized DD/MM/YYYY
        verificationHash: 'AWS-SIM-99214',
        issuerRegistryUrl: 'https://aws.amazon.com/verification'
      }
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Dean\'s Academic Honor List',
      organization: 'Africa University Faculty of Engineering',
      year: '2025 - 2026',
      description: 'Awarded for maintaining a semester GPA in the top 5% of the Computer Science cohort.',
      imageUrl: SAMPLE_CERTIFICATE_DEANS,
      verification: {
        status: 'verified-institution',
        verifiedBy: 'Faculty Honours & Awards Committee (Simulated)',
        verifiedAt: '10/02/2026', // Standardized DD/MM/YYYY
        verificationHash: 'AU-SIM-HON-889',
        evidenceName: 'Faculty Dean Honor Roll (Simulated)'
      }
    },
    {
      id: 'ach-2',
      title: 'Winner - National FinTech Hackathon 2026',
      organization: 'Harare Innovation Hub',
      year: '2026',
      description: 'Awarded 1st place for low-bandwidth mobile financial inclusion prototype.',
      verification: {
        status: 'pending-review',
        evidenceName: 'Student Submission (Awaiting Academic Staff Review)'
      }
    }
  ],
  leadership: [
    {
      id: 'lead-1',
      role: 'Vice President',
      organization: 'AU Computer & Tech Innovation Society',
      duration: '2025 - Present',
      description: 'Mentoring first-year students in programming fundamentals and organizing annual hackathons.',
      verification: {
        status: 'verified-institution',
        verifiedBy: 'AU Student Affairs Committee (Simulated)',
        verifiedAt: '01/10/2025', // Standardized DD/MM/YYYY
        verificationHash: 'AU-SIM-SOC-112',
        evidenceName: 'Student Society Executive Record (Simulated)'
      }
    }
  ]
};

export const initialAcademicStaff: AcademicStaff[] = [
  {
    id: 'staff-1',
    name: 'Dr. Farai Muringani',
    title: 'Senior Lecturer & Head of Department',
    department: 'Department of Computer Science',
    email: 'staff.demo@university.edu',
    taughtCourses: ['CSC 301', 'CSC 204']
  },
  {
    id: 'staff-2',
    name: 'Prof. Tendai Chitiyo',
    title: 'Professor of Information Systems',
    department: 'Faculty of Management & Administration',
    email: 'chitiyot@africau.edu',
    taughtCourses: ['MIS 301', 'MIS 402']
  },
  {
    id: 'staff-3',
    name: 'Dr. Rudo Gwatidzo',
    title: 'Associate Professor',
    department: 'Department of Software Engineering',
    email: 'gwatidzor@africau.edu',
    taughtCourses: ['SWE 310', 'SWE 420']
  }
];

// Backward-compatible alias
export const initialLecturers: Lecturer[] = initialAcademicStaff;

export const initialRequests: RecommendationRequest[] = [
  {
    id: 'req-001',
    studentId: initialStudent.id,
    studentName: initialStudent.fullName,
    studentProgramme: initialStudent.programme,
    studentYear: initialStudent.yearOfStudy,
    staffId: initialAcademicStaff[0].id,
    staffName: initialAcademicStaff[0].name,
    staffDepartment: initialAcademicStaff[0].department,
    lecturerId: initialAcademicStaff[0].id,
    lecturerName: initialAcademicStaff[0].name,
    lecturerDepartment: initialAcademicStaff[0].department,
    purpose: 'Internship',
    deadline: '15/11/2026', // Standardized DD/MM/YYYY
    shortNote: 'Applying for a Software Engineering Internship at EcoCash Holdings. I would appreciate if you could verify my CSC 301 grade and project contributions.',
    status: 'Pending',
    submittedAt: '22/10/2026', // Standardized DD/MM/YYYY
    resultSlipUrl: SAMPLE_RESULT_SLIP,
    relevantCourses: [
      {
        code: 'CSC 301',
        title: 'Advanced Web & Enterprise Systems',
        grade: 'A'
      },
      {
        code: 'CSC 204',
        title: 'Data Structures & Algorithms',
        grade: 'A-'
      }
    ]
  }
];
