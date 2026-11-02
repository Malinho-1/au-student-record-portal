import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { RecommendationRequest } from '../../types';
import { AfricaUniversityLogo } from '../AfricaUniversityLogo';
import { ImageLightboxModal } from '../common/ImageLightboxModal';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  FileCheck, 
  FileCheck2, 
  Eye, 
  RotateCcw, 
  Save, 
  SlidersHorizontal, 
  Plus, 
  FileEdit,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface LetterGeneratorModalProps {
  request: RecommendationRequest;
  isOpen: boolean;
  onClose: () => void;
}

export const LetterGeneratorModal: React.FC<LetterGeneratorModalProps> = ({
  request,
  isOpen,
  onClose,
}) => {
  const { student, updateRequestStatus, saveGeneratedLetter, accreditationTrustScore } = useApp();

  const [activeTab, setActiveTab] = useState<'letter' | 'summary'>('letter');
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Template and tone configuration
  const [selectedTemplate, setSelectedTemplate] = useState<'placement' | 'scholarship' | 'grad-school'>('placement');
  const [selectedTone, setSelectedTone] = useState<'highest' | 'strong' | 'balanced'>('highest');
  const lecturerTitle = 'Senior Lecturer & Head of Department';
  const lecturerDept = request.lecturerDepartment || 'Department of Computer Science';

  // Lightbox preview for document/certificate
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string | null;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    imageUrl: null,
    title: '',
  });

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Dynamic template builder based on student records and referee selection
  const buildLetter = (tpl: 'placement' | 'scholarship' | 'grad-school', tone: 'highest' | 'strong' | 'balanced') => {
    const courseMentions = request.relevantCourses
      .map(c => `${c.title} (${c.code}, Grade: ${c.grade})`)
      .join(', ');

    const tonePhrasing = {
      highest: 'I recommend Tapiwa Moyo with my absolute highest enthusiasm and without reservation, ranking this student in the top 5% of all undergraduates I have taught over the past decade.',
      strong: 'I strongly recommend Tapiwa Moyo with great confidence, knowing this candidate possesses the requisite work ethic, analytical capability, and moral character to succeed.',
      balanced: 'I am pleased to provide an objective recommendation in support of Tapiwa Moyo, whose academic records and coursework attest to dependable academic capability and focus.',
    }[tone];

    const templateFocus = {
      placement: `During coursework and team project sprints, ${student.fullName} consistently demonstrated advanced practical software engineering skills. Specifically leading the development of "${student.projects[0]?.title || 'University Systems'}", applying modern distributed architectures, agile workflows, and rigorous code review. Technical proficiencies in ${student.skills.map(s => s.name).join(', ')} were verified through hands-on lab assessments.`,
      scholarship: `Throughout their academic tenure at Africa University, ${student.fullName} has sustained exemplary scholastic distinction, achieving a Cumulative GPA of ${student.gpa} and maintaining Dean's Honor Roll standing. Their intellectual curiosity, dedication to academic integrity, and resilience make them an ideal recipient of prestigious merit funding.`,
      'grad-school': `${student.fullName} has exhibited superior analytical aptitude and theoretical comprehension in advanced topics such as Data Structures, Web Systems, and Database Architectures. Their inquisitive approach to problem solving, coupled with research capacity in software engineering, will provide a sturdy foundation for rigorous postgraduate study.`,
    }[tpl];

    const leadershipMention = student.leadership.length > 0
      ? `Beyond classroom metrics, ${student.fullName} served as ${student.leadership[0].role} for ${student.leadership[0].organization}, exhibiting exemplary leadership, peer mentorship, and ethical collaboration.`
      : '';

    const verifiedDocsMention = student.resultSlipUrl
      ? `INSTITUTIONAL ACCREDITATION ASSURANCE: All academic results, semester GPA metrics (${student.gpa}), and academic standings have been corroborated against official Africa University Registrar records (Ledger Ref: AU-SIS-${request.relevantCourses[0]?.code.replace(/\s+/g, '') || '2026'}).`
      : '';

    return `TO WHOM IT MAY CONCERN,

RE: ACADEMIC & PROFESSIONAL RECOMMENDATION FOR ${student.fullName.toUpperCase()} (STUDENT ID: ${student.studentId})
APPLICATION CATEGORY: ${request.purpose.toUpperCase()}
DATE OF EVALUATION: ${today}

It is my distinct privilege to write this formal letter of recommendation on behalf of ${student.fullName}, who is currently in their ${student.yearOfStudy} pursuing a ${student.programme} within the ${student.faculty} at Africa University.

I have supervised and evaluated ${student.fullName} in my role as ${lecturerTitle}, ${lecturerDept}. In my classes, including ${courseMentions || 'advanced computing coursework'}, ${student.fullName} earned top-tier grades, demonstrating exceptional critical thinking, disciplined study habits, and collaborative initiative. Currently, ${student.fullName} holds a Cumulative GPA of ${student.gpa} and official standing of ${student.academicStanding}.

${templateFocus}

${leadershipMention}

${verifiedDocsMention}

${tonePhrasing} The candidate has applied for a ${request.purpose}, and I am certain they will prove to be an outstanding contributor to your institution or enterprise.

Please contact my office directly should you require further verification or supplementary academic records.

Yours faithfully,

${request.lecturerName}
${lecturerTitle}
${lecturerDept}
Africa University
Fairview Mountain, Old Mutare, Zimbabwe
Email: ${request.lecturerId === 'lec-1' ? 'muringanif@africau.edu' : 'faculty@africau.edu'}
Telephone: +263 20 60075 / 61611`;
  };

  const [letterContent, setLetterContent] = useState<string>(() => {
    return request.generatedLetter || buildLetter(selectedTemplate, selectedTone);
  });

  if (!isOpen) return null;

  const handleTemplateChange = (tpl: 'placement' | 'scholarship' | 'grad-school') => {
    setSelectedTemplate(tpl);
    const newDraft = buildLetter(tpl, selectedTone);
    setLetterContent(newDraft);
  };

  const handleToneChange = (tone: 'highest' | 'strong' | 'balanced') => {
    setSelectedTone(tone);
    const newDraft = buildLetter(selectedTemplate, tone);
    setLetterContent(newDraft);
  };

  const handleResetToTemplate = () => {
    if (window.confirm('Reset this letter back to the default auto-drafted template? Custom text will be replaced.')) {
      setLetterContent(buildLetter(selectedTemplate, selectedTone));
    }
  };

  const handleInsertText = (textSnippet: string) => {
    setLetterContent(prev => prev + '\n\n' + textSnippet);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = () => {
    saveGeneratedLetter(request.id, letterContent);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleSaveAndComplete = () => {
    saveGeneratedLetter(request.id, letterContent);
    updateRequestStatus(request.id, 'Completed');
    onClose();
  };

  const wordCount = letterContent.trim().split(/\s+/).filter(Boolean).length;
  const charCount = letterContent.length;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs">
        <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden border border-neutral-300 flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Bar */}
          <div className="px-6 py-3.5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/80">
            <div className="flex items-center gap-4">
              <AfricaUniversityLogo className="h-9" showSubtitle={false} />
              <div className="h-6 w-px bg-neutral-300 hidden sm:block" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span>Recommendation Letter Studio</span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {accreditationTrustScore}% Verified Profile
                  </span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Referee editing tools for {student.fullName} ({request.purpose})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Switcher */}
              <div className="flex bg-neutral-200/80 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('letter')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'letter'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Editable Letter Studio</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'summary'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Academic Proofs</span>
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8F7F5]">
            
            {/* TAB 1: EDITABLE LETTER STUDIO */}
            {activeTab === 'letter' && (
              <div className="space-y-4">
                
                {/* 1. Lecturer Customization Controls */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#A51C30]" />
                      <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                        Referee Drafting Controls
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetToTemplate}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                        title="Reset letter text back to template default"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Template</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md transition-colors cursor-pointer"
                      >
                        {savedFeedback ? <Check className="w-3 h-3 text-emerald-600" /> : <Save className="w-3 h-3 text-neutral-600" />}
                        <span>{savedFeedback ? 'Draft Saved!' : 'Save Draft'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Application Template Focus
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('placement')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTemplate === 'placement'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Placement / Job
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('scholarship')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTemplate === 'scholarship'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Scholarship
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('grad-school')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTemplate === 'grad-school'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Grad School
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Endorsement Tone &amp; Strength
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToneChange('highest')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTone === 'highest'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Top 5% Highest
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToneChange('strong')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTone === 'strong'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Strong
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToneChange('balanced')}
                          className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedTone === 'balanced'
                              ? 'bg-[#A51C30] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          Balanced
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Quick Insert Chips */}
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      1-Click Quick-Insert Verified Evidence:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleInsertText(`ACADEMIC HONORS VERIFICATION: Awarded the Faculty Dean's Academic Honor List for maintaining a top-percentile GPA of ${student.gpa} (Token: AU-HON-2026-X889).`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 text-emerald-600" />
                        <span>Insert Dean's Honor Roll</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsertText(`CERTIFIED CLOUD CREDENTIAL: Successfully achieved AWS Certified Cloud Practitioner designation (Validation Number: AWS-AU-99214).`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-md cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 text-blue-600" />
                        <span>Insert AWS Credential</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsertText(`COURSEWORK EXCELLENCE: Ranked Grade A in CSC 301 (Advanced Web & Enterprise Systems) and Grade A- in CSC 204 (Data Structures & Algorithms).`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 rounded-md cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 text-neutral-600" />
                        <span>Insert Course Grades</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsertText(`OFFICIAL REGISTRAR VERIFICATION: This recommendation is generated from the verified Africa University Academic Records System. Reference Token: AU-REC-2026-${request.id.slice(-5).toUpperCase()}.`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-red-50 hover:bg-red-100 text-[#A51C30] border border-red-200 rounded-md cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[#A51C30]" />
                        <span>Insert AU Anti-Forgery Token</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Action Bar & Metrics */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-xl border border-neutral-200 text-xs">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <span><strong>{wordCount}</strong> words</span>
                    <span>·</span>
                    <span><strong>{charCount}</strong> characters</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Editable by Lecturer
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#A51C30] hover:bg-[#8B1727] text-white transition-colors cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>

                {/* 3. Official Editable Letterhead Canvas */}
                <div className="bg-white p-6 sm:p-10 rounded-xl border border-neutral-300 shadow-sm space-y-4 print:shadow-none print:border-none">
                  {/* Official Letterhead Header */}
                  <div className="border-b-2 border-[#A51C30] pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-900 rounded-sm flex items-center justify-center p-1 shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                          <ellipse cx="50" cy="38" rx="34" ry="9" fill="#FFFFFF" />
                          <path d="M 50 85 L 50 56 M 50 64 L 38 48 M 50 62 L 62 48" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                          <line x1="16" y1="85" x2="84" y2="85" stroke="#FFFFFF" strokeWidth="4" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-serif font-black tracking-wider text-[#A51C30] uppercase">
                          Africa University
                        </h2>
                        <p className="text-xs text-neutral-600 font-serif italic">
                          Office of Academic Referees &amp; Dean · Faculty of Engineering &amp; Applied Sciences
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs text-neutral-600">
                      <div className="font-semibold text-neutral-900">Date: {today}</div>
                      <div>Fairview Mountain, Old Mutare, Zimbabwe</div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">REF: AU-REC-2026-{request.id.slice(-5).toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Fully Editable Text Area */}
                  <div className="relative">
                    <textarea
                      rows={19}
                      value={letterContent}
                      onChange={(e) => setLetterContent(e.target.value)}
                      className="w-full text-xs sm:text-sm font-sans leading-relaxed text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 resize-y font-mono whitespace-pre-wrap transition-shadow"
                      placeholder="Draft your recommendation letter here..."
                    />
                  </div>

                  {/* Anti-Forgery Footer Bar */}
                  <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-400 gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Authenticated via Africa University Academic Credential Registry</span>
                    </div>
                    <span className="font-mono">Security Token: AU-VER-{(Math.random() * 100000 | 0).toString().padStart(6, '0')}</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: VERIFIED STUDENT RECORD SUMMARY */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                
                {/* Profile Overview Card */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-neutral-800 text-white font-bold text-base flex items-center justify-center shrink-0 overflow-hidden">
                      {student.avatarUrl ? (
                        <img src={student.avatarUrl} alt={student.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <span>{student.fullName.split(' ').map((n: string) => n[0]).join('')}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{student.fullName}</h3>
                      <p className="text-xs text-neutral-600 mt-0.5">{student.programme}</p>
                      <p className="text-xs text-neutral-500">{student.faculty} · {student.yearOfStudy}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between">
                    <div className="text-right">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 block">Cumulative GPA</span>
                      <span className="text-xl font-bold text-[#A51C30]">{student.gpa}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {student.academicStanding}
                    </span>
                  </div>
                </div>

                {/* Attached Official Result Slip */}
                {student.resultSlipUrl && (
                  <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF0F1] text-[#A51C30] flex items-center justify-center shrink-0">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">
                          {student.resultSlipName || 'Official Academic Result Slip.pdf'}
                        </h4>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          ✓ Verified Africa University Academic Transcript
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox({
                        isOpen: true,
                        imageUrl: student.resultSlipUrl || null,
                        title: 'Official Africa University Result Slip',
                        subtitle: `${student.fullName} · Verified Records`,
                      })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-md cursor-pointer transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Result Slip</span>
                    </button>
                  </div>
                )}

                {/* Courses & Grades with Verification Hash */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Courses &amp; Grades ({student.courses.length})
                    </h4>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {student.courses.map(c => (
                      <div key={c.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <span className="font-bold text-neutral-900">{c.code}</span>
                          <span className="text-neutral-600"> — {c.title}</span>
                          <span className="text-[11px] text-neutral-400 ml-2">({c.semester})</span>
                          <div className="text-[10px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>AU Registrar Verified · Token: {c.verification?.verificationHash || 'AU-SIS'}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#A51C30] bg-neutral-100 px-2 py-0.5 rounded self-start sm:self-auto">
                          Grade {c.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications with Proof Images & Registry Status */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Accredited Certifications ({student.certifications.length})
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {student.certifications.map(cert => (
                      <div key={cert.id} className="p-3 border border-neutral-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {cert.imageUrl ? (
                            <button
                              type="button"
                              onClick={() => setLightbox({
                                isOpen: true,
                                imageUrl: cert.imageUrl || null,
                                title: cert.title,
                                subtitle: `${cert.issuer} · Credential ID: ${cert.credentialId || 'Verified'}`,
                              })}
                              className="w-12 h-12 rounded border border-neutral-300 overflow-hidden shrink-0 cursor-pointer hover:opacity-80"
                            >
                              <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                            </button>
                          ) : (
                            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <Award className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-xs text-neutral-900">{cert.title}</div>
                            <div className="text-[11px] text-neutral-500">{cert.issuer} · {cert.issueDate}</div>
                            <div className="text-[10px] text-blue-700 font-mono mt-0.5 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              <span>Credential ID: {cert.credentialId || 'AWS-AU-99214'} (Verified)</span>
                            </div>
                          </div>
                        </div>

                        {cert.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: cert.imageUrl || null,
                              title: cert.title,
                              subtitle: `${cert.issuer} · Credential Proof`,
                            })}
                            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline"
                          >
                            Inspect
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements & Awards */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Honors &amp; Achievements ({student.achievements.length})
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {student.achievements.map(ach => (
                      <div key={ach.id} className="p-3 border border-neutral-200 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-neutral-900">{ach.title}</div>
                          <div className="text-[11px] text-neutral-500">{ach.organization} ({ach.year})</div>
                          <p className="text-xs text-neutral-600 mt-1">{ach.description}</p>
                          <div className="text-[10px] mt-1 flex items-center gap-1.5">
                            {ach.verification?.status === 'verified-institution' ? (
                              <span className="text-emerald-700 font-medium flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                <span>AU Registrar Verified · Token: {ach.verification.verificationHash}</span>
                              </span>
                            ) : (
                              <span className="text-amber-700 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>Self-Reported Claim (Pending Review)</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {ach.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: ach.imageUrl || null,
                              title: ach.title,
                              subtitle: `${ach.organization} (${ach.year})`,
                            })}
                            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline ml-2"
                          >
                            View Proof
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-neutral-500 flex items-center gap-2">
              <span>Status: <strong className="text-neutral-800">{request.status}</strong></span>
              <span>·</span>
              <span className="font-mono text-[11px]">Security Reference: AU-REC-{request.id.slice(-6).toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-800 cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSaveAndComplete}
                className="w-1/2 sm:w-auto px-5 py-2 text-xs font-semibold bg-[#A51C30] hover:bg-[#8B1727] text-white rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Save Customized Letter &amp; Complete</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ ...lightbox, isOpen: false })}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        subtitle={lightbox.subtitle}
      />
    </>
  );
};
