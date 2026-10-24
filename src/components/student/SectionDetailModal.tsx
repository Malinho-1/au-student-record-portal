import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Plus, 
  Trash2, 
  BookOpen, 
  Star, 
  Briefcase, 
  Award, 
  Trophy, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface SectionDetailModalProps {
  sectionId: string | null;
  onClose: () => void;
}

export const SectionDetailModal: React.FC<SectionDetailModalProps> = ({ sectionId, onClose }) => {
  const { 
    student, 
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
    removeLeadership
  } = useApp();

  // Local form states for adding items
  const [aboutMeText, setAboutMeText] = useState(student.aboutMe);
  
  // New Course state
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    grade: 'A',
    credits: 4,
    semester: 'Semester 1, 2026',
    lecturerName: '',
  });

  // New Skill state
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Technical' as const,
    proficiency: 'Advanced' as const,
  });

  // New Project state
  const [newProject, setNewProject] = useState({
    title: '',
    role: '',
    description: '',
    technologies: '',
    link: '',
    period: '',
  });

  // New Certification state
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
  });

  // New Achievement state
  const [newAch, setNewAch] = useState({
    title: '',
    organization: '',
    year: new Date().getFullYear().toString(),
    description: '',
  });

  // New Leadership state
  const [newLead, setNewLead] = useState({
    role: '',
    organization: '',
    duration: '',
    description: '',
  });

  const [isAdding, setIsAdding] = useState(false);

  if (!sectionId || sectionId === 'overview') return null;

  const handleSaveAboutMe = () => {
    updateStudentProfile({ aboutMe: aboutMeText });
    onClose();
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title) return;
    addCourse(newCourse);
    setNewCourse({
      code: '',
      title: '',
      grade: 'A',
      credits: 4,
      semester: 'Semester 1, 2026',
      lecturerName: '',
    });
    setIsAdding(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    addSkill(newSkill);
    setNewSkill({
      name: '',
      category: 'Technical',
      proficiency: 'Advanced',
    });
    setIsAdding(false);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    addProject({
      ...newProject,
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
    });
    setNewProject({
      title: '',
      role: '',
      description: '',
      technologies: '',
      link: '',
      period: '',
    });
    setIsAdding(false);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title) return;
    addCertification(newCert);
    setNewCert({
      title: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
    });
    setIsAdding(false);
  };

  const handleAddAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAch.title) return;
    addAchievement(newAch);
    setNewAch({
      title: '',
      organization: '',
      year: new Date().getFullYear().toString(),
      description: '',
    });
    setIsAdding(false);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.role) return;
    addLeadership(newLead);
    setNewLead({
      role: '',
      organization: '',
      duration: '',
      description: '',
    });
    setIsAdding(false);
  };

  const getSectionTitle = () => {
    switch (sectionId) {
      case 'about': return { title: 'Personal Statement & About Me', icon: FileText };
      case 'courses': return { title: 'Academic Courses & Results', icon: BookOpen };
      case 'skills': return { title: 'Key Competencies & Skills', icon: Star };
      case 'projects': return { title: 'Projects & Academic Portfolios', icon: Briefcase };
      case 'certifications': return { title: 'Certifications & Professional Credentials', icon: Award };
      case 'achievements': return { title: 'Honors, Awards & Achievements', icon: Trophy };
      case 'leadership': return { title: 'Leadership & Extracurricular Service', icon: ShieldCheck };
      default: return { title: 'Record Details', icon: FileText };
    }
  };

  const sectionMeta = getSectionTitle();
  const Icon = sectionMeta.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#A51C30]/10 text-[#A51C30]">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">{sectionMeta.title}</h3>
              <p className="text-xs text-neutral-500">View and update records to strengthen your recommendation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* SECTION: ABOUT ME */}
          {sectionId === 'about' && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-neutral-700">
                Personal statement / Academic goals
              </label>
              <textarea
                rows={6}
                value={aboutMeText}
                onChange={e => setAboutMeText(e.target.value)}
                placeholder="Describe your academic interests, key achievements, professional ambitions, and what makes you unique..."
                className="w-full p-3.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAboutMe}
                  className="px-5 py-2 text-xs font-semibold bg-[#A51C30] hover:bg-[#8B1727] text-white rounded-lg shadow-sm"
                >
                  Save Statement
                </button>
              </div>
            </div>
          )}

          {/* SECTION: COURSES */}
          {sectionId === 'courses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.courses.length} Course records
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Course
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddCourse} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">New Course Record</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Course Code (e.g. CSC 301)"
                      value={newCourse.code}
                      onChange={e => setNewCourse({ ...newCourse, code: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Course Title"
                      value={newCourse.title}
                      onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      value={newCourse.grade}
                      onChange={e => setNewCourse({ ...newCourse, grade: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    >
                      {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'Pass'].map(g => (
                        <option key={g} value={g}>Grade: {g}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Credits (e.g. 4)"
                      value={newCourse.credits}
                      onChange={e => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Semester"
                      value={newCourse.semester}
                      onChange={e => setNewCourse({ ...newCourse, semester: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Course
                    </button>
                  </div>
                </form>
              )}

              <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden bg-white">
                {student.courses.map((course) => (
                  <div key={course.id} className="p-3.5 flex items-center justify-between hover:bg-neutral-50/60 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-900">{course.code}</span>
                        <span className="text-xs text-neutral-600">· {course.title}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {course.semester} · {course.credits} Credits
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-[#A51C30] border border-neutral-200">
                        Grade {course.grade}
                      </span>
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SKILLS */}
          {sectionId === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.skills.length} Skills Listed
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Skill
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddSkill} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Skill name (e.g. Python, SQL)"
                      value={newSkill.name}
                      onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <select
                      value={newSkill.category}
                      onChange={e => setNewSkill({ ...newSkill, category: e.target.value as any })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Soft">Soft Skill</option>
                      <option value="Domain">Domain Knowledge</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Skill
                    </button>
                  </div>
                </form>
              )}

              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg border border-neutral-200 text-xs text-neutral-800"
                  >
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[10px] text-neutral-400">({skill.category})</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: PROJECTS */}
          {sectionId === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.projects.length} Project Records
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Project
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddProject} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Lead Developer)"
                      value={newProject.role}
                      onChange={e => setNewProject({ ...newProject, role: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the project and impact..."
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma separated: React, Python, Docker)"
                    value={newProject.technologies}
                    onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {student.projects.map((proj) => (
                  <div key={proj.id} className="p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">{proj.title}</h4>
                        <div className="text-xs text-[#A51C30] font-medium mt-0.5">{proj.role}</div>
                      </div>
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.technologies.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: CERTIFICATIONS */}
          {sectionId === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.certifications.length} Certifications
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Certificate
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddCert} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Certificate Title"
                      value={newCert.title}
                      onChange={e => setNewCert({ ...newCert, title: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Issuing Organization"
                      value={newCert.issuer}
                      onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Issue Date (e.g. Jan 2026)"
                      value={newCert.issueDate}
                      onChange={e => setNewCert({ ...newCert, issueDate: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Credential ID"
                      value={newCert.credentialId}
                      onChange={e => setNewCert({ ...newCert, credentialId: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Certificate
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {student.certifications.map(c => (
                  <div key={c.id} className="p-3.5 border border-neutral-200 rounded-xl bg-white flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{c.title}</h4>
                      <p className="text-[11px] text-neutral-500">{c.issuer} · {c.issueDate}</p>
                    </div>
                    <button
                      onClick={() => removeCertification(c.id)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: ACHIEVEMENTS */}
          {sectionId === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.achievements.length} Achievements
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Award
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddAch} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Award or Honor Title"
                      value={newAch.title}
                      onChange={e => setNewAch({ ...newAch, title: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Awarding Body"
                      value={newAch.organization}
                      onChange={e => setNewAch({ ...newAch, organization: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Description of honor or significance"
                    value={newAch.description}
                    onChange={e => setNewAch({ ...newAch, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Award
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {student.achievements.map(a => (
                  <div key={a.id} className="p-3.5 border border-neutral-200 rounded-xl bg-white flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{a.title}</h4>
                      <p className="text-[11px] text-neutral-500">{a.organization} ({a.year})</p>
                      <p className="text-xs text-neutral-600 mt-1">{a.description}</p>
                    </div>
                    <button
                      onClick={() => removeAchievement(a.id)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: LEADERSHIP */}
          {sectionId === 'leadership' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">
                  {student.leadership.length} Leadership Roles
                </span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Role
                  </button>
                )}
              </div>

              {isAdding && (
                <form onSubmit={handleAddLead} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Role (e.g. Student Representative)"
                      value={newLead.role}
                      onChange={e => setNewLead({ ...newLead, role: e.target.value })}
                      required
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Organization or Club"
                      value={newLead.organization}
                      onChange={e => setNewLead({ ...newLead, organization: e.target.value })}
                      className="px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Responsibilities & Community Impact"
                    value={newLead.description}
                    onChange={e => setNewLead({ ...newLead, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#A51C30] text-white rounded-md"
                    >
                      Save Role
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {student.leadership.map(l => (
                  <div key={l.id} className="p-3.5 border border-neutral-200 rounded-xl bg-white flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{l.role} · {l.organization}</h4>
                      <p className="text-xs text-neutral-600 mt-1">{l.description}</p>
                    </div>
                    <button
                      onClick={() => removeLeadership(l.id)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
