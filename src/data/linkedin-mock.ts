import { Role } from '@/types';

export type LinkedInImportData = {
  title: string;
  company?: string;
  yearsExperience: number;
  skills: string[];
  bio: string;
};

export const linkedInMockData: Record<Role, LinkedInImportData> = {
  seeker: {
    title: 'Senior Product Designer',
    yearsExperience: 5,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'A/B Testing'],
    bio: '5+ years designing B2B and consumer products, from 0-to-1 to scaled design systems.',
  },
  recruiter: {
    title: 'Senior Talent Partner',
    company: 'Northwind Labs',
    yearsExperience: 6,
    skills: ['Technical Recruiting', 'Sourcing', 'Employer Branding', 'Interview Design'],
    bio: '6 years hiring engineering and product teams, from seed stage through Series C.',
  },
};
