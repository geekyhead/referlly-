import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { CardShadow, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { DeckCard } from '@/types';

type LikeCardProps = {
  card: DeckCard;
  locked?: boolean;
  showBadge?: boolean;
  showSubline?: boolean;
};

export function LikeCard({ card, locked, showBadge, showSubline }: LikeCardProps) {
  const theme = useTheme();
  const scheme = useColorScheme();

  return (
    <Pressable
      disabled={locked}
      onPress={() => router.push(`/profile-detail/${card.id}`)}
      style={[styles.card, CardShadow, { backgroundColor: theme.card }]}>
      <View style={styles.avatarWrap}>
        <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={72} />
        {showBadge && !locked && (
          <View style={[styles.featuredBadge, { backgroundColor: theme.star }]}>
            <Ionicons name="sparkles" size={11} color="#FFFFFF" />
          </View>
        )}
      </View>
      <ThemedText type="smallBold" numberOfLines={1} style={styles.name}>
        {locked ? '••••••' : card.name}
      </ThemedText>
      <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
        {locked ? 'Interested in you' : card.headline}
      </ThemedText>
      {showSubline && !locked && (
        <ThemedText type="caption" themeColor="textTertiary" numberOfLines={1}>
          {card.subline}
        </ThemedText>
      )}

      {locked && (
        <BlurView
          intensity={38}
          tint={scheme === 'dark' ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}>
          <View style={styles.lockOverlay}>
            <View style={[styles.lockBadge, { backgroundColor: theme.primary }]}>
              <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
            </View>
          </View>
        </BlurView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.large,
    padding: Spacing.three,
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarWrap: {
    marginBottom: Spacing.two,
  },
  featuredBadge: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    marginBottom: 1,
  },
  lockOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
