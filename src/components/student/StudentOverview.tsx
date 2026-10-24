import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EditProfileModal } from './EditProfileModal';
import { SectionDetailModal } from './SectionDetailModal';
import { ImageLightboxModal } from '../common/ImageLightboxModal';
import { 
  FileText, 
  BookOpen, 
  Star, 
  Briefcase, 
  Award, 
  Trophy, 
  Check, 
  Pencil, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  FileCheck2,
  Camera
} from 'lucide-react';


export const StudentOverview: React.FC = () => {
  const { student, setActiveStudentTab } = useApp();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);

  // Lightbox preview for result slip or attachments
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

  // Cards data
  const cards = [
    {
      id: 'about',
      tag: 'PERSONAL STATEMENT',
      title: 'About me',
      desc: student.aboutMe 
        ? (student.aboutMe.slice(0, 85) + '...') 
        : 'Add a short introduction describing your academic interests, goals, and the work you are most proud of.',
      icon: FileText,
      badge: undefined,
    },
    {
      id: 'courses',
      tag: `${student.courses.length} RESULTS & GPA`,
      title: 'Courses & results',
      desc: `${student.courses.length} courses · Overall GPA ${student.gpa || '3.84'}`,
      icon: BookOpen,
      badge: student.resultSlipUrl ? 'Result Slip Attached' : undefined,
    },
    {
      id: 'skills',
      tag: `${student.skills.length} SKILLS LISTED`,
      title: 'Skills',
      desc: student.skills.length > 0 
        ? student.skills.slice(0, 3).map(s => s.name).join(' · ') 
        : 'Skill One · Skill Two · Skill Three',
      icon: Star,
      badge: undefined,
    },
    {
      id: 'projects',
      tag: `${student.projects.length} PROJECT RECORD`,
      title: 'Projects',
      desc: student.projects[0]?.title || 'No project record added yet.',
      icon: Briefcase,
      badge: student.projects.some(p => p.imageUrl) ? 'Preview Image' : undefined,
    },
    {
      id: 'certifications',
      tag: `${student.certifications.length} CERTIFICATE RECORD`,
      title: 'Certifications',
      desc: student.certifications[0]?.title || 'No certificate record added yet.',
      icon: Award,
      badge: student.certifications.some(c => c.imageUrl) ? 'Certificate Image' : undefined,
    },
    {
      id: 'achievements',
      tag: `${student.achievements.length} AWARD RECORD`,
      title: 'Achievements',
      desc: student.achievements[0]?.title || 'Achievement or Award',
      icon: Trophy,
      badge: student.achievements.some(a => a.imageUrl) ? 'Award Proof' : undefined,
    },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
      
      {/* 1. Dark Hero Card matching Figma */}
      <div className="relative rounded-2xl bg-[#18181B] text-white p-6 sm:p-8 overflow-hidden shadow-sm border border-neutral-800">
        {/* Subtle red ambient glow in the top right */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#A51C30]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-[#E53E3E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            Student Record
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Circular Avatar with custom photo or initials */}
              <div 
                onClick={() => setIsEditProfileOpen(true)}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-neutral-600 bg-neutral-800 flex items-center justify-center text-neutral-300 font-semibold text-xl shrink-0 overflow-hidden relative group cursor-pointer"
                title="Click to edit profile or upload photo"
              >
                {student.avatarUrl ? (
                  <img src={student.avatarUrl} alt={student.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span>{student.fullName.split(' ').map((n: string) => n[0]).join('')}</span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs">
                  <Camera className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {student.fullName}
                </h1>
                <p className="text-neutral-300 text-sm font-medium mt-1">
                  {student.programme}
                </p>
                <div className="text-xs text-neutral-400 mt-1 flex flex-wrap items-center gap-2">
                  <span>{student.yearOfStudy}</span>
                  <span>·</span>
                  <span>{student.faculty}</span>
                  <span>·</span>
                  <span className="font-semibold text-red-300">GPA {student.gpa}</span>
                </div>
              </div>
            </div>

            {/* Badges & Edit Profile Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{student.academicStanding}</span>
              </div>

              {student.resultSlipUrl && (
                <button
                  onClick={() => setLightbox({
                    isOpen: true,
                    imageUrl: student.resultSlipUrl || null,
                    title: 'Official Africa University Result Slip',
                    subtitle: `${student.fullName} · ${student.programme}`,
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-700/60 text-red-300 text-xs font-medium hover:bg-red-900/60 transition-colors cursor-pointer"
                  title="View official result slip"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>View Result Slip</span>
                </button>
              )}

              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Record At A Glance Section */}
      <div>
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="text-[#A51C30] text-[11px] font-bold tracking-[0.18em] uppercase mb-1">
              Your Record At A Glance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Everything a lecturer needs, organised.
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              Select any section to view or update documents, results slips, and certificates without cluttering your main profile.
            </p>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => setActiveModalSection(card.id)}
                className="group p-5 bg-white rounded-xl border border-neutral-200 hover:border-[#A51C30]/40 hover:shadow-md transition-all text-left flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF0F1] text-[#A51C30] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#A51C30] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                        {card.tag}
                      </span>
                      {card.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#A51C30] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed max-w-sm line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="text-neutral-400 group-hover:text-[#A51C30] group-hover:translate-x-0.5 transition-all self-center ml-2">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom CTA Banner */}
      <div className="rounded-xl bg-neutral-100 border border-neutral-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              Build a complete academic story.
            </h4>
            <p className="text-xs text-neutral-600">
              Your verified records and uploaded result slips empower referees to craft accurate recommendation letters.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveStudentTab('request')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>Request a recommendation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />

      <SectionDetailModal
        sectionId={activeModalSection}
        onClose={() => setActiveModalSection(null)}
      />

      <ImageLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ ...lightbox, isOpen: false })}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        subtitle={lightbox.subtitle}
      />

    </div>
  );
};
