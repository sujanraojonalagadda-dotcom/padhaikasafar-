
import React, { useState } from 'react';

const ProfileSetup = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    educationLevel: 'UG',
    currentYear: '1',
    stream: '',
    state: '',
    interest: 'IT',
    gender: 'Male',
    familyIncome: '1.5L'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.stream || !formData.state) {
      alert("Please fill in all fields.");
      return;
    }
    onComplete(formData);
  };

  return React.createElement('div', { className: "min-h-screen bg-slate-900 flex items-center justify-center p-4" },
    React.createElement('div', { className: "max-w-xl w-full bg-white rounded-[2.5rem] p-8 md:p-12 space-y-8" },
      React.createElement('div', { className: "text-center space-y-2" },
        React.createElement('h2', { className: "text-3xl font-black" }, "Set Your Destination"),
        React.createElement('p', { className: "text-slate-500" }, "Help us personalize your journey.")
      ),
      React.createElement('form', { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
        React.createElement('input', { placeholder: "Stream (e.g. CS, Arts)", className: "w-full p-4 bg-slate-50 rounded-xl", value: formData.stream, onChange: e => setFormData({...formData, stream: e.target.value}) }),
        React.createElement('input', { placeholder: "State", className: "w-full p-4 bg-slate-50 rounded-xl", value: formData.state, onChange: e => setFormData({...formData, state: e.target.value}) }),
        React.createElement('select', { className: "w-full p-4 bg-slate-50 rounded-xl", value: formData.educationLevel, onChange: e => setFormData({...formData, educationLevel: e.target.value}) },
          React.createElement('option', { value: "Diploma" }, "Diploma"),
          React.createElement('option', { value: "UG" }, "Undergraduate"),
          React.createElement('option', { value: "PG" }, "Postgraduate")
        ),
        React.createElement('button', { type: "submit", className: "md:col-span-2 w-full bg-slate-900 text-white font-black py-5 rounded-[2rem]" }, "Generate My Roadmap")
      )
    )
  );
};

export default ProfileSetup;
