import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { currentUser as defaultCurrentUser } from '@/data/current-user';
import { CurrentUser, DeckCard, JobFilters, MatchThread, Message, Prompt, Role, SentLike } from '@/types';

const DEFAULT_FILTERS: JobFilters = {
  roles: ['Product Design', 'UX Research', 'Design Systems'],
  workMode: 'Hybrid',
  distance: '25 mi',
  salary: '$100k – $120k',
  seniority: ['Mid-level', 'Senior'],
  industries: ['Technology'],
  companySize: 'Mid-size (50–500)',
  verifiedOnly: false,
  activelyHiringOnly: true,
};

const INITIAL_SPOTLIGHTS = 3;

type AppContextValue = {
  role: Role;
  setRole: (role: Role) => void;

  hasOnboarded: boolean;
  completeOnboarding: () => void;
  restartOnboarding: () => void;

  myProfile: CurrentUser;
  updateMyProfile: (patch: Partial<CurrentUser>) => void;
  updatePromptAnswer: (index: number, answer: string) => void;
  setPrompts: (prompts: Prompt[]) => void;

  filters: JobFilters;
  updateFilters: (patch: Partial<JobFilters>) => void;

  sentLikes: SentLike[];
  addSentLike: (like: Omit<SentLike, 'id' | 'timestamp'>) => void;

  spotlightsRemaining: number;
  useSpotlight: () => boolean;

  isPremium: boolean;
  setPremium: (value: boolean) => void;

  linkedinVerified: boolean;
  setLinkedinVerified: (value: boolean) => void;

  dynamicMatches: MatchThread[];
  likePerson: (card: DeckCard) => MatchThread | null;
  appendMessage: (matchId: string, text: string) => boolean;

  lastSkipped: DeckCard | null;
  recordSkip: (card: DeckCard) => void;
  undoLastSkip: () => DeckCard | null;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('seeker');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [myProfile, setMyProfile] = useState<CurrentUser>(defaultCurrentUser);
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);
  const [sentLikes, setSentLikes] = useState<SentLike[]>([]);
  const [spotlightsRemaining, setSpotlightsRemaining] = useState(INITIAL_SPOTLIGHTS);
  const [isPremium, setIsPremium] = useState(false);
  const [linkedinVerified, setLinkedinVerified] = useState(false);
  const [dynamicMatches, setDynamicMatches] = useState<MatchThread[]>([]);
  const [lastSkipped, setLastSkipped] = useState<DeckCard | null>(null);

  const completeOnboarding = useCallback(() => setHasOnboarded(true), []);
  const restartOnboarding = useCallback(() => setHasOnboarded(false), []);

  const updateMyProfile = useCallback((patch: Partial<CurrentUser>) => {
    setMyProfile((current) => ({ ...current, ...patch }));
  }, []);

  const updatePromptAnswer = useCallback((index: number, answer: string) => {
    setMyProfile((current) => ({
      ...current,
      prompts: current.prompts.map((prompt, i) => (i === index ? { ...prompt, answer } : prompt)),
    }));
  }, []);

  const setPrompts = useCallback((prompts: Prompt[]) => {
    setMyProfile((current) => ({ ...current, prompts }));
  }, []);

  const updateFilters = useCallback((patch: Partial<JobFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const addSentLike = useCallback((like: Omit<SentLike, 'id' | 'timestamp'>) => {
    setSentLikes((current) => [
      { ...like, id: `sl-${current.length}-${Date.now()}`, timestamp: 'Just now' },
      ...current,
    ]);
  }, []);

  const useSpotlight = useCallback(() => {
    let success = false;
    setSpotlightsRemaining((current) => {
      if (current <= 0) return current;
      success = true;
      return current - 1;
    });
    return success;
  }, []);

  const likePerson = useCallback((card: DeckCard) => {
    if (!card.willMatchBack) return null;

    let created: MatchThread | null = null;
    setDynamicMatches((current) => {
      if (current.some((thread) => thread.personId === card.id)) return current;
      created = {
        id: `dyn-${card.id}-${Date.now()}`,
        personId: card.id,
        matchedAt: 'Just now',
        unreadCount: 0,
        messages: [],
      };
      return [created, ...current];
    });
    return created;
  }, []);

  const appendMessage = useCallback((matchId: string, text: string) => {
    let found = false;
    setDynamicMatches((current) =>
      current.map((thread) => {
        if (thread.id !== matchId) return thread;
        found = true;
        const message: Message = { id: `${matchId}-${thread.messages.length}`, senderId: 'me', text, timestamp: 'Just now' };
        return { ...thread, messages: [...thread.messages, message] };
      }),
    );
    return found;
  }, []);

  const recordSkip = useCallback((card: DeckCard) => {
    setLastSkipped(card);
  }, []);

  const undoLastSkip = useCallback(() => {
    let restored: DeckCard | null = null;
    setLastSkipped((current) => {
      restored = current;
      return null;
    });
    return restored;
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      role,
      setRole,
      hasOnboarded,
      completeOnboarding,
      restartOnboarding,
      myProfile,
      updateMyProfile,
      updatePromptAnswer,
      setPrompts,
      filters,
      updateFilters,
      sentLikes,
      addSentLike,
      spotlightsRemaining,
      useSpotlight,
      isPremium,
      setPremium: setIsPremium,
      linkedinVerified,
      setLinkedinVerified,
      dynamicMatches,
      likePerson,
      appendMessage,
      lastSkipped,
      recordSkip,
      undoLastSkip,
    }),
    [
      role,
      hasOnboarded,
      completeOnboarding,
      restartOnboarding,
      myProfile,
      updateMyProfile,
      updatePromptAnswer,
      setPrompts,
      filters,
      updateFilters,
      sentLikes,
      addSentLike,
      spotlightsRemaining,
      useSpotlight,
      isPremium,
      linkedinVerified,
      dynamicMatches,
      likePerson,
      appendMessage,
      lastSkipped,
      recordSkip,
      undoLastSkip,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
