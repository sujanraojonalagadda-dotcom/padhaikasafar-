import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const RECOMMENDED_CHANNELS = [
  { 
    name: 'CareerRide', 
    description: 'Expert guidance on Quantitative Aptitude, Logical Reasoning, and HR Interview preparation for major MNCs like TCS, Infosys, and Wipro.', 
    url: 'https://www.youtube.com/@CareerRide',
    icon: '📺' 
  },
  { 
    name: 'Feel Free to Learn', 
    description: 'Specialized in shortcut tricks and simplified methods for complex Quantitative topics like Time & Work and Speed-Distance.', 
    url: 'https://www.youtube.com/@FeelFreeToLearn',
    icon: '💡' 
  },
  { 
    name: 'Gate Smashers', 
    description: 'The go-to resource for core Computer Science subjects (OS, DBMS, CN) and technical placement preparation.', 
    url: 'https://www.youtube.com/@GateSmashers',
    icon: '🚀' 
  },
  { 
    name: 'TalentSprint', 
    description: 'Focuses on structured placement training, focusing on both aptitude fundamentals and advanced coding paradigms.', 
    url: 'https://www.youtube.com/@TalentSprintCareerExpress',
    icon: '🎓' 
  },
  {
    name: 'Unacademy Aptitude',
    description: 'Comprehensive playlists for competitive exams and campus placements covering every corner of engineering math.',
    url: 'https://www.youtube.com/@UnacademyAptitude',
    icon: '📈'
  }
];

const STATIC_APTITUDE_SET = [
  {
    question: "A can complete a work in 10 days and B can complete the same work in 15 days. If they work together, in how many days will the work be completed?",
    options: ["5 days", "6 days", "8 days", "7 days"],
    correctIndex: 1
  },
  {
    question: "A train 150 meters long takes 15 seconds to cross a telegraph post. What is the speed of the train in km/hr?",
    options: ["36 km/hr", "45 km/hr", "54 km/hr", "60 km/hr"],
    correctIndex: 0
  },
  {
    question: "A man covers a certain distance at 40 km/hr and returns back at 60 km/hr. What is his average speed for the entire journey?",
    options: ["48 km/hr", "50 km/hr", "52 km/hr", "45 km/hr"],
    correctIndex: 0
  }
];

