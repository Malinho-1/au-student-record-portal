import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { RequestPurpose } from '../../types';
import { Check, ArrowRight, CheckCircle2 } from 'lucide-react';


export const RequestLetterPage: React.FC = () => {
  const { lecturers, createRequest, setActiveStudentTab } = useApp();

  const [lecturerId, setLecturerId] = useState(lecturers[0]?.id || '');
  const [purpose, setPurpose] = useState<RequestPurpose>('Scholarship');
  const [deadline, setDeadline] = useState('2026-11-20');
  const [shortNote, setShortNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecturerId || !deadline) return;

    createRequest({
      lecturerId,
      purpose,
      deadline,
      shortNote: shortNote.trim() || 'Please consider my academic performance and project contributions for this application.',
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 p-6 sm:p-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-neutral-200 shadow-lg text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Request Sent Successfully!</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Your recommendation request and verified academic record have been submitted to the lecturer's Recommendation Desk.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setActiveStudentTab('record')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-xs font-semibold transition-colors"
            >
              Return to My Record
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setShortNote('');
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 sm:p-10 lg:p-14 overflow-y-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Context & Automatic Attachment note */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[#A51C30] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              Recommendation Request
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              Request a letter
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed">
              Give your lecturer enough context to write an accurate recommendation based on your student record.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Your record is attached automatically
                </h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Courses, projects, achievements, skills, and leadership experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-[#A51C30] text-white flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Request details</h3>
                <p className="text-xs text-neutral-500">All fields help the lecturer prepare the right letter.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. Lecturer Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Choose a lecturer
                </label>
                <div className="relative">
                  <select
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all cursor-pointer"
                  >
                    {lecturers.map((lec) => (
                      <option key={lec.id} value={lec.id}>
                        {lec.name} — {lec.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 2. Purpose Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as RequestPurpose)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="Scholarship">Scholarship</option>
                  <option value="Internship">Internship</option>
                  <option value="Job Application">Job Application</option>
                  <option value="Graduate School">Graduate School</option>
                  <option value="Research Fellowship">Research Fellowship</option>
                  <option value="Exchange Programme">Exchange Programme</option>
                </select>
              </div>

              {/* 3. Submission Deadline */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Submission deadline
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* 4. Short Note */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Short note
                </label>
                <textarea
                  rows={4}
                  value={shortNote}
                  onChange={(e) => setShortNote(e.target.value)}
                  placeholder="Explain the opportunity and what the letter should highlight."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                <span>Submit request</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
