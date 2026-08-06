export type Prompt = {
  question: string;
  answer: string;
};

export type Role = 'seeker' | 'recruiter';

export type Profile = {
  id: string;
  name: string;
  age: number;
  role: string;
  company: string;
  companyTag: string;
  location: string;
  distanceMi: number;
  yearsAtCompany: number;
  openToRefer: boolean;
  hiringFor: string[];
  mutualConnections: number;
  responseTime: string;
  verified: boolean;
  isNew?: boolean;
  activeNow?: boolean;
  featured?: boolean;
  matchScore?: number;
  willMatchBack?: boolean;
  avatarColor: [string, string];
  photoUrl?: string;
  prompts: Prompt[];
};

export type SeekerProfile = {
  id: string;
  name: string;
  age: number;
  title: string;
  yearsExperience: number;
  location: string;
  distanceMi: number;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  openTo: string[];
  skills: string[];
  mutualConnections: number;
  responseTime: string;
  verified: boolean;
  isNew?: boolean;
  activeNow?: boolean;
  featured?: boolean;
  matchScore?: number;
  willMatchBack?: boolean;
  avatarColor: [string, string];
  photoUrl?: string;
  prompts: Prompt[];
};

/** Shared shape the swipe deck, profile detail, and match/like/notification rows render — Profile and SeekerProfile both map onto it. */
export type DeckCard = {
  id: string;
  kind: 'recruiter' | 'seeker';
  name: string;
  age: number;
  headline: string;
  subline: string;
  tag: string;
  badge?: string;
  tagsLabel: string;
  tags: string[];
  mutualConnections: number;
  meta: string;
  metaSecondary: string;
  verified: boolean;
  isNew?: boolean;
  activeNow?: boolean;
  featured?: boolean;
  matchScore?: number;
  willMatchBack?: boolean;
  avatarColor: [string, string];
  photoUrl?: string;
  prompts: Prompt[];
};

export type CurrentUser = {
  id: string;
  name: string;
  age: number;
  title: string;
  company?: string;
  yearsExperience: number;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  openTo: string[];
  skills: string[];
  bio: string;
  avatarColor: [string, string];
  photoUrl?: string;
  prompts: Prompt[];
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type MatchThread = {
  id: string;
  personId: string;
  matchedAt: string;
  unreadCount: number;
  messages: Message[];
};

export type NotificationType = 'match' | 'like' | 'message' | 'profileView' | 'referral';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  timestamp: string;
  read: boolean;
  personId?: string;
};

export type SentLike = {
  id: string;
  personId: string;
  personName: string;
  question: string;
  answer: string;
  comment: string;
  timestamp: string;
};

export type JobFilters = {
  roles: string[];
  workMode: string;
  distance: string;
  salary: string;
  seniority: string[];
  industries: string[];
  companySize: string;
  verifiedOnly: boolean;
  activelyHiringOnly: boolean;
};
