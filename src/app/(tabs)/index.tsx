import { Redirect } from 'expo-router';
import { useMemo } from 'react';

import { FilterChipBar } from '@/components/filter-chip-bar';
import { RoleSwitch } from '@/components/role-switch';
import { ScreenHeader } from '@/components/screen-header';
import { SwipeDeck } from '@/components/swipe-deck';
import { ThemedView } from '@/components/themed-view';
import { profiles, profileToDeckCard } from '@/data/profiles';
import { seekers, seekerToDeckCard } from '@/data/seekers';
import { useAppState } from '@/state/app-context';

export default function DiscoverScreen() {
  const { role, hasOnboarded } = useAppState();

  const cards = useMemo(
    () => (role === 'seeker' ? profiles.map(profileToDeckCard) : seekers.map(seekerToDeckCard)),
    [role],
  );

  if (!hasOnboarded) {
    return <Redirect href="/onboarding/welcome" />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader
        title="Discover"
        subtitle={role === 'seeker' ? 'Recruiters & referrers near you' : 'Candidates open to work near you'}
      />
      <RoleSwitch />
      <FilterChipBar />
      <SwipeDeck cards={cards} />
    </ThemedView>
  );
}