const AIPreparationHub = () => {
  const [activeTab, setActiveTab] = useState('interview');
  const [topic, setTopic] = useState('General Engineering');
  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [revealedAnswers, setRevealedAnswers] = useState([]); 
  const [userSelections, setUserSelections] = useState(new Array(5).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateInterview = async () => {
    setLoading(true);
    setRevealedAnswers([]);
    setInterviewQuestions([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 expert-level interview questions and answers for a student preparing for a role in: ${topic}. Focus on technical and behavioral aspects.`,
        config: {
          responseMimeType: "application/json"
        }
      });
      // Simple parsing as we can't use complex schema in this wrapper
      const text = response.text || "[]";
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']') + 1;
      const data = JSON.parse(text.substring(start, end));
      setInterviewQuestions(data);
    } catch (e) {
      console.error(e);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadStaticAptitude = () => {
    setAptitudeQuestions(STATIC_APTITUDE_SET);
    setUserSelections(new Array(STATIC_APTITUDE_SET.length).fill(-1));
    setIsSubmitted(false);
  };

  return React.createElement('div', { className: "space-y-12" },
    React.createElement('div', { className: "bg-white border-t-8 border-rose-500 rounded-[2.5rem] p-8 shadow-2xl relative" },
      React.createElement('div', { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement('span', { className: "px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded uppercase tracking-widest" }, "AI HUB"),
            React.createElement('span', { className: "px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded uppercase tracking-widest" }, "PLACEMENT READY")
          ),
          React.createElement('h3', { className: "text-3xl font-black text-slate-900 leading-none" }, "Preparation Center"),
          React.createElement('p', { className: "text-sm font-medium text-slate-400" }, "Master your upcoming interviews and aptitude rounds.")
        ),
        React.createElement('div', { className: "flex flex-wrap bg-slate-100 p-1 rounded-2xl gap-1" },
          ['interview', 'aptitude'].map(tab => React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            className: `px-4 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-tight ${
              activeTab === tab ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`
          }, tab === 'interview' ? 'Mock Interview' : 'Aptitude Test'))
        )
      ),

      activeTab === 'interview' && React.createElement('div', { className: "space-y-6" },
        React.createElement('div', { className: "flex flex-col sm:flex-row gap-3" },
          React.createElement('input', { 
            type: "text", 
            placeholder: "Target Role (e.g. Java Developer)", 
            className: "flex-1 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold",
            value: topic,
            onChange: e => setTopic(e.target.value)
          }),
          React.createElement('button', { 
            onClick: generateInterview, 
            disabled: loading, 
            className: "px-8 py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all" 
          }, loading ? 'Generating...' : 'Start Session')
        ),
        React.createElement('div', { className: "space-y-4" },
          interviewQuestions.map((q, i) => React.createElement('div', { key: i, className: "p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3" },
            React.createElement('p', { className: "font-black text-slate-800" }, `Q${i+1}: ${q.question}`),
            revealedAnswers.includes(i) ? 
              React.createElement('p', { className: "text-sm text-slate-600 border-t border-rose-100 pt-3" }, q.answer) : 
              React.createElement('button', { onClick: () => setRevealedAnswers([...revealedAnswers, i]), className: "text-[10px] font-black text-rose-600 uppercase tracking-widest" }, "Show Answer")
          ))
        )
      ),

      activeTab === 'aptitude' && React.createElement('div', { className: "space-y-6" },
        aptitudeQuestions.length === 0 ? 
          React.createElement('button', { onClick: loadStaticAptitude, className: "w-full py-10 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-black" }, "Click to Load Practice Questions") : 
          React.createElement('div', { className: "space-y-6" },
            aptitudeQuestions.map((q, i) => React.createElement('div', { key: i, className: "space-y-4" },
              React.createElement('p', { className: "font-bold text-slate-800" }, q.question),
              React.createElement('div', { className: "grid grid-cols-2 gap-3" },
                q.options.map((opt, oi) => React.createElement('button', {
                  key: oi,
                  onClick: () => {
                    const next = [...userSelections];
                    next[i] = oi;
                    setUserSelections(next);
                  },
                  className: `p-3 text-xs font-bold rounded-xl border text-left ${userSelections[i] === oi ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white'}`
                }, opt))
              )
            ))
          )
      )
    ),

    React.createElement('div', { className: "bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8" },
      React.createElement('div', { className: "flex items-center gap-3 mb-8" },
        React.createElement('h4', { className: "text-xl font-black text-slate-900" }, "Expert Learning Vault"),
        React.createElement('p', { className: "text-sm text-slate-500 font-medium" }, "Top-rated YouTube channels for mastering placements.")
      ),
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
        RECOMMENDED_CHANNELS.map(c => React.createElement('a', { 
          key: c.name, 
          href: c.url, 
          target: "_blank", 
          rel: "noopener noreferrer",
          className: "bg-white p-6 rounded-3xl border border-slate-100 hover:border-indigo-500 transition-all group flex flex-col" 
        },
          React.createElement('div', { className: "text-3xl mb-4" }, c.icon),
          React.createElement('h5', { className: "font-black text-slate-900 mb-2 group-hover:text-indigo-600" }, c.name),
          React.createElement('p', { className: "text-xs text-slate-500 font-medium mb-6 flex-1" }, c.description),
          React.createElement('div', { className: "flex items-center justify-between pt-4 border-t border-slate-50" },
            React.createElement('span', { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest" }, "Visit Channel"),
            React.createElement('span', { className: "text-slate-300" }, "→")
          )
        ))
      )
    )
  );
};

export default AIPreparationHub;
