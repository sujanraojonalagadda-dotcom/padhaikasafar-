
import React, { useState } from 'react';
import { StudentProfile } from '../../types';

interface ProfileSetupProps {
  onComplete: (profile: StudentProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<StudentProfile>({
    educationLevel: 'UG',
    currentYear: '1',
    stream: '',
    state: '',
    interest: 'IT',
    gender: 'Male',
    familyIncome: '1.5L'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.stream || !formData.state) {
      alert("Please fill in all fields.");
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="max-w-xl w-full z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 space-y-10 border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 mb-2">
               <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Set Your Destination</h2>
            <p className="text-slate-500 font-medium">Personalizing your Padhai Ka Safar based on your academic stage.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Education Level</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.educationLevel}
                onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}
              >
                <option value="Diploma">Diploma</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Year</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.currentYear}
                onChange={(e) => setFormData({...formData, currentYear: e.target.value})}
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year (Final)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Annual Family Income</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.familyIncome}
                onChange={(e) => setFormData({...formData, familyIncome: e.target.value})}
              >
                <option value="0.8L">Less than 1L</option>
                <option value="1.5L">1L - 2.5L</option>
                <option value="3.5L">2.5L - 5L</option>
                <option value="8L">More than 5L</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch / Stream</label>
              <input
                type="text"
                placeholder="e.g. Computer Engineering, Mechanical, Arts"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                value={formData.stream}
                onChange={(e) => setFormData({...formData, stream: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
              <input
                type="text"
                placeholder="e.g. Maharashtra, Delhi"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Interest</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
              >
                <option value="IT">IT & Software</option>
                <option value="Core">Core Engineering</option>
                <option value="Govt Exams">Government Exams</option>
                <option value="Business">Entrepreneurship</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
              >
                Generate My Roadmap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
