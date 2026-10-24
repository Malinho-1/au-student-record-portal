import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthPage } from './components/AuthPage';
import { StudentPortal } from './components/student/StudentPortal';
import { LecturerPortal } from './components/lecturer/LecturerPortal';
import { HelpModal } from './components/common/HelpModal';

const MainApp: React.FC = () => {
  const { role } = useApp();

  if (!role) {
    return (
      <>
        <AuthPage />
        <HelpModal />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F5] text-neutral-900 font-sans antialiased selection:bg-[#A51C30]/20 selection:text-[#A51C30]">
      <Navbar />
      {role === 'student' ? <StudentPortal /> : <LecturerPortal />}
      <HelpModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
