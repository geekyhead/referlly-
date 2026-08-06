import { matches } from '@/data/matches';
import { profiles, profileToDeckCard } from '@/data/profiles';
import { recruiterMatches } from '@/data/recruiter-matches';
import { seekers, seekerToDeckCard } from '@/data/seekers';
import { DeckCard, MatchThread } from '@/types';

export function getDeckCardById(id: string): DeckCard | undefined {
  const profile = profiles.find((person) => person.id === id);
  if (profile) return profileToDeckCard(profile);

  const seeker = seekers.find((person) => person.id === id);
  if (seeker) return seekerToDeckCard(seeker);

  return undefined;
}

export function getMatchThreadById(id: string): MatchThread | undefined {
  return matches.find((match) => match.id === id) ?? recruiterMatches.find((match) => match.id === id);
}
