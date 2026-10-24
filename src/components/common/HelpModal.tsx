import React from 'react';
import { useApp } from '../../context/AppContext';
import { AfricaUniversityLogo } from '../AfricaUniversityLogo';
import { X, GitBranch } from 'lucide-react';

export const HelpModal: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen } = useApp();

  if (!isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <AfricaUniversityLogo className="h-8" showSubtitle={false} />
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Project Overview &amp; Evaluation Guide</h3>
              <p className="text-xs text-neutral-500">Student Record &amp; Recommendation Letter System</p>
            </div>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-700 leading-relaxed">
          
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h4 className="font-bold text-[#A51C30] uppercase tracking-wide text-xs mb-1">
              Final Exam Project Purpose
            </h4>
            <p>
              This portal bridges the gap between students seeking recommendation letters (for internships, scholarships, and jobs) and academic referees/lecturers who need verified records to quickly and accurately compose formal letters.
            </p>
          </div>

          {/* Quick Flow Walkthrough */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Prototype Testing Flow (Matches Figma 1:1)
            </h4>
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                <strong>Sign in Screen (Screen 1):</strong> Switch between Student and Lecturer roles. Demo credentials are automatically supplied.
              </li>
              <li>
                <strong>Student Record Overview (Screen 2):</strong> View profile standing, dark hero header, and 6 record cards (About me, Courses, Skills, Projects, Certifications, Achievements). Click any card to add/edit items and watch the completeness meter update.
              </li>
              <li>
                <strong>Request a Letter (Screen 3):</strong> Click "Request a letter", select a lecturer, enter application purpose, deadline, and notes. The student record is automatically attached.
              </li>
              <li>
                <strong>Lecturer Desk (Screen 4):</strong> Switch to Lecturer mode. Inspect pending requests, see courses taught, and click <em>"Open student summary"</em> to review the full academic record and generate/copy/print a formal recommendation letter.
              </li>
            </ol>
          </div>

          {/* Git & Team Evaluation Notes */}
          <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <GitBranch className="w-4 h-4 text-[#A51C30]" />
              <span>Team Collaboration &amp; Git Repository Setup</span>
            </div>
            <p className="text-neutral-600">
              The project is set up as a standard Git repository with a modular architecture, clean commit history, and a collaborative <code>README.md</code> with branching workflows (<code>feature/auth</code>, <code>feature/student-record</code>, <code>feature/lecturer-desk</code>) so your team can commit continuously and maximize exam evaluation points.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">Africa University · Academic Computing</span>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
