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
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Star, 
  Award, 
  ShieldCheck,
  FileCheck,
  FileCheck2,
  Eye
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
  const { student, updateRequestStatus, saveGeneratedLetter } = useApp();

  const [activeTab, setActiveTab] = useState<'letter' | 'summary'>('letter');
  const [copied, setCopied] = useState(false);

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

  // Generate automated recommendation letter draft based on student records
  const generateInitialLetter = () => {
    const courseMentions = request.relevantCourses
      .map(c => `${c.title} (${c.code}, Grade: ${c.grade})`)
      .join(', ');

    const projectMentions = student.projects.length > 0 
      ? `During the academic year, ${student.fullName} demonstrated high technical competence leading projects such as "${student.projects[0].title}", applying modern engineering methodologies.`
      : '';

    const leadershipMention = student.leadership.length > 0
      ? `Beyond classroom excellence, ${student.fullName} served as ${student.leadership[0].role} for ${student.leadership[0].organization}, exhibiting strong integrity, work ethic, and peer collaboration.`
      : '';

    const verifiedDocsMention = student.resultSlipUrl
      ? `All grades and academic achievements mentioned herein have been corroborated with the official academic result slip and certified university transcript on record.`
      : '';

    return `TO WHOM IT MAY CONCERN,

RE: RECOMMENDATION LETTER FOR ${student.fullName.toUpperCase()} (STUDENT ID: ${student.studentId})
PURPOSE: ${request.purpose.toUpperCase()} APPLICATION

It is my distinct pleasure to write this letter of recommendation in support of ${student.fullName}, who is currently enrolled as a ${student.yearOfStudy} student pursuing a ${student.programme} within the ${student.faculty} at Africa University.

I have known ${student.fullName} in my capacity as ${request.lecturerName}, ${request.lecturerDepartment}. In my classes, including ${courseMentions || 'advanced computing coursework'}, ${student.fullName} consistently ranked among the top performers, demonstrating analytical rigor, intellectual curiosity, and exemplary academic discipline. Currently, ${student.fullName} maintains a Cumulative GPA of ${student.gpa} and holds an official standing of ${student.academicStanding}.

${projectMentions}

${student.skills.length > 0 ? `In terms of technical proficiencies, ${student.fullName} has developed verified strengths in ${student.skills.map(s => s.name).join(', ')}.` : ''}

${leadershipMention}

${verifiedDocsMention}

The student has indicated that this recommendation is intended for a ${request.purpose}. Considering ${student.fullName}'s stellar academic record, problem-solving aptitude, and proactive initiative, I recommend this candidate with highest enthusiasm and without reservation. I am confident that ${student.fullName} will be an exceptional asset to your esteemed organization.

Please feel free to contact me should you require any additional academic references or verification.

Sincerely,

${request.lecturerName}
${request.lecturerDepartment}
Africa University
Fairview Mountain, Old Mutare, Zimbabwe
Email: ${request.lecturerId === 'lec-1' ? 'muringanif@africau.edu' : 'faculty@africau.edu'}`;
  };

  const [letterContent, setLetterContent] = useState(
    request.generatedLetter || generateInitialLetter()
  );

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAndComplete = () => {
    saveGeneratedLetter(request.id, letterContent);
    updateRequestStatus(request.id, 'Completed');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs">
        <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
            <div className="flex items-center gap-4">
              <AfricaUniversityLogo className="h-9" showSubtitle={false} />
              <div className="h-6 w-px bg-neutral-300 hidden sm:block" />
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Letter Writing Assistant &amp; Student Summary
                </h3>
                <p className="text-xs text-neutral-500">
                  Referee tools for {student.fullName} · {request.purpose}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Switcher */}
              <div className="flex bg-neutral-200/70 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'letter'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Letter Draft
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'summary'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Full Academic Record
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors ml-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FBFBFA]">
            
            {/* TAB 1: LETTER DRAFT */}
            {activeTab === 'letter' && (
              <div className="space-y-4">
                
                {/* Quick Assistant Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-2 text-xs text-neutral-700">
                    <Sparkles className="w-4 h-4 text-[#A51C30]" />
                    <span className="font-semibold">Auto-drafted from verified student records:</span>
                    <span className="text-neutral-500 hidden sm:inline">
                      GPA {student.gpa} · {request.relevantCourses.length} Courses Taught
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                      <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>

                {/* Editable Official Letter Canvas */}
                <div className="bg-white p-8 sm:p-12 rounded-xl border border-neutral-200 shadow-sm space-y-4 print:shadow-none print:border-none">
                  <div className="border-b border-neutral-200 pb-4 flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-serif font-black tracking-wide text-[#A51C30] uppercase">
                        Africa University
                      </h2>
                      <p className="text-xs text-neutral-500 font-serif italic">
                        Office of the Dean &amp; Academic Referees · Faculty of Engineering &amp; Applied Sciences
                      </p>
                    </div>
                    <div className="text-right text-xs text-neutral-500">
                      <div>Date: {today}</div>
                      <div>Mutare, Zimbabwe</div>
                    </div>
                  </div>

                  <textarea
                    rows={18}
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    className="w-full text-xs sm:text-sm font-sans leading-relaxed text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-[#A51C30] p-2 rounded resize-y font-mono whitespace-pre-wrap"
                  />

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-center text-[11px] text-neutral-400">
                    <span>Digitally generated via Africa University Student Record &amp; Recommendation Portal</span>
                    <span>Ref: AU-REC-{request.id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: FULL STUDENT RECORD SUMMARY */}
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

                {/* Attached Official Result Slip / Transcript */}
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

                {/* Personal Statement */}
                {student.aboutMe && (
                  <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">Personal Statement</h4>
                    <p className="text-xs text-neutral-700 leading-relaxed">{student.aboutMe}</p>
                  </div>
                )}

                {/* Courses & Grades */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Courses &amp; Grades ({student.courses.length})
                    </h4>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {student.courses.map(c => (
                      <div key={c.id} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-neutral-900">{c.code}</span>
                          <span className="text-neutral-600"> — {c.title}</span>
                          <span className="text-[11px] text-neutral-400 ml-2">({c.semester})</span>
                        </div>
                        <span className="font-bold text-[#A51C30] bg-neutral-100 px-2 py-0.5 rounded">
                          Grade {c.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Technical &amp; Soft Competencies
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map(s => (
                      <span key={s.id} className="px-2.5 py-1 rounded-md text-xs bg-neutral-100 text-neutral-800 border border-neutral-200">
                        {s.name} <span className="text-[10px] text-neutral-400">({s.category})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-[#A51C30]" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Projects ({student.projects.length})
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {student.projects.map(p => (
                      <div key={p.id} className="border-l-2 border-[#A51C30] pl-3 py-1 flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs text-neutral-900">{p.title}</div>
                          <div className="text-[11px] text-[#A51C30] font-medium">{p.role} · {p.period}</div>
                          <p className="text-xs text-neutral-600 mt-1">{p.description}</p>
                        </div>
                        {p.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: p.imageUrl || null,
                              title: p.title,
                              subtitle: `${p.role} · Project Preview`,
                            })}
                            className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-300 shrink-0 cursor-pointer"
                            title="View project screenshot"
                          >
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Awards with Image Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-[#A51C30]" />
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Certifications</h4>
                    </div>
                    {student.certifications.map(cert => (
                      <div key={cert.id} className="text-xs py-2 flex items-center justify-between border-b border-neutral-100 last:border-b-0">
                        <div>
                          <div className="font-bold text-neutral-800">{cert.title}</div>
                          <div className="text-[11px] text-neutral-500">{cert.issuer} · {cert.issueDate}</div>
                        </div>
                        {cert.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: cert.imageUrl || null,
                              title: cert.title,
                              subtitle: `${cert.issuer} · Certificate Proof`,
                            })}
                            className="w-10 h-10 rounded border border-neutral-300 overflow-hidden shrink-0 cursor-pointer hover:opacity-80"
                            title="Inspect certificate proof"
                          >
                            <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#A51C30]" />
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Leadership &amp; Awards</h4>
                    </div>
                    {student.achievements.map(ach => (
                      <div key={ach.id} className="text-xs py-2 flex items-center justify-between border-b border-neutral-100 last:border-b-0">
                        <div>
                          <div className="font-bold text-neutral-800">{ach.title}</div>
                          <div className="text-[11px] text-neutral-500">{ach.organization} ({ach.year})</div>
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
                            className="w-10 h-10 rounded border border-neutral-300 overflow-hidden shrink-0 cursor-pointer hover:opacity-80"
                            title="Inspect award document"
                          >
                            <img src={ach.imageUrl} alt={ach.title} className="w-full h-full object-cover" />
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
          <div className="px-6 py-4 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-neutral-500">
              Request status: <span className="font-bold text-neutral-800">{request.status}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-800 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleSaveAndComplete}
                className="w-1/2 sm:w-auto px-5 py-2 text-xs font-semibold bg-[#A51C30] hover:bg-[#8B1727] text-white rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Save &amp; Mark Completed</span>
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
