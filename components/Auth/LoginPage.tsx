
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import PrivacyPanel from '../Shared/PrivacyPanel';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
}

type AuthMethod = 'email' | 'google' | 'facebook' | 'github' | 'demo';
type AuthView = 'selection' | 'login' | 'signup' | 'forgot' | 'reset' | 'social_confirm' | 'loading';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('selection');
  const [selectedProvider, setSelectedProvider] = useState<AuthMethod | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [showPassword, setShowPassword] = useState(false);
  const [socialUser, setSocialUser] = useState<{name: string, provider: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((view === 'signup' || view === 'reset') && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const isEmail = identifier.includes('@');
    onLogin({
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: view === 'login' ? (isEmail ? identifier.split('@')[0] : 'User') : fullName,
      emailOrMobile: identifier,
      role: role,
      method: isEmail ? 'email' : 'mobile',
      isVerified: true,
      isNewUser: view === 'signup'
    });
  };

  const handleSocialSelect = (method: 'google' | 'facebook' | 'github') => {
    setSelectedProvider(method);
    setView('loading');
    
    // Simulate social provider popup delay
    setTimeout(() => {
      setSocialUser({
        name: `${method.charAt(0).toUpperCase() + method.slice(1)} Explorer`,
        provider: method
      });
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
      method: socialUser.provider as any,
      isVerified: true
    });
  };

  const handleDemo = (role: UserRole) => {
    onLogin({
      id: 'demo_' + Math.random().toString(36).substr(2, 9),
      name: `Demo ${role}`,
      emailOrMobile: 'demo_user',
      role: role,
      method: 'demo',
      isVerified: true
    });
  };

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors p-1"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L14.5 14.5M21 21l-4.35-4.35m1.35-3.15A10.007 10.007 0 0012 5c-1.828 0-3.49.488-4.914 1.341m12.428 1.414l1.414 1.414" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full z-10 space-y-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-8 border border-slate-100">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-2">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Padhai Ka Safar</h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
              {view === 'selection' ? 'Select Login Method' : 'Identity Verification'}
            </p>
          </div>

          {/* VIEW: METHOD SELECTION */}
          {view === 'selection' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setView('login')}
                className="w-full flex items-center justify-between px-6 py-5 bg-indigo-50 text-indigo-700 rounded-3xl font-black hover:bg-indigo-100 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">✉️</div>
                  <span>Continue with Email</span>
                </div>
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-slate-400 font-black uppercase tracking-[0.2em]">Social Logins</span></div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleSocialSelect('google')}
                  className="w-full flex items-center gap-4 px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="" />
                  Continue with Google
                </button>
                <button 
                  onClick={() => handleSocialSelect('github')}
                  className="w-full flex items-center gap-4 px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5" alt="" />
                  Continue with GitHub
                </button>
                <button 
                  onClick={() => handleSocialSelect('facebook')}
                  className="w-full flex items-center gap-4 px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="" />
                  Continue with Facebook
                </button>
              </div>

              <div className="pt-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-3">Instant Demo Access</p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleDemo(UserRole.DIPLOMA)} className="text-[9px] font-black py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">DIPLOMA</button>
                  <button onClick={() => handleDemo(UserRole.UG)} className="text-[9px] font-black py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">UG</button>
                  <button onClick={() => handleDemo(UserRole.RURAL)} className="text-[9px] font-black py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">RURAL</button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                 <PrivacyPanel />
              </div>
            </div>
          )}

          {/* VIEW: LOADING */}
          {view === 'loading' && (
            <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-8 h-8 bg-indigo-50 rounded-full"></div>
                </div>
              </div>
              <p className="text-sm font-black text-slate-900 animate-pulse uppercase tracking-widest">Verifying Identity...</p>
            </div>
          )}

          {/* VIEW: SOCIAL CONFIRMATION */}
          {view === 'social_confirm' && socialUser && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
                    <span className="text-4xl">{socialUser.provider === 'google' ? '🌐' : socialUser.provider === 'github' ? '🐙' : '👥'}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Success!</h3>
                    <p className="text-sm text-slate-500">Found account linked to <strong>{socialUser.name}</strong></p>
                  </div>
               </div>
               
               <div className="space-y-3">
                  <button 
                    onClick={finalizeSocialLogin}
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
                  >
                    Continue to Dashboard
                  </button>
                  <button 
                    onClick={() => setView('selection')}
                    className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                  >
                    Cancel & Change Method
                  </button>
               </div>
            </div>
          )}

          {/* VIEW: EMAIL LOGIN / SIGNUP */}
          {(view === 'login' || view === 'signup') && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button 
                  onClick={() => setView('login')}
                  className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all ${view === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  SIGN IN
                </button>
                <button 
                  onClick={() => setView('signup')}
                  className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all ${view === 'signup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  REGISTER
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter official name"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email or Mobile</label>
                  <input
                    type="text"
                    required
                    placeholder="mail@student.edu"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full px-5 py-4 pr-14 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordToggle />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
                >
                  {view === 'login' ? 'Authorize Session' : 'Create Student Profile'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setView('selection')}
                  className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  ← Back to Methods
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="text-center space-y-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
            Your data remains safe and private. We do not share your information.<br/>
            Official Educational Gateway • 256-Bit SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
