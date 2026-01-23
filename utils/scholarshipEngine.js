
import { SCHOLARSHIP_DATA } from '../constants.js';

export const getEligibleScholarships = (profile) => {
  const incomeValue = parseFloat(profile.familyIncome.replace(/[^0-9.]/g, '')) || 0;
  return SCHOLARSHIP_DATA.filter(s => incomeValue <= 2.5);
};

export const generateScholarshipActions = (eligible) => {
  return eligible.map(s => ({
    id: `a_sch_${s.id}`,
    title: `Apply for ${s.name}`,
    description: `Deadline: ${s.deadline}`,
    link: s.applyLink,
    status: 'Pending'
  }));
};
