import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { MatchCelebrationModal } from '@/components/match-celebration-modal';
import { SwipeCard, SwipeCardHandle } from '@/components/swipe-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';
import { DeckCard as DeckCardData } from '@/types';

const VISIBLE_CARDS = 3;

type SwipeDeckProps = {
  cards: DeckCardData[];
};

export function SwipeDeck({ cards }: SwipeDeckProps) {
  const theme = useTheme();
  const { spotlightsRemaining, useSpotlight, likePerson, recordSkip, undoLastSkip, isPremium } = useAppState();
  const [index, setIndex] = useState(0);
  const [celebration, setCelebration] = useState<{ card: DeckCardData; matchId: string } | null>(null);
  const topCardRef = useRef<SwipeCardHandle>(null);

  const visible = cards.slice(index, index + VISIBLE_CARDS);

  function handleSwiped(card: DeckCardData, direction: 'left' | 'right' | 'up') {
    if (direction === 'left') {
      recordSkip(card);
    } else {
      const match = likePerson(card);
      if (match) {
        setCelebration({ card, matchId: match.id });
      }
    }
    setIndex((current) => current + 1);
  }

  function handleReset() {
    setIndex(0);
  }

  function handleSpotlight() {
    if (useSpotlight()) {
      topCardRef.current?.swipeUp();
    } else {
      router.push('/premium');
    }
  }

  function handleUndo() {
    if (!isPremium) {
      router.push('/premium');
      return;
    }
    const restored = undoLastSkip();
    if (restored) {
      setIndex((current) => Math.max(0, current - 1));
    }
  }

  if (visible.length === 0) {
    return (
      <ThemedView style={styles.empty}>
        <ThemedText type="heading">You’re all caught up</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.emptyBody}>
          Check back later for new matches in your network.
        </ThemedText>
        <ActionButton
          icon="refresh"
          color="#FFFFFF"
          backgroundColor={theme.primary}
          size={52}
          onPress={handleReset}
        />
      </ThemedView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.deckArea}>
        {visible
          .map((card, i) => ({ card, i }))
          .reverse()
          .map(({ card, i }) => (
            <SwipeCard
              key={card.id}
              ref={i === 0 ? topCardRef : undefined}
              card={card}
              stackIndex={i}
              isTop={i === 0}
              onSwiped={(direction) => handleSwiped(card, direction)}
              onPress={() => router.push(`/profile-detail/${card.id}`)}
            />
          ))}
      </View>

      <View style={styles.actions}>
        <ActionButton
          icon="arrow-undo"
          color={theme.textSecondary}
          backgroundColor={theme.card}
          size={40}
          iconSize={18}
          onPress={handleUndo}
          accessibilityLabel="Undo last skip"
        />
        <ActionButton
          icon="close"
          color={theme.danger}
          backgroundColor={theme.card}
          size={52}
          onPress={() => topCardRef.current?.swipeLeft()}
          accessibilityLabel="Pass"
        />
        <View>
          <ActionButton
            icon="star"
            color={theme.star}
            backgroundColor={theme.card}
            size={44}
            iconSize={20}
            onPress={handleSpotlight}
            accessibilityLabel="Spotlight"
          />
          <View style={[styles.spotlightBadge, { backgroundColor: theme.primary }]}>
            <ThemedText type="caption" style={styles.spotlightBadgeText}>
              {spotlightsRemaining}
            </ThemedText>
          </View>
        </View>
        <ActionButton
          icon="checkmark"
          color="#FFFFFF"
          backgroundColor={theme.accent}
          size={52}
          onPress={() => topCardRef.current?.swipeRight()}
          accessibilityLabel="Mark interested"
        />
      </View>

      <MatchCelebrationModal
        visible={celebration !== null}
        card={celebration?.card ?? null}
        matchId={celebration?.matchId ?? null}
        onClose={() => setCelebration(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
    paddingBottom: Spacing.four,
  },
  spotlightBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  spotlightBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    gap: Spacing.three,
  },
  emptyBody: {
    textAlign: 'center',
  },
});
