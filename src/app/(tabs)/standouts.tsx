import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { LikeCard } from '@/components/like-card';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { profileToDeckCard, profiles } from '@/data/profiles';
import { seekerToDeckCard, seekers } from '@/data/seekers';
import { useAppState } from '@/state/app-context';

export default function StandoutsScreen() {
  const { role } = useAppState();

  const cards = useMemo(() => {
    const source = role === 'seeker' ? profiles.map(profileToDeckCard) : seekers.map(seekerToDeckCard);
    return source.filter((card) => card.featured);
  }, [role]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader title="Standouts" subtitle="Curated picks — refreshed daily" />

      {cards.length === 0 ? (
        <ThemedText type="default" themeColor="textSecondary" style={styles.empty}>
          No standouts right now — check back later.
        </ThemedText>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id}
          numColumns={2}
          style={styles.flatList}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <LikeCard card={item} showBadge showSubline />}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: Spacing.six,
    paddingHorizontal: Spacing.five,
  },
  flatList: {
    flex: 1,
  },
  list: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  column: {
    gap: Spacing.three,
  },
});
