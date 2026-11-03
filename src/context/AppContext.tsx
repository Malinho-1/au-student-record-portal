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

// Helper: Maps SQLite database rows (with status & endorsed_by) to frontend verification models
function mapDbClaimToFrontend<T extends Record<string, any>>(claim: T): T {
  let vStatus: VerificationStatus = 'unverified';
  if (claim.status === 'Endorsed') {
    vStatus = 'verified-institution';
  } else if (claim.status === 'Self-Reported') {
    vStatus = 'pending-review';
  } else if (claim.status === 'Rejected') {
    vStatus = 'unverified';
  }

  return {
    ...claim,
    issueDate: claim.issue_date || claim.issueDate,
    instructorName: claim.instructor_name || claim.instructorName,
    verification: {
      status: vStatus,
      verifiedBy: claim.endorsed_by || undefined,
      verifiedAt: claim.verified_at || undefined,
      verificationHash: claim.verification_hash || undefined,
      evidenceName: claim.evidence_name || (claim.status === 'Endorsed' ? 'Faculty Academic Record' : undefined)
    }
  };
}

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
  staffQueue: any[];
  fetchStaffQueue: () => Promise<void>;
  
  // Actions
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  accreditClaim: (
    category: 'courses' | 'projects' | 'certifications' | 'achievements' | 'leadership',
    itemId: string,
    newStatus: VerificationStatus,
    verifierName?: string
  ) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => void;
  removeCourse: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: Omit<Certification, 'id'>) => Promise<void>;
  removeCertification: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => Promise<void>;
  removeAchievement: (id: string) => void;
  addLeadership: (leadership: Omit<Leadership, 'id'>) => void;
  removeLeadership: (id: string) => void;
  
  createRequest: (requestData: {
    lecturerId?: string;
    staffName?: string;
    staffEmail?: string;
    staffDepartment?: string;
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
  ROLE: 'au_portal_role_v4',
  REQUESTS: 'au_portal_requests_v4',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    if (saved === 'academic-staff' || saved === 'student') {
      return saved as UserRole;
    }
    return null;
  });

  const [activeStudentTab, setActiveStudentTab] = useState<'record' | 'request'>('record');
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [academicStaff] = useState<AcademicStaff[]>(initialAcademicStaff);
  const [staffQueue, setStaffQueue] = useState<any[]>([]);

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

  // -------------------------------------------------------------
  // Backend Integration: Fetch student and staff queue on mount
  // -------------------------------------------------------------
  const fetchStaffQueue = async () => {
    try {
      const res = await fetch('/api/staff/queue');
      if (res.ok) {
        const data = await res.json();
        setStaffQueue(data.queue || []);
      }
    } catch (e) {
      console.warn('Backend /api/staff/queue not reachable:', e);
    }
  };

  useEffect(() => {
    async function loadStudentFromBackend() {
      try {
        const res = await fetch('/api/students/stu-demo-001');
        if (res.ok) {
          const data = await res.json();
          setStudent(prev => ({
            ...prev,
            id: data.id,
            fullName: data.full_name || prev.fullName,
            email: data.email || prev.email,
            studentId: data.student_id || prev.studentId,
            programme: data.programme || prev.programme,
            faculty: data.faculty || prev.faculty,
            yearOfStudy: data.year_of_study || prev.yearOfStudy,
            gpa: data.gpa || prev.gpa,
            academicStanding: data.academic_standing || prev.academicStanding,
            aboutMe: data.about_me || prev.aboutMe,
            resultSlipUrl: data.result_slip_url || prev.resultSlipUrl,
            resultSlipName: data.result_slip_name || prev.resultSlipName,
            resultSlipUploadedAt: data.result_slip_uploaded_at || prev.resultSlipUploadedAt,
            courses: (data.courses || []).map(mapDbClaimToFrontend),
            certifications: (data.certifications || []).map(mapDbClaimToFrontend),
            achievements: (data.achievements || []).map(mapDbClaimToFrontend),
          }));
        }
      } catch (e) {
        console.warn('Backend /api/students unavailable, using local initial state:', e);
      }
    }

    loadStudentFromBackend();
    fetchStaffQueue();
  }, []);

  // Save role and requests state
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

  // -------------------------------------------------------------
  // Backend Integration: PATCH /api/claims/:id/endorse
  // -------------------------------------------------------------
  const accreditClaim = async (
    category: 'courses' | 'projects' | 'certifications' | 'achievements' | 'leadership',
    itemId: string,
    newStatus: VerificationStatus,
    verifierName: string = 'Demo Academic Staff'
  ) => {
    const claimTypeMap: Record<string, string> = {
      courses: 'course',
      certifications: 'certification',
      achievements: 'achievement'
    };
    const claimType = claimTypeMap[category];
    const action = newStatus === 'unverified' ? 'Rejected' : 'Endorsed';

    // If it's a course, certification or achievement, notify the backend API
    if (claimType) {
      try {
        const res = await fetch(`/api/claims/${itemId}/endorse`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-role': 'academic-staff'
          },
          body: JSON.stringify({
            claimType,
            action,
            staffName: verifierName
          })
        });

        if (res.ok) {
          const data = await res.json();
          const mapped = mapDbClaimToFrontend(data.claim);
          setStudent(prev => ({
            ...prev,
            [category]: (prev[category] as any[]).map(item => item.id === itemId ? { ...item, ...mapped } : item)
          }));
          fetchStaffQueue();
          return;
        }
      } catch (err) {
        console.warn('Backend endorsement call failed, applying optimistic update:', err);
      }
    }

    // Local / fallback update
    const today = formatTodayDDMMYYYY();
    const token = `AU-SIM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    setStudent(prev => {
      const updatedList = (prev[category] as any[]).map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            status: action,
            endorsed_by: verifierName,
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
      status: 'Self-Reported',
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

  // -------------------------------------------------------------
  // Backend Integration: POST /api/certifications
  // -------------------------------------------------------------
  const addCertification = async (certData: Omit<Certification, 'id'>) => {
    const payload = {
      studentId: student.id,
      title: certData.title,
      issuer: certData.issuer,
      issueDate: certData.issueDate || formatTodayDDMMYYYY(),
      credentialId: certData.credentialId || null,
      credentialUrl: certData.credentialUrl || null,
      imageUrl: certData.imageUrl || null,
    };

    try {
      const res = await fetch('/api/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        const mapped = mapDbClaimToFrontend(created);
        setStudent(prev => ({
          ...prev,
          certifications: [mapped, ...prev.certifications]
        }));
        fetchStaffQueue();
        return;
      }
    } catch (err) {
      console.warn('Backend POST /api/certifications failed, using optimistic state:', err);
    }

    // Fallback optimistic update
    const newCert: Certification = { 
      ...certData, 
      id: 'cert-' + Date.now(),
      status: 'Self-Reported',
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

  // -------------------------------------------------------------
  // Backend Integration: POST /api/achievements
  // -------------------------------------------------------------
  const addAchievement = async (achData: Omit<Achievement, 'id'>) => {
    const payload = {
      studentId: student.id,
      title: achData.title,
      organization: achData.organization,
      year: achData.year || new Date().getFullYear().toString(),
      description: achData.description || '',
      imageUrl: achData.imageUrl || null,
    };

    try {
      const res = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        const mapped = mapDbClaimToFrontend(created);
        setStudent(prev => ({
          ...prev,
          achievements: [mapped, ...prev.achievements]
        }));
        fetchStaffQueue();
        return;
      }
    } catch (err) {
      console.warn('Backend POST /api/achievements failed, using optimistic state:', err);
    }

    // Fallback optimistic update
    const newAch: Achievement = { 
      ...achData, 
      id: 'ach-' + Date.now(),
      status: 'Self-Reported',
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
    staffName,
    staffEmail,
    staffDepartment,
    purpose,
    deadline,
    shortNote,
  }: {
    lecturerId?: string;
    staffName?: string;
    staffEmail?: string;
    staffDepartment?: string;
    purpose: RecommendationRequest['purpose'];
    deadline: string;
    shortNote: string;
  }) => {
    // If lecturerId matched an existing staff member in directory
    const matchedStaff = lecturerId ? academicStaff.find(s => s.id === lecturerId) : null;
    
    const staffId = matchedStaff?.id || lecturerId || 'staff-' + Date.now();
    const finalStaffName = matchedStaff?.name || staffName || 'Academic Staff Reviewer';
    const finalDepartment = matchedStaff?.department || staffDepartment || 'Department of Computer Science';
    const finalEmail = matchedStaff?.email || staffEmail || `${finalStaffName.toLowerCase().replace(/[^a-z0-9]/g, '')}@africau.edu`;

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
      staffId,
      staffName: finalStaffName,
      staffDepartment: finalDepartment,
      staffEmail: finalEmail,
      lecturerId: staffId,
      lecturerName: finalStaffName,
      lecturerDepartment: finalDepartment,
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
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    setStudent(initialStudent);
    setRequests(initialRequests);
    setSelectedRequestId(initialRequests[0]?.id || null);
    fetchStaffQueue();
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
        staffQueue,
        fetchStaffQueue,
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
