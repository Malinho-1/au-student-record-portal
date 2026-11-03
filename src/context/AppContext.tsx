import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  StudentProfile, 
  RecommendationRequest, 
  AcademicStaff, 
  UserRole,
  RequestStatus,
  VerificationStatus,
  Course,
  Skill,
  Project,
  Certification,
  Achievement,
  Leadership
} from '../types';
import { initialStudent, initialAcademicStaff, initialRequests } from '../data/initialData';

// Standardized DD/MM/YYYY date helper
export const formatTodayDDMMYYYY = (): string => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

interface AppContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  activeStudentTab: 'record' | 'request';
  setActiveStudentTab: (tab: 'record' | 'request') => void;
  student: StudentProfile;
  academicStaff: AcademicStaff[];
  lecturers: AcademicStaff[]; // Alias for backward compatibility
  requests: RecommendationRequest[];
  selectedRequestId: string | null;
  setSelectedRequestId: (id: string | null) => void;
  recordCompleteness: number;
  accreditationTrustScore: number;
  
  // Actions
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  accreditClaim: (
    category: 'courses' | 'projects' | 'certifications' | 'achievements' | 'leadership',
    itemId: string,
    newStatus: VerificationStatus,
    verifierName?: string
  ) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  removeCourse: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  removeCertification: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  removeAchievement: (id: string) => void;
  addLeadership: (leadership: Omit<Leadership, 'id'>) => void;
  removeLeadership: (id: string) => void;
  
  createRequest: (requestData: {
    lecturerId: string;
    purpose: RecommendationRequest['purpose'];
    deadline: string;
    shortNote: string;
  }) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  saveGeneratedLetter: (requestId: string, letter: string) => void;
  resetDemoData: () => void;
  
  // UI states
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENT: 'au_portal_student_v3',
  REQUESTS: 'au_portal_requests_v3',
  ROLE: 'au_portal_role_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    if (saved === 'academic-staff' || saved === 'student') {
      return saved as UserRole;
    }
    // If previously saved as 'lecturer', migrate to 'academic-staff'
    if (saved === 'lecturer') {
      return 'academic-staff';
    }
    return null;
  });

  const [activeStudentTab, setActiveStudentTab] = useState<'record' | 'request'>('record');

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved student', e);
      }
    }
    return initialStudent;
  });

  const [academicStaff] = useState<AcademicStaff[]>(initialAcademicStaff);

  const [requests, setRequests] = useState<RecommendationRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved requests', e);
      }
    }
    return initialRequests;
  });

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    requests[0]?.id || null
  );

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  const setRole = (newRole: UserRole | null) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }
  };

  // Record Completeness Calculation
  const calculateCompleteness = (): number => {
    let score = 0;
    if (student.fullName && student.programme && student.studentId) score += 15;
    if (student.aboutMe && student.aboutMe.trim().length > 10) score += 15;
    if (student.courses.length > 0) score += 20;
    if (student.skills.length >= 3) score += 15;
    if (student.projects.length > 0) score += 15;
    if (student.certifications.length > 0 || student.achievements.length > 0) score += 10;
    if (student.leadership.length > 0) score += 10;
    return Math.min(100, score);
  };

  // Accreditation & Claim Integrity Trust Score
  const calculateAccreditationScore = (): number => {
    const allVerifiableItems = [
      ...student.courses.map(c => c.verification),
      ...student.projects.map(p => p.verification),
      ...student.certifications.map(c => c.verification),
      ...student.achievements.map(a => a.verification),
      ...student.leadership.map(l => l.verification),
    ].filter(Boolean);

    if (allVerifiableItems.length === 0) return 0;

    const verifiedCount = allVerifiableItems.filter(v => 
      v?.status === 'verified-institution' || v?.status === 'verified-issuer'
    ).length;

    return Math.round((verifiedCount / allVerifiableItems.length) * 100);
  };

  const recordCompleteness = calculateCompleteness();
  const accreditationTrustScore = calculateAccreditationScore();

  // Verification & Endorsement Engine for Academic Staff
  const accreditClaim = (
    category: 'courses' | 'projects' | 'certifications' | 'achievements' | 'leadership',
    itemId: string,
    newStatus: VerificationStatus,
    verifierName: string = 'Dr. Farai Muringani (Academic Staff, Simulated)'
  ) => {
    const today = formatTodayDDMMYYYY();
    const token = `AU-SIM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    setStudent(prev => {
      const updatedList = (prev[category] as any[]).map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            verification: {
              status: newStatus,
              verifiedBy: verifierName,
              verifiedAt: today,
              verificationHash: token,
              evidenceName: 'Academic Staff Review (Simulated)'
            }
          };
        }
        return item;
      });

      return {
        ...prev,
        [category]: updatedList
      };
    });
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updates }));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { 
      ...courseData, 
      id: 'c-' + Date.now(),
      verification: {
        status: 'pending-review',
        evidenceName: 'Self-Reported Course Grade (Awaiting Staff Verification)'
      }
    };
    setStudent(prev => ({ ...prev, courses: [newCourse, ...prev.courses] }));
  };

  const removeCourse = (id: string) => {
    setStudent(prev => ({ ...prev, courses: prev.courses.filter(c => c.id !== id) }));
  };

  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skillData, id: 's-' + Date.now() };
    setStudent(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const removeSkill = (id: string) => {
    setStudent(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = { 
      ...projectData, 
      id: 'p-' + Date.now(),
      verification: {
        status: 'pending-review',
        evidenceName: 'Self-Reported Project (Awaiting Staff Verification)'
      }
    };
    setStudent(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const removeProject = (id: string) => {
    setStudent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addCertification = (certData: Omit<Certification, 'id'>) => {
    const newCert: Certification = { 
      ...certData, 
      id: 'cert-' + Date.now(),
      verification: {
        status: 'pending-review',
        evidenceName: 'Uploaded Certificate (Awaiting Staff Verification)'
      }
    };
    setStudent(prev => ({ ...prev, certifications: [newCert, ...prev.certifications] }));
  };

  const removeCertification = (id: string) => {
    setStudent(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  const addAchievement = (achData: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { 
      ...achData, 
      id: 'ach-' + Date.now(),
      verification: {
        status: 'pending-review',
        evidenceName: 'Self-Submitted Achievement (Awaiting Staff Verification)'
      }
    };
    setStudent(prev => ({ ...prev, achievements: [newAch, ...prev.achievements] }));
  };

  const removeAchievement = (id: string) => {
    setStudent(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
  };

  const addLeadership = (leadData: Omit<Leadership, 'id'>) => {
    const newLead: Leadership = { 
      ...leadData, 
      id: 'lead-' + Date.now(),
      verification: {
        status: 'pending-review',
        evidenceName: 'Self-Reported Leadership (Awaiting Staff Verification)'
      }
    };
    setStudent(prev => ({ ...prev, leadership: [newLead, ...prev.leadership] }));
  };

  const removeLeadership = (id: string) => {
    setStudent(prev => ({ ...prev, leadership: prev.leadership.filter(l => l.id !== id) }));
  };

  const createRequest = ({
    lecturerId,
    purpose,
    deadline,
    shortNote,
  }: {
    lecturerId: string;
    purpose: RecommendationRequest['purpose'];
    deadline: string;
    shortNote: string;
  }) => {
    const staff = academicStaff.find(s => s.id === lecturerId) || academicStaff[0];
    
    const relevantCourses = student.courses.map(c => ({
      code: c.code,
      title: c.title,
      grade: c.grade,
    }));

    const newRequest: RecommendationRequest = {
      id: 'req-' + Date.now(),
      studentId: student.id,
      studentName: student.fullName,
      studentProgramme: student.programme,
      studentYear: student.yearOfStudy,
      staffId: staff.id,
      staffName: staff.name,
      staffDepartment: staff.department,
      lecturerId: staff.id,
      lecturerName: staff.name,
      lecturerDepartment: staff.department,
      purpose,
      deadline,
      shortNote,
      status: 'Pending',
      submittedAt: formatTodayDDMMYYYY(),
      resultSlipUrl: student.resultSlipUrl,
      relevantCourses,
    };

    setRequests(prev => [newRequest, ...prev]);
    setSelectedRequestId(newRequest.id);
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const saveGeneratedLetter = (requestId: string, letter: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, generatedLetter: letter } : r))
    );
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.STUDENT);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem('au_portal_student_v1');
    localStorage.removeItem('au_portal_requests_v1');
    localStorage.removeItem('au_portal_student_v2');
    localStorage.removeItem('au_portal_requests_v2');
    setStudent(initialStudent);
    setRequests(initialRequests);
    setSelectedRequestId(initialRequests[0]?.id || null);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeStudentTab,
        setActiveStudentTab,
        student,
        academicStaff,
        lecturers: academicStaff,
        requests,
        selectedRequestId,
        setSelectedRequestId,
        recordCompleteness,
        accreditationTrustScore,
        updateStudentProfile,
        accreditClaim,
        addCourse,
        removeCourse,
        addSkill,
        removeSkill,
        addProject,
        removeProject,
        addCertification,
        removeCertification,
        addAchievement,
        removeAchievement,
        addLeadership,
        removeLeadership,
        createRequest,
        updateRequestStatus,
        saveGeneratedLetter,
        resetDemoData,
        isHelpOpen,
        setIsHelpOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
