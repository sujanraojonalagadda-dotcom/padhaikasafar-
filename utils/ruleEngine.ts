
import { StudentProfile, Goal, UserAction } from '../types';
import { getEligibleScholarships, generateScholarshipActions } from './scholarshipEngine';
import { getRecommendedCourses, generateCourseActions } from './courseEngine';
import { getRecommendedOpportunities, generateOpportunityActions } from './opportunityEngine';

export const generateGoalsAndActions = (profile: StudentProfile): Goal[] => {
  const goals: Goal[] = [];
  const year = parseInt(profile.currentYear);

  // OPPORTUNITIES & HACKATHONS GOAL (NEW)
  const recommendedOpps = getRecommendedOpportunities(profile);
  if (recommendedOpps.length > 0) {
    goals.push({
      id: 'g_opportunities',
      title: 'Global Competitions & Hacks',
      description: 'Participate in high-impact events and internships to boost your profile.',
      actions: generateOpportunityActions(recommendedOpps)
    });
  }

  // LEARNING GOAL (RECOMMENDED COURSES)
  const recommendedCourses = getRecommendedCourses(profile);
  if (recommendedCourses.length > 0) {
    goals.push({
      id: 'g_learning_path',
      title: 'Personalized Learning Path',
      description: 'Master in-demand skills with certifications from top global providers.',
      actions: generateCourseActions(recommendedCourses)
    });
  }

  // SCHOLARSHIP GOAL
  const eligibleScholarships = getEligibleScholarships(profile);
  if (eligibleScholarships.length > 0) {
    goals.push({
      id: 'g_scholarships',
      title: 'Maximize Financial Support',
      description: 'You are eligible for several government scholarship schemes based on your profile.',
      actions: generateScholarshipActions(eligibleScholarships)
    });
  }

  // INTERNSHIP GOAL
  if (year >= 2) {
    goals.push({
      id: 'g_internship_launch',
      title: 'Industry Launchpad',
      description: 'Gain real-world experience through official internship portals.',
      actions: [
        {
          id: 'a_aicte_reg',
          title: 'Register on AICTE Portal',
          description: 'Access 10,000+ official Indian govt and private internships.',
          link: 'https://internship.aicte-india.org/',
          status: 'Pending'
        },
        {
          id: 'a_internshala_up',
          title: 'Setup Internshala Profile',
          description: 'Get hired by startups and MNCs for paid internships.',
          link: 'https://internshala.com/',
          status: 'Pending'
        }
      ]
    });
  }

  return goals;
};
