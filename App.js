
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/Auth/LoginPage.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import SessionGuard from './components/Auth/SessionGuard.js';
import Modal from './components/Shared/Modal.js';
import ProfileSetup from './components/Auth/ProfileSetup.js';
import { generateGoalsAndActions } from './utils/ruleEngine.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      const savedGoals = localStorage.getItem(`goals_${user.id}`);
      
      if (savedProfile) setStudentProfile(JSON.parse(savedProfile));
      if (savedGoals) setGoals(JSON.parse(savedGoals));
    }
  }, [user]);

  const handleLogin = (profile) => {
    setUser(profile);
  };

  const handleProfileComplete = (profile) => {
    setStudentProfile(profile);
    const generatedGoals = generateGoalsAndActions(profile);
    setGoals(generatedGoals);
    
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(generatedGoals));
    }
  };

  const handleUpdateGoals = (updatedGoals) => {
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

  const pendingCount = goals.reduce((acc, g) => acc + g.actions.filter(a => a.status === 'Pending').length, 0);

  return React.createElement('div', { className: "min-h-screen bg-[#f8faff]" },
    !user ? 
      React.createElement(LoginPage, { onLogin: handleLogin }) : 
      !studentProfile ? 
        React.createElement(ProfileSetup, { onComplete: handleProfileComplete }) : 
        React.createElement(SessionGuard, { onLogout: handleLogout },
          React.createElement(Dashboard, { 
            user, 
            profile: studentProfile,
            goals,
            onUpdateGoals: handleUpdateGoals,
            onLogoutRequest: () => setIsLogoutModalOpen(true) 
          })
        ),
    isLogoutModalOpen && React.createElement(Modal, {
      title: "Log Out Confirmation",
      description: "Are you sure you want to log out?",
      reminder: pendingCount > 0 ? "You still have pending actions in your journey." : "Any unsaved actions will be lost.",
      confirmLabel: "Logout Now",
      cancelLabel: "Stay Logged In",
      onConfirm: handleLogout,
      onCancel: () => setIsLogoutModalOpen(false),
      type: "danger"
    })
  );
};

export default App;
