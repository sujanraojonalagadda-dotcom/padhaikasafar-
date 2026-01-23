
import { getEligibleScholarships, generateScholarshipActions } from './scholarshipEngine.js';
import { getRecommendedCourses, generateCourseActions } from './courseEngine.js';
import { getRecommendedOpportunities, generateOpportunityActions } from './opportunityEngine.js';

export const generateGoalsAndActions = (profile) => {
  const goals = [];
  const year = parseInt(profile.currentYear);

  const recommendedOpps = getRecommendedOpportunities(profile);
  if (recommendedOpps.length > 0) {
    goals.push({
      id: 'g_opportunities',
      title: 'Global Competitions & Hacks',
      description: 'Participate in high-impact events and internships to boost your profile.',
      actions: generateOpportunityActions(recommendedOpps)
    });
  }

  const recommendedCourses = getRecommendedCourses(profile);
  if (recommendedCourses.length > 0) {
    goals.push({
      id: 'g_learning_path',
      title: 'Personalized Learning Path',
      description: 'Master in-demand skills with certifications from top global providers.',
      actions: generateCourseActions(recommendedCourses)
    });
  }

  const eligibleScholarships = getEligibleScholarships(profile);
  if (eligibleScholarships.length > 0) {
    goals.push({
      id: 'g_scholarships',
      title: 'Maximize Financial Support',
      description: 'You are eligible for several government scholarship schemes based on your profile.',
      actions: generateScholarshipActions(eligibleScholarships)
    });
  }

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
        }
      ]
    });
  }

  return goals;
};
