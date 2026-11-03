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
              <p className="text-xs text-neutral-500">Student Academic Record &amp; Verification Portal</p>
            </div>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-700 leading-relaxed">
          
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h4 className="font-bold text-[#A51C30] uppercase tracking-wide text-xs mb-1">
              Project Purpose
            </h4>
            <p>
              A student builds a complete, documented academic record (courses and grades, result slips, certifications, achievements, projects, leadership). Academic staff review and verify the claims. Recommendation letters are one optional use of a verified record, not the main purpose.
            </p>
            <p className="text-[11px] text-neutral-500 mt-2">
              <strong>Demo data: verification is simulated.</strong> Standard date format: DD/MM/YYYY.
            </p>
          </div>

          {/* Quick Flow Walkthrough */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">
              Prototype Testing Flow
            </h4>
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                <strong>Sign in Screen:</strong> Switch between Student and Academic Staff roles. Demo credentials are supplied automatically.
              </li>
              <li>
                <strong>Student Record Overview:</strong> View profile standing, dark hero header, and 6 record cards (About me, Courses &amp; results, Skills, Projects, Certifications, Achievements). Click any card to inspect claims and uploaded evidence.
              </li>
              <li>
                <strong>Verification Desk (Academic Staff):</strong> Switch to Academic Staff mode. Inspect student records awaiting review, see the "Courses you taught this student" panel and grades, and use <em>"Accredit &amp; Endorse Claim"</em> as the main feature.
              </li>
              <li>
                <strong>Optional Letter Service:</strong> Recommendation letters can be generated as an optional reference from the student&apos;s verified record if requested.
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
              The project is set up as a standard Git repository with a modular architecture, clean commit history, and a collaborative <code>README.md</code> with branching workflows (<code>feature/auth</code>, <code>feature/student-record</code>, <code>feature/staff-verification</code>) so your team can commit continuously and maximize evaluation points.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">Africa University · Academic Computing</span>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
