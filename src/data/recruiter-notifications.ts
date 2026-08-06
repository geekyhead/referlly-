import { AppNotification } from '@/types';

export const recruiterNotifications: AppNotification[] = [
  {
    id: 'rn1',
    type: 'match',
    title: 'You matched with Priya Shah',
    subtitle: 'Backend Engineer · open to Platform & DevOps',
    timestamp: '3h ago',
    read: false,
    personId: 's2',
  },
  {
    id: 'rn2',
    type: 'message',
    title: 'New message from Owen Baptiste',
    subtitle: 'Appreciate the match — what’s the team size...',
    timestamp: '6h ago',
    read: false,
    personId: 's5',
  },
  {
    id: 'rn3',
    type: 'like',
    title: 'A candidate is interested in your company profile',
    subtitle: 'Keep going — you’re close to a match',
    timestamp: '1d ago',
    read: true,
  },
  {
    id: 'rn4',
    type: 'profileView',
    title: 'Grace Odom viewed your open role',
    subtitle: 'Marketing Coordinator · 2 yrs experience',
    timestamp: '2d ago',
    read: true,
    personId: 's6',
  },
  {
    id: 'rn5',
    type: 'referral',
    title: 'Sourcing tip',
    subtitle: 'Roles with a salary range get 2x more candidate likes',
    timestamp: '4d ago',
    read: true,
  },
];
