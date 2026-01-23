export const SYNC_INTERVAL_MS = 15000;

export const SCHOLARSHIP_DATA = [
  {
    id: 'nsp_post_matric',
    name: 'NSP Post Matric Scholarship',
    description: 'Financial assistance to students from SC/ST/OBC categories for pursuing higher education.',
    eligibilityExplanation: 'Available for students with family income < 2.5L per annum.',
    deadline: '2025-10-31',
    applyLink: 'https://scholarships.gov.in/',
    docsNeeded: ['Income Certificate', 'Caste Certificate', 'Previous Marksheet', 'Bank Passbook']
  },
  {
    id: 'pragati_girls',
    name: 'AICTE Pragati Scholarship',
    description: 'A dedicated scheme for girl students to pursue technical education (Degree/Diploma).',
    eligibilityExplanation: 'Specifically for female students in technical UG or Diploma courses.',
    deadline: '2025-12-15',
    applyLink: 'https://www.aicte-india.org/schemes/students-development-schemes/pragati-scholarship-scheme',
    docsNeeded: ['Admission Proof', 'Family Income Certificate', 'Aadhaar Card']
  }
];

export const OPPORTUNITY_DATABASE = [
  {
    id: 'sih_2025',
    title: 'Smart India Hackathon 2025',
    type: 'Hackathon',
    provider: 'Government of India',
    category: 'Tech',
    deadline: '2025-08-30',
    link: 'https://www.sih.gov.in/',
    is_new: true
  },
  {
    id: 'nse_trading_challenge',
    title: 'NSE National Trading Challenge',
    type: 'Competition',
    provider: 'NSE Academy',
    category: 'Trading',
    deadline: '2025-06-15',
    link: 'https://www.nseindia.com/learn/nse-academy',
    is_new: true
  },
  {
    id: 'aicte_intern_2025',
    title: 'AICTE-Industry Internship Program',
    type: 'Internship',
    provider: 'AICTE',
    category: 'Core',
    deadline: '2025-05-20',
    link: 'https://internship.aicte-india.org/',
    is_new: false
  }
];

export const COURSE_DATABASE = [
  {
    id: 'swayam_python',
    title: 'Python for Data Science',
    provider: 'SWAYAM',
    category: 'Data',
    education_level: 'UG',
    link: 'https://swayam.gov.in/explorer?searchText=python',
    is_new: false,
    priceType: 'Free',
    isInternship: false
  },
  {
    id: 'google_analytics',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google',
    category: 'Data',
    education_level: 'All',
    link: 'https://grow.google/data-analytics/',
    is_new: true,
    priceType: 'Paid',
    isInternship: false
  },
  {
    id: 'iit_aiml_cert',
    title: 'IIT Madras AI & ML Certification',
    provider: 'IIT',
    category: 'AI',
    education_level: 'UG',
    link: 'https://nptel.ac.in/',
    is_new: false,
    priceType: 'Free',
    isInternship: false
  },
  {
    id: 'ibm_cyber_security',
    title: 'IBM Cybersecurity Analyst Professional',
    provider: 'IBM',
    category: 'IT',
    education_level: 'All',
    link: 'https://www.ibm.com/training/cybersecurity',
    is_new: false,
    priceType: 'Paid',
    isInternship: false
  },
  {
    id: 'microsoft_azure_intern',
    title: 'Azure Cloud Developer Internship',
    provider: 'Microsoft',
    category: 'IT',
    education_level: 'UG',
    link: 'https://careers.microsoft.com/students/',
    is_new: true,
    priceType: 'Free',
    isInternship: true
  },
  {
    id: 'nvidia_ai_intern',
    title: 'Deep Learning Institute Internship',
    provider: 'NVIDIA',
    category: 'AI',
    education_level: 'All',
    link: 'https://www.nvidia.com/en-us/training/',
    is_new: true,
    priceType: 'Free',
    isInternship: true
  }
];

export const INTERNSHIP_PORTALS = [
  {
    id: 'aicte_official',
    title: 'AICTE Internship Portal',
    organization: 'Ministry of Education',
    description: 'The primary portal for Indian engineering and diploma students.',
    location: 'Pan India',
    duration: '2-6 Months',
    stipend: 'Varies',
    link: 'https://internship.aicte-india.org/',
    type: 'Govt'
  }
];

export const EXTERNAL_PLATFORMS = [
  {
    id: 'aicte_internship',
    name: 'AICTE Internship Portal',
    description: 'Official portal providing opportunities from government and private organizations.',
    url: 'https://internship.aicte-india.org/',
    icon: '🏛️',
    category: 'Internships'
  }
];

export const PRIVACY_CHECKS = [
  { label: 'Zero-Credential Storage' },
  { label: 'No Biometrics Required' },
  { label: 'No User Tracking' },
  { label: 'Only Verification Tokens stored' }
];

export const INACTIVITY_TIMEOUT = 1000 * 60 * 10;
export const WARNING_BEFORE_TIMEOUT = 1000 * 30;

export const ENGINEERING_ROADMAPS = [
  {
    year: '1st Year',
    focus: 'Logic & Fundamentals',
    color: 'from-blue-500 to-indigo-600',
    milestones: [
      { title: 'Programming Logic', desc: 'Mastering basics of C/C++ or Python.' },
      { title: 'Web Development', desc: 'HTML5, CSS3, and JavaScript basics.' }
    ]
  },
  {
    year: '2nd Year',
    focus: 'DSA & Development',
    color: 'from-emerald-500 to-teal-600',
    milestones: [
      { title: 'Data Structures', desc: 'Advanced DSA including Trees, Graphs.' },
      { title: 'Backend/Fullstack', desc: 'Building APIs with Node.js.' }
    ]
  }
];
