import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  StudentProfile, 
  RecommendationRequest, 
  Lecturer, 
  UserRole,
  RequestStatus,
  Course,
  Skill,
  Project,
  Certification,
  Achievement,
  Leadership
} from '../types';
import { initialStudent, initialLecturers, initialRequests } from '../data/initialData';

interface AppContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  activeStudentTab: 'record' | 'request';
  setActiveStudentTab: (tab: 'record' | 'request') => void;
  student: StudentProfile;
  lecturers: Lecturer[];
  requests: RecommendationRequest[];
  selectedRequestId: string | null;
  setSelectedRequestId: (id: string | null) => void;
  recordCompleteness: number;
  
  // Actions
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
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
  STUDENT: 'au_portal_student_v1',
  REQUESTS: 'au_portal_requests_v1',
  ROLE: 'au_portal_role_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return saved ? (saved as UserRole) : null;
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

  const [lecturers] = useState<Lecturer[]>(initialLecturers);

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

  // Calculate completeness percentage
  const calculateCompleteness = (): number => {
    let score = 20; // Base info (Name, Programme, Year)
    if (student.aboutMe && student.aboutMe.trim().length > 30) score += 15;
    if (student.courses && student.courses.length >= 2) score += 20;
    else if (student.courses && student.courses.length === 1) score += 10;
    
    if (student.skills && student.skills.length >= 3) score += 15;
    else if (student.skills && student.skills.length > 0) score += 8;

    if (student.projects && student.projects.length >= 1) score += 12;
    if (student.certifications && student.certifications.length >= 1) score += 8;
    if (student.achievements && student.achievements.length >= 1) score += 5;
    if (student.leadership && student.leadership.length >= 1) score += 5;

    return Math.min(100, Math.max(30, score));
  };

  const recordCompleteness = calculateCompleteness();

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updates }));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...courseData, id: 'c-' + Date.now() };
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
    const newProject: Project = { ...projectData, id: 'p-' + Date.now() };
    setStudent(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const removeProject = (id: string) => {
    setStudent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addCertification = (certData: Omit<Certification, 'id'>) => {
    const newCert: Certification = { ...certData, id: 'cert-' + Date.now() };
    setStudent(prev => ({ ...prev, certifications: [newCert, ...prev.certifications] }));
  };

  const removeCertification = (id: string) => {
    setStudent(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  const addAchievement = (achData: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { ...achData, id: 'ach-' + Date.now() };
    setStudent(prev => ({ ...prev, achievements: [newAch, ...prev.achievements] }));
  };

  const removeAchievement = (id: string) => {
    setStudent(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
  };

  const addLeadership = (leadData: Omit<Leadership, 'id'>) => {
    const newLead: Leadership = { ...leadData, id: 'lead-' + Date.now() };
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
    const lecturer = lecturers.find(l => l.id === lecturerId) || lecturers[0];
    
    // Automatically attach student's relevant courses taught by lecturer or top courses
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
      lecturerId: lecturer.id,
      lecturerName: lecturer.name,
      lecturerDepartment: lecturer.department,
      purpose,
      deadline,
      shortNote,
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0],
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
        lecturers,
        requests,
        selectedRequestId,
        setSelectedRequestId,
        recordCompleteness,
        updateStudentProfile,
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
