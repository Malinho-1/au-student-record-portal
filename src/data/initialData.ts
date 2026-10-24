import type { StudentProfile, RecommendationRequest, Lecturer } from '../types';

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
  courses: [
    {
      id: 'c-1',
      code: 'CSC 301',
      title: 'Advanced Web & Enterprise Systems',
      grade: 'A',
      credits: 4,
      semester: 'Semester 1, 2026',
      lecturerName: 'Dr. Farai Muringani'
    },
    {
      id: 'c-2',
      code: 'CSC 204',
      title: 'Data Structures & Algorithms',
      grade: 'A-',
      credits: 4,
      semester: 'Semester 2, 2025',
      lecturerName: 'Dr. Farai Muringani'
    }
  ],
  skills: [
    { id: 's-1', name: 'React & TypeScript', category: 'Technical', proficiency: 'Advanced' },
    { id: 's-2', name: 'REST & GraphQL APIs', category: 'Technical', proficiency: 'Advanced' },
    { id: 's-3', name: 'Database Architecture (SQL)', category: 'Technical', proficiency: 'Intermediate' },
    { id: 's-4', name: 'Technical Leadership & Git', category: 'Soft', proficiency: 'Advanced' }
  ],
  projects: [
    {
      id: 'p-1',
      title: 'AU Student Record & Recommendation System',
      role: 'Lead Frontend Developer',
      description: 'Designed and engineered a high-fidelity web application empowering students to build verified academic portfolios and streamlining lecturer recommendation letter drafting.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: 'https://github.com/africa-university/student-records',
      period: 'Aug 2026 - Present'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2026',
      credentialId: 'AWS-AU-99214'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Dean\'s Academic Honor List',
      organization: 'Africa University Faculty of Engineering',
      year: '2025 - 2026',
      description: 'Awarded for maintaining a semester GPA in the top 5% of the Computer Science cohort.'
    }
  ],
  leadership: [
    {
      id: 'lead-1',
      role: 'Vice President',
      organization: 'AU Computer & Tech Innovation Society',
      duration: '2025 - Present',
      description: 'Mentoring first-year students in programming fundamentals and organizing annual hackathons.'
    }
  ]
};

export const initialLecturers: Lecturer[] = [
  {
    id: 'lec-1',
    name: 'Dr. Farai Muringani',
    title: 'Senior Lecturer & Head of Department',
    department: 'Department of Computer Science',
    email: 'lecturer.demo@university.edu',
    taughtCourses: ['CSC 301', 'CSC 204']
  },
  {
    id: 'lec-2',
    name: 'Prof. Tendai Chitiyo',
    title: 'Professor of Information Systems',
    department: 'Faculty of Management & Administration',
    email: 'chitiyot@africau.edu',
    taughtCourses: ['MIS 301', 'MIS 402']
  },
  {
    id: 'lec-3',
    name: 'Dr. Rudo Gwatidzo',
    title: 'Associate Professor',
    department: 'Department of Software Engineering',
    email: 'gwatidzor@africau.edu',
    taughtCourses: ['SWE 310', 'SWE 420']
  }
];

export const initialRequests: RecommendationRequest[] = [
  {
    id: 'req-001',
    studentId: initialStudent.id,
    studentName: initialStudent.fullName,
    studentProgramme: initialStudent.programme,
    studentYear: initialStudent.yearOfStudy,
    lecturerId: initialLecturers[0].id,
    lecturerName: initialLecturers[0].name,
    lecturerDepartment: initialLecturers[0].department,
    purpose: 'Internship',
    deadline: '2026-11-15',
    shortNote: 'Applying for a Software Engineering Internship at EcoCash Holdings. I would appreciate if you could highlight my performance in CSC 301 (Advanced Web & Enterprise Systems) and my dedication to team project delivery.',
    status: 'Pending',
    submittedAt: '2026-10-22',
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
