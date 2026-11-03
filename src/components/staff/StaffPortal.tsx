import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { RequestStatus } from '../../types';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { ImageLightboxModal } from '../common/ImageLightboxModal';
import { 
  BookOpen, 
  Check, 
  Inbox, 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  FileEdit
} from 'lucide-react';

export const StaffPortal: React.FC = () => {
  const { 
    requests, 
    selectedRequestId, 
    setSelectedRequestId, 
    updateRequestStatus,
    student,
    accreditationTrustScore,
    accreditClaim
  } = useApp();

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Lightbox preview for result slip or evidence images
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

  // Find currently selected record
  const selectedRequest = requests.find(r => r.id === selectedRequestId) || requests[0];
  const pendingReviewCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Review').length;

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

  const currentResultSlip = selectedRequest?.resultSlipUrl || student.resultSlipUrl;

  return (
    <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto bg-[#F8F7F5]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Review Queue Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="text-[#A51C30] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
              Academic Staff Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Verification desk
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Review student academic records and verify claims. Recommendation letters are an optional secondary reference.
            </p>
          </div>

          {/* Pending Review Counter Box */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center gap-4 self-start sm:self-auto min-w-[150px] justify-between">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold text-xl">
              {pendingReviewCount}
            </div>
            <div className="text-right">
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {pendingReviewCount}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-1 block">
                Awaiting review
              </span>
            </div>
          </div>
        </div>

        {/* Demo simulation banner notice */}
        <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-neutral-600 flex items-center justify-between">
          <span>
            <strong>Demo data: verification is simulated.</strong> Claims and verification badges represent faculty review workflows.
          </span>
          <span className="text-[10px] font-mono text-neutral-400">Date format: DD/MM/YYYY</span>
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Student Records List */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900">Student Records for Review</h2>
              <span className="text-xs text-neutral-400 font-medium">
                {requests.length} total
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="p-8 text-center text-neutral-400">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No student records waiting for review.</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 max-h-[550px] overflow-y-auto">
                {requests.map((req) => {
                  const isSelected = selectedRequest?.id === req.id;
                  const initials = req.studentName.split(' ').map((n: string) => n[0]).join('');

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

          {/* Right Column: Selected Record Verification Workspace */}
          <div className="lg:col-span-8">
            {selectedRequest ? (
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
                
                {/* Header: Student Info & Attached Documents */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {selectedRequest.studentName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-400">
                        Selected Student Record
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">
                        {selectedRequest.studentName}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {selectedRequest.studentProgramme} — {selectedRequest.studentYear}
                      </p>
                    </div>
                  </div>

                  {currentResultSlip && (
                    <button
                      type="button"
                      onClick={() => setLightbox({
                        isOpen: true,
                        imageUrl: currentResultSlip,
                        title: 'Official Africa University Result Slip',
                        subtitle: `${selectedRequest.studentName} · Documented Proof`,
                      })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF0F1] hover:bg-[#F3D6D9] text-[#A51C30] border border-[#FCA5A5] text-xs font-semibold transition-colors cursor-pointer self-start"
                      title="Inspect student's uploaded result slip"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>View Official Result Slip</span>
                    </button>
                  )}
                </div>

                {/* 3-Column Metadata Row (Using DD/MM/YYYY) */}
                <div className="grid grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Context / Purpose
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {selectedRequest.purpose}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Target Date (DD/MM/YYYY)
                    </span>
                    <span className="text-xs font-bold text-neutral-800 font-mono">
                      {selectedRequest.deadline}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Review Status
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-block ${getStatusBadgeClass(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>

                {/* PRIMARY FEATURE: Accredit & Endorse Action Panel */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                        Claim Verification &amp; Accreditation Audit
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-500 font-medium">Verified Claims:</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {accreditationTrustScore}% Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500">
                    Review student claims and uploaded evidence. Click <strong>Accredit &amp; Endorse Claim</strong> to verify submitted achievements for the student&apos;s documented record.
                  </p>

                  <div className="space-y-2 pt-1">
                    {/* Achievements verification list */}
                    {student.achievements.map((ach) => {
                      const isVerified = ach.verification?.status === 'verified-institution' || ach.verification?.status === 'verified-issuer';
                      return (
                        <div key={ach.id} className="p-3 rounded-lg bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-neutral-900">{ach.title}</span>
                              <span className="text-[10px] text-neutral-400">({ach.organization} · {ach.year})</span>
                            </div>
                            <div className="text-[11px] mt-1 flex flex-wrap items-center gap-2">
                              {ach.verification?.status === 'verified-institution' && (
                                <span className="text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  Verified by Staff (Simulated) · Ref: {ach.verification.verificationHash}
                                </span>
                              )}
                              {ach.verification?.status === 'pending-review' && (
                                <span className="text-amber-800 font-medium flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 text-[10px]">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  Self-Reported Claim · Awaiting Staff Review
                                </span>
                              )}
                              {ach.verification?.status === 'unverified' && (
                                <span className="text-neutral-600 font-medium flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 text-[10px]">
                                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                                  Unverified Claim (No Evidence Attached)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {ach.imageUrl && (
                              <button
                                type="button"
                                onClick={() => setLightbox({
                                  isOpen: true,
                                  imageUrl: ach.imageUrl || null,
                                  title: ach.title,
                                  subtitle: `${ach.organization} (${ach.year})`,
                                })}
                                className="text-xs text-neutral-600 hover:text-neutral-900 font-medium underline cursor-pointer"
                              >
                                View Proof
                              </button>
                            )}

                            {!isVerified && (
                              <button
                                type="button"
                                onClick={() => accreditClaim('achievements', ach.id, 'verified-institution', selectedRequest.staffName || 'Dr. Farai Muringani (Academic Staff)')}
                                className="self-start sm:self-auto inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors cursor-pointer shadow-2xs"
                                title="Officially verify and endorse this claim"
                              >
                                <Check className="w-3 h-3" />
                                <span>Accredit &amp; Endorse Claim</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Certifications verification list */}
                    {student.certifications.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-lg bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">{cert.title}</span>
                            <span className="text-[10px] text-neutral-400">({cert.issuer})</span>
                          </div>
                          <div className="text-[11px] mt-1">
                            <span className="text-blue-800 font-medium flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[10px]">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              Issuer Verified (Simulated) · ID: {cert.credentialId || 'AWS-AU-99214'}
                            </span>
                          </div>
                        </div>
                        {cert.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightbox({
                              isOpen: true,
                              imageUrl: cert.imageUrl || null,
                              title: cert.title,
                              subtitle: `${cert.issuer} · Verified Credential`,
                            })}
                            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium underline cursor-pointer"
                          >
                            Inspect Certificate
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* KEEP: Courses You Taught This Student panel and grades */}
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

                {/* Student Context Note */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-neutral-700">Student note</h4>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed italic">
                    &ldquo;{selectedRequest.shortNote}&rdquo;
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-500">Record Status:</span>
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateRequestStatus(selectedRequest.id, e.target.value as RequestStatus)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-neutral-300 bg-white text-neutral-800 focus:outline-hidden cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Verified / Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  {/* Secondary Action: Letter Generator */}
                  <div className="flex items-center gap-3">
                    {selectedRequest.status !== 'Completed' && (
                      <button
                        onClick={() => updateRequestStatus(selectedRequest.id, 'Completed')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Record Verified</span>
                      </button>
                    )}

                    {/* Secondary letter generator */}
                    <button
                      onClick={() => setIsGeneratorOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      title="Optional: Draft a formal recommendation letter from this record"
                    >
                      <FileEdit className="w-3.5 h-3.5 text-amber-300" />
                      <span>Draft Letter (Optional)</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-400">
                <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-neutral-700">No Student Selected</h3>
                <p className="text-xs text-neutral-500 mt-1">Select a student record from the left list to review.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Secondary Letter Generator Modal */}
      {selectedRequest && (
        <LetterGeneratorModal
          request={selectedRequest}
          isOpen={isGeneratorOpen}
          onClose={() => setIsGeneratorOpen(false)}
        />
      )}

      {/* Lightbox for inspecting Result Slip / Certificates */}
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
