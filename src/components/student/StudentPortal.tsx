import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentSidebar } from './StudentSidebar';
import { StudentOverview } from './StudentOverview';
import { RequestLetterPage } from './RequestLetterPage';
import { SectionDetailModal } from './SectionDetailModal';
import { 
  SlidersHorizontal, 
  BookOpen, 
  Star, 
  Briefcase, 
  Award, 
  Trophy, 
  ShieldCheck, 
  LayoutDashboard
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const { activeStudentTab, student, recordCompleteness } = useApp();
  const [selectedSection, setSelectedSection] = useState('overview');
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    if (sectionId !== 'overview') {
      setActiveModalSection(sectionId);
    }
  };

  const quickPills = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: `Courses (${student.courses.length})`, icon: BookOpen },
    { id: 'skills', label: `Skills (${student.skills.length})`, icon: Star },
    { id: 'projects', label: `Projects (${student.projects.length})`, icon: Briefcase },
    { id: 'certifications', label: `Certificates (${student.certifications.length})`, icon: Award },
    { id: 'achievements', label: `Awards (${student.achievements.length})`, icon: Trophy },
    { id: 'leadership', label: `Leadership (${student.leadership.length})`, icon: ShieldCheck },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] bg-[#F8F7F5] relative">
      
      {/* 1. Desktop Sidebar (Permanent left column) */}
      {activeStudentTab === 'record' && (
        <div className="hidden md:flex">
          <StudentSidebar
            activeSection={selectedSection}
            onSelectSection={handleSelectSection}
          />
        </div>
      )}

      {/* 2. Mobile Drawer for Sidebar (Off-canvas slide-out) */}
      {activeStudentTab === 'record' && isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] bg-[#18181B] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <StudentSidebar
              activeSection={selectedSection}
              onSelectSection={handleSelectSection}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden min-w-0">
        
        {/* Mobile Toggle Bar: Sticky top bar on mobile record view */}
        {activeStudentTab === 'record' && (
          <div className="md:hidden bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
            
            {/* Top row: Section status & Toggle button */}
            <div className="px-4 py-2.5 flex items-center justify-between gap-3 bg-neutral-50/80 border-b border-neutral-200/70">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2 h-2 rounded-full bg-[#A51C30] shrink-0" />
                <span className="text-xs font-bold text-neutral-800 truncate">
                  {selectedSection === 'overview' ? 'Record Overview' : `Active: ${selectedSection}`}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
                  {recordCompleteness}% complete
                </span>
              </div>

              {/* Toggle Bar Button */}
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] text-white text-xs font-medium hover:bg-neutral-800 transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sections & Stats</span>
              </button>
            </div>

            {/* Quick Horizontal Scroll Pills */}
            <div className="px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 scroll-smooth">
              {quickPills.map((pill) => {
                const Icon = pill.icon;
                const isCurrent = selectedSection === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => handleSelectSection(pill.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#A51C30] text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* Active View Rendering */}
        {activeStudentTab === 'record' ? (
          <StudentOverview />
        ) : (
          <RequestLetterPage />
        )}
      </main>

      {/* Section modal triggered via sidebar or pills */}
      <SectionDetailModal
        sectionId={activeModalSection}
        onClose={() => {
          setActiveModalSection(null);
          setSelectedSection('overview');
        }}
      />
    </div>
  );
};
