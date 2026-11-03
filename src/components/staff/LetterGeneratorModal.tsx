import React, { useState } from 'react';
import { useApp, formatTodayDDMMYYYY } from '../../context/AppContext';
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
  FileCheck2, 
  Eye, 
  RotateCcw, 
  Save, 
  SlidersHorizontal, 
  Plus, 
  FileEdit
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
  const staffTitle = 'Senior Lecturer & Head of Department';
  const staffDept = request.staffDepartment || request.lecturerDepartment || 'Department of Computer Science';
  const staffName = request.staffName || request.lecturerName || 'Dr. Farai Muringani';

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

  // Standard DD/MM/YYYY date
  const today = formatTodayDDMMYYYY();

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
      ? `ACADEMIC VERIFICATION ASSURANCE: All academic results, semester GPA metrics (${student.gpa}), and academic standings have been reviewed and verified by Africa University academic staff (Demo Reference: AU-SIM-${request.relevantCourses[0]?.code.replace(/\s+/g, '') || '2026'}).`
      : '';

    return `TO WHOM IT MAY CONCERN,

RE: ACADEMIC & PROFESSIONAL RECOMMENDATION FOR ${student.fullName.toUpperCase()} (STUDENT ID: ${student.studentId})
APPLICATION CATEGORY: ${request.purpose.toUpperCase()}
DATE OF EVALUATION: ${today}

It is my distinct privilege to write this formal letter of recommendation on behalf of ${student.fullName}, who is currently in their ${student.yearOfStudy} pursuing a ${student.programme} within the ${student.faculty} at Africa University.

I have supervised and evaluated ${student.fullName} in my role as ${staffTitle}, ${staffDept}. In my classes, including ${courseMentions || 'advanced computing coursework'}, ${student.fullName} earned top-tier grades, demonstrating exceptional critical thinking, disciplined study habits, and collaborative initiative. Currently, ${student.fullName} holds a Cumulative GPA of ${student.gpa} and official standing of ${student.academicStanding}.

${templateFocus}

${leadershipMention}

${verifiedDocsMention}

${tonePhrasing} The candidate has applied for a ${request.purpose}, and I am certain they will prove to be an outstanding contributor to your institution or enterprise.

Please contact my office directly should you require further verification or supplementary academic records.

Yours faithfully,

${staffName}
${staffTitle}
${staffDept}
Africa University
Fairview Mountain, Old Mutare, Zimbabwe
Email: staff.demo@university.edu
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
          
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4 bg-neutral-100/60">
            <div className="flex items-center gap-3">
              <AfricaUniversityLogo className="h-10" />
              <div className="h-6 w-px bg-neutral-300 hidden sm:block" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span>Recommendation Letter Studio (Optional Use)</span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {accreditationTrustScore}% Verified Profile
                  </span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Optional drafting tool for {student.fullName} ({request.purpose})
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
            
            {/* Demo Notice */}
            <div className="mb-4 p-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-neutral-600 flex items-center justify-between">
              <span><strong>Demo data: verification is simulated.</strong> Date format: DD/MM/YYYY.</span>
              <span className="font-mono text-neutral-500 text-[11px]">{today}</span>
            </div>

            {/* TAB 1: EDITABLE LETTER STUDIO */}
            {activeTab === 'letter' && (
              <div className="space-y-4">
                
                {/* Control Panel: Template Focus & Tone Selection */}
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#A51C30]" />
                      <span>Customization Controls</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleResetToTemplate}
                      className="text-[11px] text-neutral-500 hover:text-[#A51C30] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      title="Reset letter back to default template"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset to Template</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Template Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Application Focus:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('placement')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTemplate === 'placement'
                              ? 'bg-[#FAF0F1] text-[#A51C30] border-[#A51C30] shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Placement / Job
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('scholarship')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTemplate === 'scholarship'
                              ? 'bg-[#FAF0F1] text-[#A51C30] border-[#A51C30] shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Scholarship
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTemplateChange('grad-school')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTemplate === 'grad-school'
                              ? 'bg-[#FAF0F1] text-[#A51C30] border-[#A51C30] shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Postgraduate
                        </button>
                      </div>
                    </div>

                    {/* Tone Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Endorsement Tone:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToneChange('highest')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTone === 'highest'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Top 5% Highest
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToneChange('strong')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTone === 'strong'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Strong
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToneChange('balanced')}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedTone === 'balanced'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-xs'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          Balanced
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Quick Insert Snippet Chips */}
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                      1-Click Verified Data Inserts (click to append to letter):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {request.relevantCourses.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleInsertText(`In ${c.title} (${c.code}), ${student.fullName} achieved an outstanding grade of ${c.grade}, demonstrating mastery of theoretical constructs and practical lab implementations.`)}
                          className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3 text-neutral-500" />
                          <span>Coursework: {c.code} ({c.grade})</span>
                        </button>
                      ))}

                      {student.achievements[0] && (
                        <button
                          type="button"
                          onClick={() => handleInsertText(`${student.fullName} earned official recognition on the Dean's Academic Honor List for exemplary semester GPA achievement.`)}
                          className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3 text-amber-600" />
                          <span>Dean's Honor Roll</span>
                        </button>
                      )}

                      {student.certifications[0] && (
                        <button
                          type="button"
                          onClick={() => handleInsertText(`Furthermore, the candidate holds industry accreditation as an ${student.certifications[0].title} issued by ${student.certifications[0].issuer} (Credential ID: ${student.certifications[0].credentialId || 'Verified'}).`)}
                          className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3 text-blue-600" />
                          <span>AWS Credential</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleInsertText(`INSTITUTIONAL RECORD ASSURANCE: All academic credentials, GPA records (${student.gpa}), and exam marks have been audited by academic staff (Simulated Verification Token: AU-SIM-${Date.now().toString().slice(-4)}).`)}
                        className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Staff Verification Assurance</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editable Letter Canvas with Letterhead Frame */}
                <div className="bg-white rounded-xl border border-neutral-300 shadow-sm p-6 sm:p-8 space-y-4">
                  {/* Formal Letterhead */}
                  <div className="border-b-2 border-[#A51C30] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <AfricaUniversityLogo className="h-12" />
                      <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-1">
                        Faculty of Engineering &amp; Applied Sciences
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {staffDept} · Fairview Mountain, Old Mutare, Zimbabwe
                      </div>
                    </div>
                    <div className="text-right text-xs text-neutral-500">
                      <div className="font-bold text-neutral-900">Ref: AU-REC-2026-X889</div>
                      <div>Date: {today}</div>
                    </div>
                  </div>

                  {/* Textarea for live referee editing */}
                  <div className="relative">
                    <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Referee Recommendation Draft (Directly Editable):
                    </label>
                    <textarea
                      rows={18}
                      value={letterContent}
                      onChange={(e) => setLetterContent(e.target.value)}
                      className="w-full p-4 rounded-lg border border-neutral-300 bg-neutral-50/50 text-neutral-900 text-xs sm:text-sm font-serif leading-relaxed focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
                      placeholder="Type or customize your recommendation letter here..."
                    />
                    
                    {/* Character and word stats pill */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 px-1">
                      <span>Click anywhere in the text above to edit, rephrase, or add custom remarks.</span>
                      <span className="font-mono">{wordCount} words · {charCount} chars</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: VERIFIED ACADEMIC PROOFS & RESULT SLIP AUDIT */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                
                {/* Result Slip Preview Banner */}
                {student.resultSlipUrl && (
                  <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">
                          Official Result Slip Attached
                        </h4>
                        <p className="text-xs text-neutral-500">
                          {student.resultSlipName || 'AU_Result_Slip_2026.pdf'} · Uploaded {student.resultSlipUploadedAt || today}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox({
                        isOpen: true,
                        imageUrl: student.resultSlipUrl || null,
                        title: 'Official Africa University Result Slip',
                        subtitle: `${student.fullName} (${student.studentId})`,
                      })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#A51C30] text-white hover:bg-[#8B1727] text-xs font-semibold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Full Result Slip</span>
                    </button>
                  </div>
                )}

                {/* Coursework & Grades Card */}
                <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#A51C30]" />
                      <span>Academic Results (GPA: {student.gpa} · {student.academicStanding})</span>
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {student.courses.map((course) => (
                      <div key={course.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-neutral-900">{course.title}</div>
                          <div className="text-[11px] text-neutral-500">{course.code} · {course.semester} · {course.credits} Credits</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm text-[#A51C30] bg-[#FAF0F1] px-2.5 py-0.5 rounded border border-[#A51C30]/20">
                            Grade: {course.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications with Proof Lightbox */}
                <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-2">
                    <Award className="w-4 h-4 text-[#A51C30]" />
                    <span>External Certifications &amp; Achievements</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {student.certifications.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/50 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-xs text-neutral-900">{cert.title}</div>
                            <div className="text-[11px] text-neutral-500">{cert.issuer} · Issued {cert.issueDate}</div>
                          </div>
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                            Verified
                          </span>
                        </div>
                        {cert.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: cert.imageUrl || null,
                              title: cert.title,
                              subtitle: cert.issuer,
                            })}
                            className="text-xs text-[#A51C30] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Certificate Proof</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-3.5 border-t border-neutral-200 bg-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-neutral-600" />
                <span>{savedFeedback ? 'Draft Saved!' : 'Save Custom Draft'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-neutral-600" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSaveAndComplete}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save and Mark as Completed</span>
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
