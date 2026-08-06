import { CurrentUser } from '@/types';

export const currentUser: CurrentUser = {
  id: 'me',
  name: 'Alex Rivera',
  age: 28,
  title: 'Product Designer',
  yearsExperience: 4,
  location: 'Austin, TX',
  workMode: 'Hybrid',
  openTo: ['Product Design', 'UX Research', 'Design Systems'],
  skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'React'],
  bio: 'Designing calmer software, one component at a time. Previously at a 20-person fintech startup.',
  avatarColor: ['#2E2E2E', '#606060'],
  prompts: [
    {
      question: 'My ideal next role',
      answer: 'A product team that ships fast and still sweats the small details.',
    },
    {
      question: 'A project I’m proud of',
      answer: 'Rebuilt our design system from 40 inconsistent components down to 12 flexible ones.',
    },
    {
      question: 'Green flag in a company',
      answer: 'Engineers and designers pair before a single pixel is final.',
    },
  ],
};
