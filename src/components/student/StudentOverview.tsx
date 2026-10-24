import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EditProfileModal } from './EditProfileModal';
import { SectionDetailModal } from './SectionDetailModal';
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
  Sparkles
} from 'lucide-react';

export const StudentOverview: React.FC = () => {
  const { student, setActiveStudentTab } = useApp();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);

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
    },
    {
      id: 'courses',
      tag: `${student.courses.length} RESULTS & GPA`,
      title: 'Courses & results',
      desc: `${student.courses.length} courses · Overall GPA ${student.gpa || '3.84'}`,
      icon: BookOpen,
    },
    {
      id: 'skills',
      tag: `${student.skills.length} SKILLS LISTED`,
      title: 'Skills',
      desc: student.skills.length > 0 
        ? student.skills.slice(0, 3).map(s => s.name).join(' · ') 
        : 'Skill One · Skill Two · Skill Three',
      icon: Star,
    },
    {
      id: 'projects',
      tag: `${student.projects.length} PROJECT RECORD`,
      title: 'Projects',
      desc: student.projects[0]?.title || 'No project record added yet.',
      icon: Briefcase,
    },
    {
      id: 'certifications',
      tag: `${student.certifications.length} CERTIFICATE RECORD`,
      title: 'Certifications',
      desc: student.certifications[0]?.title || 'No certificate record added yet.',
      icon: Award,
    },
    {
      id: 'achievements',
      tag: `${student.achievements.length} AWARD RECORD`,
      title: 'Achievements',
      desc: student.achievements[0]?.title || 'Achievement or Award',
      icon: Trophy,
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
              {/* Circular Avatar */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-neutral-600 bg-neutral-800 flex items-center justify-center text-neutral-300 font-semibold text-xl shrink-0">
                {student.fullName.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {student.fullName}
                </h1>
                <p className="text-neutral-300 text-sm font-medium mt-1">
                  {student.programme}
                </p>
                <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                  <span>{student.yearOfStudy}</span>
                  <span>·</span>
                  <span>{student.faculty}</span>
                </div>
              </div>
            </div>

            {/* Badges & Edit Profile Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{student.academicStanding}</span>
              </div>

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
              Select any section to view or update it without cluttering your main profile.
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
                    <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-1">
                      {card.tag}
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
              Your verified records empower referees to craft compelling recommendation letters.
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

    </div>
  );
};
