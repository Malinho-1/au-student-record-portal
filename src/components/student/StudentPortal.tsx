import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentSidebar } from './StudentSidebar';
import { StudentOverview } from './StudentOverview';
import { RequestLetterPage } from './RequestLetterPage';
import { SectionDetailModal } from './SectionDetailModal';

export const StudentPortal: React.FC = () => {
  const { activeStudentTab } = useApp();
  const [selectedSection, setSelectedSection] = useState('overview');
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);

  const handleSelectSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    if (sectionId !== 'overview') {
      setActiveModalSection(sectionId);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4.5rem)] bg-[#F8F7F5]">
      {/* Sidebar is shown on the Record view */}
      {activeStudentTab === 'record' && (
        <StudentSidebar
          activeSection={selectedSection}
          onSelectSection={handleSelectSection}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {activeStudentTab === 'record' ? (
          <StudentOverview />
        ) : (
          <RequestLetterPage />
        )}
      </main>

      {/* Section modal triggered via sidebar */}
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
