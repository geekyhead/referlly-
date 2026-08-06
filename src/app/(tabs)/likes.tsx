import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { LikeCard } from '@/components/like-card';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { lockedLikeIds, unlockedLikeIds } from '@/data/likes';
import { getDeckCardById } from '@/data/people';
import { recruiterLockedLikeIds, recruiterUnlockedLikeIds } from '@/data/recruiter-likes';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';
import { DeckCard } from '@/types';

type Row = { card: DeckCard; locked: boolean };

export default function LikesScreen() {
  const theme = useTheme();
  const { role, isPremium } = useAppState();

  const rows: Row[] = useMemo(() => {
    const unlockedIds = role === 'seeker' ? unlockedLikeIds : recruiterUnlockedLikeIds;
    const lockedIds = role === 'seeker' ? lockedLikeIds : recruiterLockedLikeIds;
    return [
      ...unlockedIds.map((id) => ({ card: getDeckCardById(id)!, locked: false })),
      ...lockedIds.map((id) => ({ card: getDeckCardById(id)!, locked: !isPremium })),
    ].filter((row) => row.card);
  }, [role, isPremium]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader
        title="Likes You"
        subtitle={`${rows.length} ${role === 'seeker' ? 'people are' : 'candidates are'} interested`}
      />

      {!isPremium && (
        <Pressable
          style={[styles.upgradeBanner, { backgroundColor: theme.primary }]}
          onPress={() => router.push('/premium')}>
          <View style={{ flex: 1 }}>
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              See everyone who’s interested
            </ThemedText>
            <ThemedText type="caption" style={{ color: '#FFFFFF', opacity: 0.8 }}>
              Upgrade to Referly+ to unlock every profile instantly
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </Pressable>
      )}

      <FlatList
        data={rows}
        key="likes-grid"
        keyExtractor={(row) => row.card.id}
        numColumns={2}
        style={styles.flatList}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <LikeCard card={item.card} locked={item.locked} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  upgradeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    gap: Spacing.two,
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
