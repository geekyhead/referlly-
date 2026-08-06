import { router } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { MatchRow } from '@/components/match-row';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { matches } from '@/data/matches';
import { getDeckCardById } from '@/data/people';
import { recruiterMatches } from '@/data/recruiter-matches';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export default function MatchesScreen() {
  const theme = useTheme();
  const { role, dynamicMatches } = useAppState();
  const threads = useMemo(() => {
    const seedThreads = role === 'seeker' ? matches : recruiterMatches;
    const expectedKind = role === 'seeker' ? 'recruiter' : 'seeker';
    const ownDynamic = dynamicMatches.filter((thread) => getDeckCardById(thread.personId)?.kind === expectedKind);
    return [...ownDynamic, ...seedThreads];
  }, [role, dynamicMatches]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader title="Matches" subtitle={`${threads.length} conversations`} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newRowScroll}
        contentContainerStyle={styles.newRow}>
        {threads.map((match) => {
          const card = getDeckCardById(match.personId);
          if (!card) return null;
          return (
            <Pressable
              key={match.id}
              style={styles.newItem}
              onPress={() => router.push(`/chat/${match.id}`)}>
              <View>
                <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={64} />
                {match.unreadCount > 0 && (
                  <View style={[styles.newDot, { backgroundColor: theme.accent, borderColor: theme.background }]} />
                )}
              </View>
              <ThemedText type="caption" numberOfLines={1} style={styles.newName}>
                {card.name.split(' ')[0]}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      <ThemedText type="label" themeColor="textTertiary" style={styles.sectionLabel}>
        Messages
      </ThemedText>

      <FlatList
        data={threads}
        keyExtractor={(match) => match.id}
        style={styles.list}
        renderItem={({ item }) => {
          const card = getDeckCardById(item.personId);
          if (!card) return null;
          return <MatchRow match={item} card={card} />;
        }}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  newRowScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  newRow: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    paddingBottom: Spacing.three,
  },
  newItem: {
    alignItems: 'center',
    width: 64,
    gap: 6,
  },
  newDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  newName: {
    textAlign: 'center',
  },
  sectionLabel: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.one,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.five,
  },
});
