import React from 'react';
import { useApp } from '../context/AppContext';
import { AfricaUniversityLogo } from './AfricaUniversityLogo';
import { RotateCcw, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeStudentTab, 
    setActiveStudentTab,
    resetDemoData,
    setIsHelpOpen 
  } = useApp();

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Brand Logo & Navigation Links */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => {
                if (role === 'student') setActiveStudentTab('record');
              }}
              className="focus:outline-hidden cursor-pointer"
              title="Africa University Portal Home"
            >
              <AfricaUniversityLogo className="h-10" />
            </button>

            {/* Nav links based on current logged in role */}
            {role === 'student' && (
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveStudentTab('record')}
                  className={`relative py-5 text-sm font-semibold transition-colors cursor-pointer ${
                    activeStudentTab === 'record'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  My record
                  {activeStudentTab === 'record' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A51C30]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveStudentTab('request')}
                  className={`relative py-5 text-sm font-semibold transition-colors cursor-pointer ${
                    activeStudentTab === 'request'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Request a letter
                  {activeStudentTab === 'request' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A51C30]" />
                  )}
                </button>
              </nav>
            )}

            {role === 'lecturer' && (
              <nav className="flex space-x-8">
                <div className="relative py-5 text-sm font-semibold text-neutral-900">
                  Recommendation desk
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A51C30]" />
                </div>
              </nav>
            )}
          </div>

          {/* Right: Role indicator badge, Quick Actions & Sign out */}
          <div className="flex items-center gap-4">
            {/* Quick Demo Reset */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default Figma prototype state?')) {
                  resetDemoData();
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
              title="Reset prototype data to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo
            </button>

            {/* Role Badge */}
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
              {role === 'student' ? 'Student Portal' : 'Lecturer Portal'}
            </span>

            {/* Help / Guide button */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              title="View system guide & evaluation notes"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Sign Out */}
            <button
              onClick={() => setRole(null)}
              className="text-sm font-medium text-[#A51C30] hover:text-[#83161F] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
