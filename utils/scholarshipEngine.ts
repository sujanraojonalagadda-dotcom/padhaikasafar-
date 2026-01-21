
import { StudentProfile, Scholarship, UserAction } from '../types';
import { SCHOLARSHIP_DATA } from '../constants';

export const getEligibleScholarships = (profile: StudentProfile): Scholarship[] => {
  const incomeValue = parseFloat(profile.familyIncome.replace(/[^0-9.]/g, '')) || 0;
  const isTechnical = ['IT', 'Core'].includes(profile.interest);

  return SCHOLARSHIP_DATA.filter(scholarship => {
    switch (scholarship.id) {
      case 'nsp_post_matric':
        return incomeValue <= 2.5;
      case 'pragati_girls':
        return profile.gender === 'Female' && isTechnical && (profile.educationLevel === 'UG' || profile.educationLevel === 'Diploma');
      case 'minority_scholarship':
        return incomeValue <= 2.0;
      case 'state_fee_reimbursement':
        return incomeValue <= 2.0;
      default:
        return false;
    }
  });
};

export const generateScholarshipActions = (eligible: Scholarship[]): UserAction[] => {
  const now = new Date();
  
  return eligible.map(s => {
    const deadlineDate = new Date(s.deadline);
    const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: `a_sch_${s.id}`,
      title: `Apply for ${s.name}`,
      description: `Deadline: ${s.deadline}. Documents: ${s.docsNeeded.join(', ')}`,
      link: s.applyLink,
      status: 'Pending',
      isUrgent: diffDays <= 7 && diffDays >= 0,
      deadline: s.deadline
    };
  });
};
