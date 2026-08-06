import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useAppState } from '@/state/app-context';
import { DeckCard } from '@/types';

type MatchCelebrationModalProps = {
  visible: boolean;
  card: DeckCard | null;
  matchId: string | null;
  onClose: () => void;
};

export function MatchCelebrationModal({ visible, card, matchId, onClose }: MatchCelebrationModalProps) {
  const { myProfile } = useAppState();

  if (!card) return null;

  function handleMessage() {
    onClose();
    if (matchId) router.push(`/chat/${matchId}`);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <LinearGradient colors={['#1A1A1A', '#000000']} style={styles.backdrop}>
        <ThemedText type="title" style={styles.title}>
          You’re Connected
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          You and {card.name.split(' ')[0]} are both interested — start the conversation.
        </ThemedText>

        <View style={styles.avatarRow}>
          <Avatar name={myProfile.name} colors={myProfile.avatarColor} photoUrl={myProfile.photoUrl} size={96} />
          <View style={styles.connector}>
            <Ionicons name="checkmark" size={18} color="#000000" />
          </View>
          <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={96} />
        </View>

        <Pressable style={styles.messageButton} onPress={handleMessage}>
          <ThemedText type="smallBold" style={{ color: '#000000' }}>
            Send a message
          </ThemedText>
        </Pressable>
        <Pressable style={styles.keepBrowsing} onPress={onClose} hitSlop={12}>
          <ThemedText type="default" style={styles.keepBrowsingText}>
            Keep browsing
          </ThemedText>
        </Pressable>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.six,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.six,
  },
  connector: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.six,
    borderRadius: Radius.pill,
    marginBottom: Spacing.three,
  },
  keepBrowsing: {
    paddingVertical: Spacing.two,
  },
  keepBrowsingText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
