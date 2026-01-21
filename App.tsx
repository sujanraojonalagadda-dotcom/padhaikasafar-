
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, StudentProfile, Goal } from './types';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import SessionGuard from './components/Auth/SessionGuard';
import Modal from './components/Shared/Modal';
import ProfileSetup from './components/Auth/ProfileSetup';
import { generateGoalsAndActions } from './utils/ruleEngine';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Persistence Logic
  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      const savedGoals = localStorage.getItem(`goals_${user.id}`);
      
      if (savedProfile) setStudentProfile(JSON.parse(savedProfile));
      if (savedGoals) setGoals(JSON.parse(savedGoals));
    }
  }, [user]);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    const generatedGoals = generateGoalsAndActions(profile);
    setGoals(generatedGoals);
    
    // Save to local storage
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(generatedGoals));
    }
  };

  const handleUpdateGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    if (user) {
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
    }
  };

  const handleLogout = useCallback(() => {
    setUser(null);
    setStudentProfile(null);
    setGoals([]);
    setIsLogoutModalOpen(false);
  }, []);

  const confirmLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const pendingCount = goals.reduce((acc, g) => acc + g.actions.filter(a => a.status === 'Pending').length, 0);

  return (
    <div className="min-h-screen bg-[#f8faff]">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : !studentProfile ? (
        <ProfileSetup onComplete={handleProfileComplete} />
      ) : (
        <SessionGuard onLogout={handleLogout}>
          <Dashboard 
            user={user} 
            profile={studentProfile}
            goals={goals}
            onUpdateGoals={handleUpdateGoals}
            onLogoutRequest={confirmLogout} 
          />
        </SessionGuard>
      )}

      {isLogoutModalOpen && (
        <Modal
          title="Log Out Confirmation"
          description="Are you sure you want to log out?"
          reminder={pendingCount > 0 ? "You still have pending actions in your journey." : "Any unsaved actions will be lost."}
          confirmLabel="Logout Now"
          cancelLabel="Stay Logged In"
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
          type="danger"
        />
      )}
    </div>
  );
};

export default App;
