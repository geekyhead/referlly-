import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { HeroBackground } from '@/components/hero-background';
import { LikeCommentSheet } from '@/components/like-comment-sheet';
import { MatchCelebrationModal } from '@/components/match-celebration-modal';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { getDeckCardById } from '@/data/people';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';
import { Prompt } from '@/types';

export default function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { sentLikes, addSentLike, likePerson, useSpotlight } = useAppState();
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [celebrationMatchId, setCelebrationMatchId] = useState<string | null>(null);

  const card = getDeckCardById(id);

  const likedQuestions = useMemo(
    () => new Set(sentLikes.filter((like) => like.personId === id).map((like) => like.question)),
    [sentLikes, id],
  );

  if (!card) {
    return (
      <ThemedView style={styles.notFound}>
        <ThemedText type="default">Profile not found.</ThemedText>
      </ThemedView>
    );
  }

  function handleReport() {
    if (!card) return;
    Alert.alert(`Block or report ${card.name}?`, 'This is a demo — no report is actually sent.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Block & Report',
        style: 'destructive',
        onPress: () => router.back(),
      },
    ]);
  }

  function handleSendLike(comment: string) {
    if (!activePrompt || !card) return;
    addSentLike({
      personId: card.id,
      personName: card.name,
      question: activePrompt.question,
      answer: activePrompt.answer,
      comment,
    });
    setActivePrompt(null);
  }

  function handleLike() {
    const match = likePerson(card!);
    if (match) {
      setCelebrationMatchId(match.id);
    } else {
      router.back();
    }
  }

  function handleSpotlight() {
    if (useSpotlight()) {
      handleLike();
    } else {
      router.push('/premium');
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <HeroBackground
          photoUrl={card.photoUrl}
          colors={card.avatarColor}
          style={[styles.hero, { paddingTop: insets.top + Spacing.three }]}>
          <View style={styles.heroButtonRow}>
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.roundButton}>
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={handleReport} hitSlop={12} style={styles.roundButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.heroTopRow}>
            <View style={styles.heroTopLeft}>
              {card.matchScore && (
                <View style={[styles.matchScorePill, { backgroundColor: theme.accent }]}>
                  <ThemedText type="caption" style={styles.matchScoreText}>
                    {card.matchScore}% Match
                  </ThemedText>
                </View>
              )}
              <Pill label={card.tag} variant="outline" style={styles.companyTag} />
              {card.isNew && <Pill label="New here" variant="outline" style={styles.companyTag} />}
            </View>
            {card.badge && <Pill label={card.badge} variant="success" />}
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.nameRow}>
              <ThemedText type="title" style={styles.heroText}>
                {card.name}, {card.age}
              </ThemedText>
              {card.verified && (
                <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" style={{ marginLeft: 6 }} />
              )}
            </View>
            <ThemedText type="subtitle" style={styles.heroText}>
              {card.headline}
            </ThemedText>
            <ThemedText type="default" style={[styles.heroText, { opacity: 0.9 }]}>
              {card.subline}
            </ThemedText>
          </View>
        </HeroBackground>

        <View style={styles.body}>
          <View style={[styles.lookingForCard, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.lookingForLabel}>
              {card.tagsLabel.toUpperCase()}
            </ThemedText>
            <View style={styles.tagRow}>
              {card.tags.map((tag) => (
                <Pill key={tag} label={tag} variant="outline" />
              ))}
            </View>
          </View>

          <View style={styles.statsRow}>
            <Stat icon="people-outline" label={`${card.mutualConnections} mutual`} />
            <Stat icon="time-outline" label={card.meta} />
            <Stat icon="briefcase-outline" label={card.metaSecondary} />
          </View>

          {card.prompts.map((prompt) => {
            const liked = likedQuestions.has(prompt.question);
            return (
              <View key={prompt.question} style={[styles.promptBlock, { borderColor: theme.border }]}>
                <View style={styles.promptHeader}>
                  <ThemedText type="label" themeColor="textTertiary" style={{ flex: 1 }}>
                    {prompt.question}
                  </ThemedText>
                  <Pressable
                    onPress={() => !liked && setActivePrompt(prompt)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={liked ? 'Noted' : `Note this answer: ${prompt.question}`}
                    style={[
                      styles.promptLikeButton,
                      { backgroundColor: liked ? theme.accent : theme.backgroundElement },
                    ]}>
                    <Ionicons name={liked ? 'checkmark' : 'add'} size={16} color={liked ? '#FFFFFF' : theme.textSecondary} />
                  </Pressable>
                </View>
                <ThemedText type="default" style={styles.promptAnswer}>
                  {prompt.answer}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.actions,
          { paddingBottom: insets.bottom + Spacing.three, backgroundColor: theme.background, borderColor: theme.border },
        ]}>
        <ActionButton icon="close" color={theme.danger} backgroundColor={theme.card} size={52} onPress={() => router.back()} accessibilityLabel="Pass" />
        <ActionButton icon="star" color={theme.star} backgroundColor={theme.card} size={44} iconSize={20} onPress={handleSpotlight} accessibilityLabel="Spotlight" />
        <ActionButton icon="checkmark" color="#FFFFFF" backgroundColor={theme.accent} size={52} onPress={handleLike} accessibilityLabel="Mark interested" />
      </View>

      <LikeCommentSheet
        visible={activePrompt !== null}
        personName={card.name}
        prompt={activePrompt}
        onClose={() => setActivePrompt(null)}
        onSend={handleSendLike}
      />

      <MatchCelebrationModal
        visible={celebrationMatchId !== null}
        card={card}
        matchId={celebrationMatchId}
        onClose={() => {
          setCelebrationMatchId(null);
          router.back();
        }}
      />
    </ThemedView>
  );
}

function Stat({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  const theme = useTheme();
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={16} color={theme.textSecondary} />
      <ThemedText type="caption" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: Spacing.five,
  },
  hero: {
    padding: Spacing.four,
    justifyContent: 'space-between',
    minHeight: 280,
  },
  heroButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  roundButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTopLeft: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  companyTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'transparent',
  },
  matchScorePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heroBottom: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroText: {
    color: '#FFFFFF',
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lookingForCard: {
    borderRadius: Radius.large,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  lookingForLabel: {
    letterSpacing: 0.4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  promptBlock: {
    gap: 4,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptLikeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptAnswer: {
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
