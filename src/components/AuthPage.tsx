import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AfricaUniversityLogo } from './AfricaUniversityLogo';
import type { UserRole } from '../types';
import { GraduationCap, Users, Check, Lock, ArrowRight, HelpCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setRole, setIsHelpOpen } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('student.demo@university.edu');
  const [password, setPassword] = useState('••••••••');

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    if (newRole === 'student') {
      setEmail('student.demo@university.edu');
    } else {
      setEmail('lecturer.demo@university.edu');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF9F6] relative">
      
      {/* Left Panel: Dark Editorial Brand Section */}
      <div className="lg:w-1/2 bg-[#121214] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle decorative radial glow / contour circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#A51C30]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] border border-neutral-800/80 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-[380px] h-[380px] border border-neutral-800/50 rounded-full pointer-events-none" />

        {/* Top Brand Logo */}
        <div className="relative z-10">
          <div className="inline-block bg-white p-2.5 rounded shadow-md">
            <AfricaUniversityLogo className="h-10" />
          </div>
        </div>

        {/* Hero Narrative */}
        <div className="my-auto py-12 lg:py-0 relative z-10 max-w-lg">
          <div className="text-[#E53E3E] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Student Record &amp; Recommendation Portal
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-8 font-sans">
            Records ready.<br />
            Recommendations<br />
            made easier.
          </h1>

          <p className="text-neutral-400 text-lg sm:text-xl font-normal leading-relaxed">
            Keep a clear academic record so recommendation letters can be written quickly and accurately.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-8 text-neutral-500 text-xs tracking-wide">
          Africa University · Academic records portal
        </div>
      </div>

      {/* Right Panel: Clean Sign-in Form */}
      <div className="lg:w-1/2 p-8 sm:p-14 lg:p-20 flex flex-col justify-center items-center relative">
        <div className="w-full max-w-md">
          
          {/* Section Header */}
          <div className="mb-8">
            <span className="text-[#A51C30] text-xs font-bold tracking-[0.18em] uppercase block mb-2">
              Secure Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
              Sign in
            </h2>
            <p className="text-neutral-600 text-sm">
              Choose your portal and use your university account.
            </p>
          </div>

          {/* Role Switcher Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Student Card */}
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'student'
                  ? 'border-2 border-[#A51C30] bg-white shadow-xs'
                  : 'border border-neutral-300 bg-white hover:border-neutral-400 opacity-80'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className={`w-5 h-5 ${selectedRole === 'student' ? 'text-[#A51C30]' : 'text-neutral-600'}`} />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900">Student</div>
                <div className="text-xs text-neutral-500 mt-0.5">Manage my record</div>
              </div>
            </button>

            {/* Lecturer Card */}
            <button
              type="button"
              onClick={() => handleRoleChange('lecturer')}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'lecturer'
                  ? 'border-2 border-[#A51C30] bg-white shadow-xs'
                  : 'border border-neutral-300 bg-white hover:border-neutral-400 opacity-80'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className={`w-5 h-5 ${selectedRole === 'lecturer' ? 'text-[#A51C30]' : 'text-neutral-600'}`} />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900">Lecturer</div>
                <div className="text-xs text-neutral-500 mt-0.5">Review requests</div>
              </div>
            </button>
          </div>

          {/* Demo Callout Alert */}
          <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
            <div className="p-0.5 bg-emerald-600 text-white rounded-full mt-0.5 shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-900">Demo access ready</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Placeholder credentials are filled in automatically.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                University email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-shadow"
                placeholder="user@university.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#A51C30] focus:border-transparent transition-shadow"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-lg bg-[#A51C30] hover:bg-[#8B1727] text-white text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue as {selectedRole === 'student' ? 'Student' : 'Lecturer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Prototype disclaimer */}
          <div className="mt-8 pt-4 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Placeholder sign-in for the front-end prototype.</span>
          </div>

        </div>

        {/* Floating help / info button (bottom-right) */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="fixed bottom-6 right-6 w-11 h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer z-30"
          title="Project Information & Team Evaluation Guide"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

      </div>

    </div>
  );
};
