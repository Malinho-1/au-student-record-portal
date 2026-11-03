import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AfricaUniversityLogo } from './AfricaUniversityLogo';
import { 
  RotateCcw, 
  HelpCircle, 
  Menu, 
  X, 
  FileText, 
  Send, 
  ShieldCheck, 
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeStudentTab, 
    setActiveStudentTab,
    resetDemoData,
    setIsHelpOpen 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left: Brand Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <button 
              onClick={() => {
                if (role === 'student') setActiveStudentTab('record');
                setIsMobileMenuOpen(false);
              }}
              className="focus:outline-hidden cursor-pointer shrink-0"
              title="Africa University Portal Home"
            >
              <AfricaUniversityLogo className="h-8 sm:h-10" />
            </button>

            {/* Desktop Nav links (hidden on mobile) */}
            {role === 'student' && (
              <nav className="hidden md:flex space-x-8">
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

                {/* Secondary optional action */}
                <button
                  onClick={() => setActiveStudentTab('request')}
                  className={`relative py-5 text-sm font-semibold transition-colors cursor-pointer ${
                    activeStudentTab === 'request'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Request a letter (Optional)
                  {activeStudentTab === 'request' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A51C30]" />
                  )}
                </button>
              </nav>
            )}

            {role === 'academic-staff' && (
              <nav className="hidden md:flex space-x-8">
                <div className="relative py-5 text-sm font-semibold text-neutral-900">
                  Verification desk
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A51C30]" />
                </div>
              </nav>
            )}
          </div>

          {/* Right: Actions, Badges & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Demo Simulation Notice Pill (Desktop) */}
            <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-neutral-500 bg-neutral-100 border border-neutral-200">
              Demo data: verification is simulated
            </span>

            {/* Quick Demo Reset (Desktop) */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default state?')) {
                  resetDemoData();
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
              title="Reset prototype data to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* Role Badge (Desktop + Tablet) */}
            <span className="hidden xs:inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-700 border border-neutral-200 shrink-0">
              {role === 'student' ? 'Student' : 'Academic Staff'}
            </span>

            {/* Help / Guide button (Desktop) */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="hidden sm:flex text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              title="View system guide & evaluation notes"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Sign Out (Desktop) */}
            <button
              onClick={() => setRole(null)}
              className="hidden md:inline-block text-sm font-medium text-[#A51C30] hover:text-[#83161F] transition-colors cursor-pointer"
            >
              Sign out
            </button>

            {/* Mobile Hamburger Toggle Bar Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#A51C30]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Current Role Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Active Portal
              </span>
              <span className="text-sm font-bold text-neutral-900">
                {role === 'student' ? 'Student Academic Record' : 'Academic Staff Verification Desk'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#A51C30]/10 text-[#A51C30]">
              {role === 'student' ? 'Student' : 'Staff'}
            </span>
          </div>

          {/* Navigation Items */}
          {role === 'student' && (
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveStudentTab('record');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activeStudentTab === 'record'
                    ? 'bg-[#A51C30] text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>My Record</span>
                </div>
                {activeStudentTab === 'record' && (
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">Active</span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveStudentTab('request');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activeStudentTab === 'request'
                    ? 'bg-[#A51C30] text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4" />
                  <span>Request a letter (Optional)</span>
                </div>
                {activeStudentTab === 'request' && (
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">Active</span>
                )}
              </button>
            </div>
          )}

          {role === 'academic-staff' && (
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center gap-2.5 text-sm font-semibold text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-[#A51C30]" />
              <span>Verification Desk Active</span>
            </div>
          )}

          {/* Mobile Utility Actions */}
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsHelpOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-neutral-400" />
              <span>System Guide & Notes</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default state?')) {
                  resetDemoData();
                  setIsMobileMenuOpen(false);
                }
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-neutral-400" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={() => {
                setRole(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-[#A51C30] hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out / Switch Role</span>
            </button>
          </div>

          {/* Simulated Disclaimer */}
          <div className="pt-2 text-[10px] text-neutral-400 text-center">
            Demo data: verification is simulated · Format: DD/MM/YYYY
          </div>

        </div>
      )}
    </header>
  );
};
