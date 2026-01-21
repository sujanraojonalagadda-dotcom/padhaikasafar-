
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { InterviewQuestion, AptitudeQuestion } from '../../types';

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

const STATIC_APTITUDE_SET: AptitudeQuestion[] = [
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
  },
  {
    question: "12 men can complete a piece of work in 8 days. In how many days can 16 men complete the same work?",
    options: ["4 days", "5 days", "6 days", "7 days"],
    correctIndex: 2
  },
  {
    question: "Two trains 140 m and 160 m long are running at speeds of 60 km/hr and 40 km/hr respectively in opposite directions on parallel tracks. How long will they take to cross each other?",
    options: ["10.8 seconds", "12 seconds", "15 seconds", "9 seconds"],
    correctIndex: 0
  }
];

const AIPreparationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interview' | 'aptitude' | 'reasoning'>('interview');
  const [topic, setTopic] = useState('General Engineering');
  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState<AptitudeQuestion[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]); 
  const [userSelections, setUserSelections] = useState<number[]>(new Array(5).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadStaticAptitude = () => {
    setAptitudeQuestions(STATIC_APTITUDE_SET);
    setUserSelections(new Array(5).fill(-1));
    setIsSubmitted(false);
  };

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
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        }
      });
      const data = JSON.parse(response.text || "[]");
      setInterviewQuestions(data);
    } catch (e) {
      console.error(e);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateTest = async (type: 'aptitude' | 'reasoning') => {
    setLoading(true);
    setAptitudeQuestions([]);
    setUserSelections(new Array(5).fill(-1));
    setIsSubmitted(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 high-quality ${type} questions for Indian engineering placement preparation. 
        - For aptitude: focus on Quantitative (Speed, Time, Work, Profit/Loss, etc.) 
        - For reasoning: focus on Logical (Syllogisms, Blood Relations, Coding-Decoding).
        Include 4 options for each question and the zero-based index of the correct answer.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.INTEGER }
              },
              required: ["question", "options", "correctIndex"]
            }
          }
        }
      });
      const data = JSON.parse(response.text || "[]");
      setAptitudeQuestions(data);
    } catch (e) {
      console.error(e);
      alert("Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (idx: number) => {
    setRevealedAnswers(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (isSubmitted) return;
    const nextSelections = [...userSelections];
    nextSelections[qIdx] = oIdx;
    setUserSelections(nextSelections);
  };

  const handleSubmitTest = () => {
    if (userSelections.includes(-1)) {
      if (!confirm("You haven't answered all questions. Submit anyway?")) return;
    }
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    return aptitudeQuestions.reduce((score, q, idx) => {
      return score + (userSelections[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  };

  return (
    <div className="space-y-12">
      <div className="bg-white border-t-8 border-rose-500 rounded-[2.5rem] p-8 shadow-2xl shadow-rose-100/50 overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded uppercase tracking-widest">AI HUB</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded uppercase tracking-widest">PLACEMENT READY</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-none">Preparation Center</h3>
            <p className="text-sm font-medium text-slate-400">Master your upcoming interviews and aptitude rounds with AI-generated drills.</p>
          </div>

          <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl gap-1">
            {(['interview', 'aptitude', 'reasoning'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setInterviewQuestions([]);
                  setAptitudeQuestions([]);
                  setRevealedAnswers([]);
                  setIsSubmitted(false);
                }}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-tight ${
                  activeTab === tab ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'interview' ? 'Mock Interview' : tab === 'aptitude' ? 'Aptitude Test' : 'Logical Reasoning'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          {activeTab === 'interview' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Target Role or Tech (e.g. Java, HR, Python)"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 text-slate-800 font-bold focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 outline-none transition-all placeholder:text-slate-400"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <button
                onClick={generateInterview}
                disabled={loading}
                className="px-8 py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-rose-200"
              >
                {loading ? 'Generating...' : 'Start Session'}
              </button>
            </div>
          )}

          {(activeTab === 'aptitude' || activeTab === 'reasoning') && aptitudeQuestions.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center py-10 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 space-y-4">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto">
                    🚀
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800">Quick Practice Set</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Speed, Time & Work Focus</p>
                 </div>
                 <button
                    onClick={loadStaticAptitude}
                    className="px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
                  >
                    Start Practice Set
                  </button>
              </div>

              <div className="text-center py-10 bg-rose-50 rounded-[2rem] border-2 border-dashed border-rose-200 space-y-4">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto">
                    {activeTab === 'aptitude' ? '📊' : '🧠'}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 capitalize">AI Dynamic {activeTab}</h4>
                    <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Generated Fresh Each Time</p>
                 </div>
                 <button
                    onClick={() => generateTest(activeTab as 'aptitude' | 'reasoning')}
                    disabled={loading}
                    className="px-6 py-3 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all active:scale-95 shadow-lg"
                  >
                    {loading ? 'Curating...' : 'Generate New Test'}
                  </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {interviewQuestions.map((q, idx) => (
              <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black flex-shrink-0 border border-rose-100">Q{idx+1}</span>
                  <p className="font-bold text-slate-800 leading-relaxed pt-2">{q.question}</p>
                </div>
                {revealedAnswers.includes(idx) ? (
                  <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      <span className="font-black text-rose-600 uppercase text-[9px] tracking-widest block mb-2">Model Answer & Strategy:</span>
                      {q.answer}
                    </p>
                    <button onClick={() => toggleReveal(idx)} className="mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Hide Answer</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleReveal(idx)}
                    className="ml-14 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Reveal Answer
                  </button>
                )}
              </div>
            ))}

            {aptitudeQuestions.map((q, qIdx) => (
              <div key={qIdx} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${qIdx * 100}ms` }}>
                 <div className="flex gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-800 flex items-center justify-center font-black flex-shrink-0 border border-slate-200">{qIdx+1}</span>
                  <p className="font-bold text-slate-800 text-lg leading-relaxed pt-1">{q.question}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-14">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userSelections[qIdx] === oIdx;
                    const isCorrect = q.correctIndex === oIdx;
                    let btnClass = "p-4 rounded-2xl border-2 text-sm font-bold transition-all text-left flex items-center gap-3 ";
                    
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnClass += "bg-emerald-50 border-emerald-500 text-emerald-800";
                      } else if (isSelected && !isCorrect) {
                        btnClass += "bg-rose-50 border-rose-500 text-rose-800";
                      } else {
                        btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                      }
                    } else {
                      btnClass += isSelected 
                        ? "bg-rose-50 border-rose-500 text-rose-700 shadow-lg shadow-rose-100" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-rose-200 hover:bg-rose-50/30";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => handleOptionSelect(qIdx, oIdx)}
                        className={btnClass}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0 border ${
                          isSelected ? 'bg-white border-rose-200 text-rose-600' : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {aptitudeQuestions.length > 0 && (
              <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitTest}
                    className="px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-rose-600 transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center gap-3 uppercase tracking-widest text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Finish & Submit Test
                  </button>
                ) : (
                  <div className="w-full bg-slate-900 rounded-[2.5rem] p-8 text-center text-white space-y-4 animate-in zoom-in-95 duration-500 shadow-2xl">
                    <div className="text-4xl mb-2">🎉</div>
                    <h4 className="text-2xl font-black">Test Completed!</h4>
                    <div className="flex justify-center gap-2">
                      <span className="text-6xl font-black text-rose-500">{calculateScore()}</span>
                      <span className="text-2xl font-black text-slate-500 self-end mb-2">/ 5</span>
                    </div>
                    <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto">
                      {calculateScore() >= 4 
                        ? "Outstanding! You're ready for the big day." 
                        : calculateScore() >= 2 
                        ? "Good effort! Keep practicing to reach perfection." 
                        : "Don't give up! Revision is the key to success."}
                    </p>
                    <button
                      onClick={() => setAptitudeQuestions([])}
                      className="mt-6 px-8 py-3 bg-white text-slate-900 font-black rounded-2xl hover:bg-rose-500 hover:text-white transition-all text-xs uppercase tracking-widest"
                    >
                      Reset Hub
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-white rounded-2xl shadow-sm">
             <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
           </div>
           <div>
             <h4 className="text-xl font-black text-slate-900">Expert Learning Vault</h4>
             <p className="text-sm text-slate-500 font-medium">Top-rated YouTube channels for mastering placements and tech skills.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {RECOMMENDED_CHANNELS.map((channel) => (
             <a 
               key={channel.name}
               href={channel.url}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group"
             >
               <div className="flex items-center justify-between mb-4">
                 <div className="text-3xl group-hover:scale-110 transition-transform">{channel.icon}</div>
                 <div className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase tracking-widest">YouTube</div>
               </div>
               <h5 className="font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{channel.name}</h5>
               <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-4">{channel.description}</p>
               <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Start Learning</span>
                 <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </div>
             </a>
           ))}
        </div>

        <div className="mt-10 p-6 bg-indigo-900 rounded-3xl text-white flex flex-col md:flex-row items-center gap-6 justify-between">
           <div className="space-y-1">
             <h5 className="font-black text-lg">Detailed Learning Roadmap?</h5>
             <p className="text-xs text-indigo-300 font-medium">Check the Career Hub section for batch-specific study plans synchronized with these resources.</p>
           </div>
           <div className="flex gap-3">
              <a href="https://www.youtube.com/results?search_query=time+and+work+aptitude+tricks" target="_blank" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Work Tricks</a>
              <a href="https://www.youtube.com/results?search_query=speed+time+distance+aptitude+tricks" target="_blank" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Speed Tricks</a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIPreparationHub;
