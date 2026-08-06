import { MatchThread } from '@/types';

export const matches: MatchThread[] = [
  {
    id: 'm1',
    personId: 'p2',
    matchedAt: '2 days ago',
    unreadCount: 2,
    messages: [
      {
        id: 'm1-1',
        senderId: 'p2',
        text: 'Hey! Saw you shipped a full-stack side project — love that.',
        timestamp: 'Mon 10:14 AM',
      },
      {
        id: 'm1-2',
        senderId: 'me',
        text: 'Thank you! It’s a small marketplace app, still rough around the edges.',
        timestamp: 'Mon 10:32 AM',
      },
      {
        id: 'm1-3',
        senderId: 'p2',
        text: 'Rough is fine, finished is rare. Mind sending the repo?',
        timestamp: 'Mon 10:35 AM',
      },
      {
        id: 'm1-4',
        senderId: 'p2',
        text: 'Also — we have a backend opening on my team right now.',
        timestamp: 'Mon 10:36 AM',
      },
    ],
  },
  {
    id: 'm2',
    personId: 'p1',
    matchedAt: '5 days ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm2-1',
        senderId: 'me',
        text: 'Hi Maya! Thanks for the match — I’d love to hear more about the Frontend role.',
        timestamp: 'Last Thu 3:02 PM',
      },
      {
        id: 'm2-2',
        senderId: 'p1',
        text: 'Of course! What’s your experience with design systems?',
        timestamp: 'Last Thu 4:10 PM',
      },
      {
        id: 'm2-3',
        senderId: 'me',
        text: 'About 2 years, mostly component libraries in React.',
        timestamp: 'Last Thu 4:20 PM',
      },
      {
        id: 'm2-4',
        senderId: 'p1',
        text: 'Perfect, that’s exactly the gap on our team right now.',
        timestamp: 'Last Thu 4:22 PM',
      },
    ],
  },
  {
    id: 'm3',
    personId: 'p6',
    matchedAt: '1 week ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm3-1',
        senderId: 'p6',
        text: 'Your profile mentioned closing enterprise deals — tell me more?',
        timestamp: 'Last Mon 9:00 AM',
      },
      {
        id: 'm3-2',
        senderId: 'me',
        text: 'Closed 3 six-figure deals last year, mostly outbound.',
        timestamp: 'Last Mon 9:45 AM',
      },
    ],
  },
  {
    id: 'm4',
    personId: 'p8',
    matchedAt: '3 weeks ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm4-1',
        senderId: 'p8',
        text: 'Loved your one-pager idea — can you send the doc when it’s ready?',
        timestamp: '3 weeks ago',
      },
    ],
  },
];
