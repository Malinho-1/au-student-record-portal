import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import type { RequestPurpose, AcademicStaff } from '../../types';
import { 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  X,
  GraduationCap
} from 'lucide-react';

export const RequestLetterPage: React.FC = () => {
  const { academicStaff, createRequest, setActiveStudentTab } = useApp();

  // Search and auto-email lookup state
  const [searchName, setSearchName] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<AcademicStaff | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [purpose, setPurpose] = useState<RequestPurpose>('Scholarship');
  const [deadline, setDeadline] = useState('20/11/2026'); // Standard DD/MM/YYYY
  const [shortNote, setShortNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to generate a realistic Africa University email from a name if not in seed list
  const resolveAuEmailFromName = (name: string): string => {
    const cleaned = name
      .replace(/^(dr\.|prof\.|professor|doctor|mr\.|mrs\.|ms\.)\s*/i, '')
      .trim()
      .toLowerCase();
    
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'staff@africau.edu';
    if (parts.length === 1) return `${parts[0]}@africau.edu`;
    
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];
    // AU email standard format: surname + first initial e.g. chitiyot@africau.edu or first.last@africau.edu
    return `${lastName}${firstName.charAt(0)}@africau.edu`;
  };

  // Search filter across academic staff directory
  const matchingStaff = useMemo(() => {
    const query = searchName.trim().toLowerCase();
    if (!query) return academicStaff;
    return academicStaff.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.department.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      (s.taughtCourses && s.taughtCourses.some(c => c.toLowerCase().includes(query)))
    );
  }, [searchName, academicStaff]);

  // Determine current active email and department
  const activeEmail = useMemo(() => {
    if (selectedStaff) return selectedStaff.email;
    if (searchName.trim().length >= 2) {
      return resolveAuEmailFromName(searchName);
    }
    return '';
  }, [selectedStaff, searchName]);

  const activeDepartment = useMemo(() => {
    if (selectedStaff) return selectedStaff.department;
    return 'Faculty of Engineering & Applied Sciences';
  }, [selectedStaff]);

  const handleSelectStaff = (staff: AcademicStaff) => {
    setSelectedStaff(staff);
    setSearchName(staff.name);
    setIsDropdownOpen(false);
  };

  const handleNameChange = (val: string) => {
    setSearchName(val);
    setSelectedStaff(null);
    setIsDropdownOpen(true);
  };

  const handleClearSelection = () => {
    setSearchName('');
    setSelectedStaff(null);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = searchName.trim();
    if (!finalName || !activeEmail || !deadline) return;

    createRequest({
      lecturerId: selectedStaff?.id,
      staffName: finalName,
      staffEmail: activeEmail,
      staffDepartment: activeDepartment,
      purpose,
      deadline,
      shortNote: shortNote.trim() || 'Please consider my academic performance and project contributions for this application.',
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 p-4 sm:p-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-lg text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Request Sent Successfully!</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Your recommendation request and verified record have been routed to{' '}
            <strong className="text-neutral-900">{searchName}</strong> at{' '}
            <span className="font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">
              {activeEmail}
            </span>.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setActiveStudentTab('record')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Return to My Record
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setShortNote('');
                setSearchName('');
                setSelectedStaff(null);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        
        {/* Left Column: Context & Automatic Attachment note */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[#A51C30] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              Optional Reference Service
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-3">
              Request a letter
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Type the name of any academic staff member or supervisor. The system automatically searches the Africa University staff directory to retrieve their official university email.
            </p>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Documented record attached automatically
                </h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Your GPA, courses taken, verified certificates, and projects are bundled directly with this request for staff inspection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-neutral-100">
              <div className="p-1 rounded-full bg-blue-100 text-blue-700 mt-0.5 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Automatic University Email Lookup
                </h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Search by academic staff name or surname. Official university inbox addresses (<span className="font-mono text-[11px] text-neutral-700">@africau.edu</span>) are linked automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-xl text-xs text-neutral-500">
            <strong>Demo data: verification is simulated.</strong> Standard AU Date format: DD/MM/YYYY.
          </div>
        </div>

        {/* Right Column: Request Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-8 shadow-xs">
            
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-[#A51C30] text-white flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Academic Staff Recipient</h3>
                <p className="text-xs text-neutral-500">Type staff name to search and look up university email.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. Academic Staff Name Search Input (Replaces dropdown) */}
              <div className="relative">
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Academic staff / Supervisor name
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type name (e.g. Dr. Farai Muringani, Prof. Tendai Chitiyo)"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
                  />
                  {searchName && (
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Directory Autocomplete Suggestions Dropdown */}
                {isDropdownOpen && matchingStaff.length > 0 && (
                  <div className="absolute z-30 mt-1.5 w-full bg-white border border-neutral-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-neutral-100 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 bg-neutral-50 text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Africa University Faculty Directory</span>
                      <span>{matchingStaff.length} match{matchingStaff.length === 1 ? '' : 'es'}</span>
                    </div>
                    {matchingStaff.map((staff) => (
                      <button
                        type="button"
                        key={staff.id}
                        onClick={() => handleSelectStaff(staff)}
                        className="w-full p-3 text-left hover:bg-neutral-50 transition-colors flex items-start justify-between gap-3 cursor-pointer group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-neutral-900 group-hover:text-[#A51C30] transition-colors">
                              {staff.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                              {staff.title}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                            <Building2 className="w-3 h-3 text-neutral-400 shrink-0" />
                            <span>{staff.department}</span>
                          </p>
                          {staff.taughtCourses && staff.taughtCourses.length > 0 && (
                            <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-neutral-400 shrink-0" />
                              <span>Teaches: {staff.taughtCourses.join(', ')}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <Mail className="w-3 h-3 text-emerald-600" />
                            {staff.email}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Automatic Email Lookup Result Card */}
              {activeEmail ? (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Official University Email Located</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      AU Verified
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-mono text-sm font-semibold text-emerald-950 select-all">
                        {activeEmail}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      {activeDepartment}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-neutral-50 border border-dashed border-neutral-300 text-xs text-neutral-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Start typing a name above to search or automatically look up their university email.</span>
                </div>
              )}

              {/* 2. Purpose Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Purpose / Opportunity
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

              {/* 3. Submission Deadline (DD/MM/YYYY) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Submission deadline (DD/MM/YYYY)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="DD/MM/YYYY (e.g. 20/11/2026)"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all"
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
                  placeholder="Explain the opportunity and what academic staff should highlight from your verified record."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-all leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!searchName.trim() || !activeEmail}
                className="w-full py-3 px-6 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
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
