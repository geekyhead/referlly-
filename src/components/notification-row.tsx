import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { getDeckCardById } from '@/data/people';
import { useTheme } from '@/hooks/use-theme';
import { AppNotification } from '@/types';

const ICONS: Record<AppNotification['type'], keyof typeof Ionicons.glyphMap> = {
  match: 'checkmark-done',
  like: 'bookmark',
  message: 'chatbubble-ellipses',
  profileView: 'eye',
  referral: 'megaphone',
};

type NotificationRowProps = {
  notification: AppNotification;
};

export function NotificationRow({ notification }: NotificationRowProps) {
  const theme = useTheme();
  const card = notification.personId ? getDeckCardById(notification.personId) : undefined;

  return (
    <Pressable
      onPress={() => card && router.push(`/profile-detail/${card.id}`)}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: notification.read ? 'transparent' : theme.backgroundElement },
        pressed && { opacity: 0.7 },
      ]}>
      {card ? (
        <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={48} />
      ) : (
        <View style={[styles.iconCircle, { backgroundColor: theme.primary }]}>
          <Ionicons name={ICONS[notification.type]} size={20} color="#FFFFFF" />
        </View>
      )}
      <View style={styles.textArea}>
        <ThemedText type={notification.read ? 'small' : 'smallBold'} numberOfLines={2}>
          {notification.title}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary" numberOfLines={2}>
          {notification.subtitle}
        </ThemedText>
      </View>
      <ThemedText type="caption" themeColor="textTertiary">
        {notification.timestamp}
      </ThemedText>
      {!notification.read && <View style={[styles.dot, { backgroundColor: theme.accent }]} />}
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
    borderRadius: Radius.medium,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    flex: 1,
    gap: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
