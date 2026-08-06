import { MatchThread } from '@/types';

export const recruiterMatches: MatchThread[] = [
  {
    id: 'rm1',
    personId: 's2',
    matchedAt: '1 day ago',
    unreadCount: 1,
    messages: [
      {
        id: 'rm1-1',
        senderId: 'me',
        text: 'Hi Priya! Loved the story about the Friday-deploy race condition — we have a backend opening on my team.',
        timestamp: 'Tue 9:10 AM',
      },
      {
        id: 'rm1-2',
        senderId: 's2',
        text: 'Oh nice, is it on the platform team?',
        timestamp: 'Tue 9:40 AM',
      },
      {
        id: 'rm1-3',
        senderId: 's2',
        text: 'I’d love to hear more about the stack.',
        timestamp: 'Tue 9:41 AM',
      },
    ],
  },
  {
    id: 'rm2',
    personId: 's1',
    matchedAt: '4 days ago',
    unreadCount: 0,
    messages: [
      {
        id: 'rm2-1',
        senderId: 'me',
        text: 'Alex, your design system rebuild is exactly the kind of work we need on our team.',
        timestamp: 'Last Fri 2:00 PM',
      },
      {
        id: 'rm2-2',
        senderId: 's1',
        text: 'Thank you! Happy to walk through the before/after if useful.',
        timestamp: 'Last Fri 2:20 PM',
      },
    ],
  },
  {
    id: 'rm3',
    personId: 's5',
    matchedAt: '2 weeks ago',
    unreadCount: 1,
    messages: [
      {
        id: 'rm3-1',
        senderId: 's5',
        text: 'Appreciate the match — what’s the team size you’re hiring an EM for?',
        timestamp: '2 weeks ago',
      },
    ],
  },
];

export function getRecruiterMatchById(id: string): MatchThread | undefined {
  return recruiterMatches.find((match) => match.id === id);
}
