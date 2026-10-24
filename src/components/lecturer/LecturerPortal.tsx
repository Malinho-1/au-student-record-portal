import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { RequestStatus } from '../../types';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { 
  BookOpen, 
  Check, 
  ArrowRight, 
  Inbox
} from 'lucide-react';


export const LecturerPortal: React.FC = () => {
  const { 
    requests, 
    selectedRequestId, 
    setSelectedRequestId, 
    updateRequestStatus 
  } = useApp();

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Find currently selected request
  const selectedRequest = requests.find(r => r.id === selectedRequestId) || requests[0];

  const openRequestsCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Review').length;

  const getStatusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Declined':
        return 'bg-neutral-100 text-neutral-600 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto bg-[#F8F7F5]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Open Requests Counter matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="text-[#A51C30] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
              Lecturer Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Recommendation desk
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Review requests and open a student's record summary for letter writing.
            </p>
          </div>

          {/* Open Requests Counter Box */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center gap-4 self-start sm:self-auto min-w-[140px] justify-between">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold text-xl">
              {openRequestsCount}
            </div>
            <div className="text-right">
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {openRequestsCount}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-1 block">
                Open requests
              </span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Requests List Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900">Requests</h2>
              <span className="text-xs text-neutral-400 font-medium">
                {requests.length} total
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="p-8 text-center text-neutral-400">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No recommendation requests yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 max-h-[550px] overflow-y-auto">
                {requests.map((req) => {
                  const isSelected = selectedRequest?.id === req.id;
                  const initials = req.studentName.split(' ').map(n => n[0]).join('');

                  return (
                    <button
                      key={req.id}
                      onClick={() => setSelectedRequestId(req.id)}
                      className={`w-full text-left p-4 transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-50/90 border-l-4 border-l-[#A51C30]'
                          : 'hover:bg-neutral-50/50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-neutral-900 truncate">
                            {req.studentName}
                          </h4>
                          <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1.5">
                            <span className="font-medium text-neutral-700">{req.purpose}</span>
                            <span>·</span>
                            <span>{req.deadline}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Selected Request Card */}
          <div className="lg:col-span-8">
            {selectedRequest ? (
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
                
                {/* Header: Student Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {selectedRequest.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-400">
                        Selected Request
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">
                        {selectedRequest.studentName}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {selectedRequest.studentProgramme} — {selectedRequest.studentYear}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3-Column Metadata Row */}
                <div className="grid grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Purpose
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {selectedRequest.purpose}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Deadline
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {selectedRequest.deadline}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Status
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-block ${getStatusBadgeClass(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>

                {/* Highlight box: Courses You Taught This Student */}
                <div className="p-4 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2]/60 space-y-2">
                  <div className="flex items-center gap-2 text-[#A51C30]">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Courses You Taught This Student
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    {selectedRequest.relevantCourses.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-900">
                          {c.title} · <span className="font-mono text-neutral-600">{c.code}</span>
                        </span>
                        <span className="font-bold text-[#A51C30] bg-white px-2 py-0.5 rounded border border-red-200 shadow-2xs">
                          Grade: {c.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Note */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-neutral-700">Student note</h4>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed italic">
                    "{selectedRequest.shortNote}"
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateRequestStatus(selectedRequest.id, e.target.value as RequestStatus)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-neutral-300 bg-white text-neutral-800 focus:outline-hidden cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  {/* Mark as completed & Open student summary */}
                  <div className="flex items-center gap-3">
                    {selectedRequest.status !== 'Completed' && (
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'Completed')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark as completed</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsGeneratorOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Open student summary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-400">
                <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-neutral-700">No Request Selected</h3>
                <p className="text-xs text-neutral-500 mt-1">Select a request from the left list to review details.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Recommendation Generator & Student Summary Modal */}
      {selectedRequest && (
        <LetterGeneratorModal
          request={selectedRequest}
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
        />
      )}

    </div>
  );
};
