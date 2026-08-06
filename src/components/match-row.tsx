import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { DeckCard, MatchThread } from '@/types';

type MatchRowProps = {
  match: MatchThread;
  card: DeckCard;
};

export function MatchRow({ match, card }: MatchRowProps) {
  const theme = useTheme();
  const lastMessage = match.messages[match.messages.length - 1];
  const unread = match.unreadCount > 0;
  const isNewMatch = match.messages.length === 0;

  return (
    <Pressable
      onPress={() => router.push(`/chat/${match.id}`)}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: theme.backgroundElement }]}>
      <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={56} />
      <View style={styles.textArea}>
        <View style={styles.topLine}>
          <ThemedText type={unread || isNewMatch ? 'smallBold' : 'small'} numberOfLines={1} style={{ flex: 1 }}>
            {card.name}
          </ThemedText>
          <ThemedText type="caption" themeColor="textTertiary">
            {isNewMatch ? match.matchedAt : lastMessage?.timestamp}
          </ThemedText>
        </View>
        <ThemedText
          type={unread || isNewMatch ? 'smallBold' : 'default'}
          themeColor={unread || isNewMatch ? 'accent' : 'textSecondary'}
          numberOfLines={1}>
          {isNewMatch ? 'You’re connected — send a message' : `${lastMessage?.senderId === 'me' ? 'You: ' : ''}${lastMessage?.text}`}
        </ThemedText>
      </View>
      {unread && <View style={[styles.dot, { backgroundColor: theme.accent }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  textArea: {
    flex: 1,
    gap: 2,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
