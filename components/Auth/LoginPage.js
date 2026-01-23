
import React, { useState } from 'react';
import PrivacyPanel from '../Shared/PrivacyPanel.js';
import { UserRole } from '../../types.js';

const LoginPage = ({ onLogin }) => {
  const [view, setView] = useState('selection'); // selection, login, signup, forgot, reset, loading, social_confirm
  const [identifier, setIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [socialUser, setSocialUser] = useState(null);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (view === 'signup' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (view === 'reset' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (view === 'reset') {
      alert("Password reset successful! Please log in with your new credentials.");
      setView('login');
      return;
    }

    if (password.length < 6 && (view === 'login' || view === 'signup')) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (view === 'forgot') {
      setView('loading');
      setTimeout(() => {
        setResetSent(true);
        setView('forgot');
      }, 1500);
      return;
    }

    const isEmail = identifier.includes('@');
    onLogin({
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: view === 'login' ? (isEmail ? identifier.split('@')[0] : 'User') : fullName,
      emailOrMobile: identifier,
      role: UserRole.GUEST,
      method: isEmail ? 'email' : 'mobile',
      isVerified: true,
      isNewUser: view === 'signup'
    });
  };

  const handleSocialSelect = (method) => {
    setView('loading');
    setTimeout(() => {
      setSocialUser({ name: `${method.charAt(0).toUpperCase() + method.slice(1)} Explorer`, provider: method });
      setView('social_confirm');
    }, 1200);
  };

  const finalizeSocialLogin = () => {
    if (!socialUser) return;
    onLogin({
      id: `${socialUser.provider}_` + Math.random().toString(36).substr(2, 9),
      name: socialUser.name,
      emailOrMobile: 'social_auth_active',
      role: UserRole.GUEST,
      method: socialUser.provider,
      isVerified: true
    });
  };

  const handleDemo = (role) => {
    onLogin({
      id: 'demo_' + Math.random().toString(36).substr(2, 9),
      name: `Demo ${role}`,
      emailOrMobile: 'demo_user',
      role: role,
      method: 'demo',
      isVerified: true
    });
  };

  if (view === 'loading') {
    return React.createElement('div', { className: "min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4" },
      React.createElement('div', { className: "w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" }),
      React.createElement('p', { className: "mt-6 text-sm font-black text-white uppercase tracking-widest" }, "Verifying Identity...")
    );
  }

  return React.createElement('div', { className: "min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4" },
    React.createElement('div', { className: "max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-8" },
      React.createElement('div', { className: "text-center space-y-3" },
        React.createElement('h1', { className: "text-3xl font-black text-slate-900" }, "Padhai Ka Safar"),
        React.createElement('p', { className: "text-slate-500 font-bold text-sm uppercase tracking-widest" }, 
          view === 'forgot' ? (resetSent ? "Step 2: Check Email" : "Step 1: Recovery") : 
          view === 'reset' ? "Step 2: Update Credentials" : 
          "Identity Verification"
        )
      ),

      view === 'selection' ? React.createElement('div', { className: "space-y-4" },
        React.createElement('button', { onClick: () => setView('login'), className: "w-full py-5 bg-indigo-50 text-indigo-700 rounded-3xl font-black hover:bg-indigo-100 transition-all" }, "Continue with Email/Mobile"),
        React.createElement('div', { className: "grid grid-cols-1 gap-3" },
          ['google', 'github', 'facebook'].map(m => React.createElement('button', { key: m, onClick: () => handleSocialSelect(m), className: "w-full py-4 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all" }, 
            React.createElement('span', null, m.charAt(0).toUpperCase() + m.slice(1)),
            React.createElement('span', { className: "text-xs opacity-40 font-black" }, "LOGIN")
          ))
        ),
        React.createElement('div', { className: "pt-6" },
          React.createElement('p', { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-3" }, "Demo Access"),
          React.createElement('div', { className: "grid grid-cols-3 gap-2" },
            [UserRole.DIPLOMA, UserRole.UG, UserRole.RURAL].map(r => React.createElement('button', { key: r, onClick: () => handleDemo(r), className: "text-[9px] font-black py-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all" }, r.split(' ')[0]))
          )
        ),
        React.createElement(PrivacyPanel, null)
      ) : view === 'social_confirm' ? React.createElement('div', { className: "text-center space-y-6" },
        React.createElement('div', { className: "w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto" }, React.createElement('span', { className: "text-3xl" }, "👋")),
        React.createElement('p', { className: "text-slate-600 font-medium" }, React.createElement('span', null, "Account linked to "), React.createElement('strong', null, socialUser?.name)),
        React.createElement('button', { onClick: finalizeSocialLogin, className: "w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100" }, "Continue to Dashboard")
      ) : view === 'forgot' ? React.createElement('div', { className: "space-y-6" },
        resetSent ? React.createElement('div', { className: "text-center space-y-6" },
          React.createElement('div', { className: "w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto" }, 
            React.createElement('svg', { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, 
              React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })
            )
          ),
          React.createElement('p', { className: "text-slate-600 font-bold" }, "Reset link sent to your inbox!"),
          React.createElement('div', { className: "space-y-3" },
            React.createElement('button', { onClick: () => setView('reset'), className: "w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest" }, "Simulate Opening Link"),
            React.createElement('button', { onClick: () => { setResetSent(false); setView('login'); }, className: "w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest" }, "← Back to Login")
          )
        ) : React.createElement('form', { onSubmit: handleSubmit, className: "space-y-4" },
          React.createElement('p', { className: "text-sm text-slate-500 font-medium text-center px-4" }, "Enter your email/mobile and we'll send a link to reset your password."),
          React.createElement('input', { required: true, placeholder: "Email or Mobile", className: "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold", value: identifier, onChange: e => setIdentifier(e.target.value) }),
          React.createElement('button', { type: "submit", className: "w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-slate-200 uppercase tracking-widest text-xs" }, "Send Reset Link"),
          React.createElement('button', { type: "button", onClick: () => setView('login'), className: "w-full py-3 text-xs font-black text-slate-400 uppercase tracking-widest" }, "← Back to Login")
        )
      ) : React.createElement('form', { onSubmit: handleSubmit, className: "space-y-4" },
        (view === 'login' || view === 'signup') && React.createElement('div', { className: "flex bg-slate-100 p-1 rounded-2xl mb-4" },
          React.createElement('button', { type: "button", onClick: () => setView('login'), className: `flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${view === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}` }, "SIGN IN"),
          React.createElement('button', { type: "button", onClick: () => setView('signup'), className: `flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${view === 'signup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}` }, "REGISTER")
        ),
        view === 'signup' && React.createElement('input', { required: true, placeholder: "Full Name", className: "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold", value: fullName, onChange: e => setFullName(e.target.value) }),
        view !== 'reset' && React.createElement('input', { required: true, placeholder: "Email or Mobile", className: "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold", value: identifier, onChange: e => setIdentifier(e.target.value) }),
        React.createElement('div', { className: "relative" },
          React.createElement('input', { required: true, type: showPassword ? "text" : "password", placeholder: view === 'reset' ? "New Password" : "Password", className: "w-full p-4 pr-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold", value: password, onChange: e => setPassword(e.target.value) }),
          React.createElement('button', { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px] uppercase" }, showPassword ? "Hide" : "Show")
        ),
        (view === 'signup' || view === 'reset') && React.createElement('input', { required: true, type: "password", placeholder: "Confirm Password", className: "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value) }),
        view === 'login' && React.createElement('button', { type: "button", onClick: () => setView('forgot'), className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest block w-fit ml-auto" }, "Forgot Password?"),
        React.createElement('button', { type: "submit", className: "w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs mt-4" }, 
          view === 'login' ? "Authorize Session" : view === 'signup' ? "Create Profile" : "Update Password"
        ),
        React.createElement('button', { type: "button", onClick: () => { setView('selection'); setIdentifier(''); setPassword(''); }, className: "w-full text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2" }, "← Switch Login Method")
      )
    ),
    React.createElement('p', { className: "mt-8 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] text-center leading-relaxed" }, 
      "Official Educational Gateway • Secure Access"
    )
  );
};

export default LoginPage;
