import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Star, 
  Briefcase, 
  Award, 
  Trophy, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface StudentSidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { student, recordCompleteness, setActiveStudentTab } = useApp();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: undefined },
    { id: 'about', label: 'About me', icon: FileText, count: undefined },
    { id: 'courses', label: 'Courses & results', icon: BookOpen, count: student.courses.length },
    { id: 'skills', label: 'Skills', icon: Star, count: student.skills.length },
    { id: 'projects', label: 'Projects', icon: Briefcase, count: student.projects.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: student.certifications.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: student.achievements.length },
    { id: 'leadership', label: 'Leadership', icon: ShieldCheck, count: student.leadership.length },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#18181B] text-neutral-300 flex flex-col justify-between shrink-0 p-4 border-r border-neutral-800">
      
      {/* Top Profile Capsule */}
      <div>
        <div className="flex items-center gap-3 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 mb-6">
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 font-semibold text-sm">
            {student.fullName ? student.fullName.split(' ').map((n: string) => n[0]).join('') : 'SN'}
          </div>

          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold text-white truncate">
              {student.fullName}
            </h3>
            <p className="text-xs text-neutral-400 truncate">
              {student.programme}
            </p>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-3 mb-2 text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-500">
          My Student Record
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#A51C30] text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-black/25 text-white'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Completeness and CTA */}
      <div className="pt-6 border-t border-neutral-800/80 mt-6 space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-400 text-[11px] font-medium">Record completeness</span>
            <span className="text-white font-bold text-xs">{recordCompleteness}%</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#A51C30] h-full transition-all duration-500 rounded-full"
              style={{ width: `${recordCompleteness}%` }}
            />
          </div>
          <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed">
            Complete every section to help your lecturer write a stronger letter.
          </p>
        </div>

        {/* Start a new request action card */}
        <button
          onClick={() => setActiveStudentTab('request')}
          className="w-full text-left p-3 rounded-lg bg-neutral-900 hover:bg-neutral-800/90 border border-neutral-800 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div>
            <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
              Request a letter
            </div>
            <div className="text-[10px] text-neutral-400">
              Start a new request
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
        </button>
      </div>

    </aside>
  );
};
