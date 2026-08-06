import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { getDeckCardById, getMatchThreadById } from '@/data/people';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const OUTCOME_OPTIONS = ['Moved forward 🎉', 'Still in touch', 'Didn’t work out'];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { dynamicMatches, appendMessage } = useAppState();
  const [draft, setDraft] = useState('');
  const [outcome, setOutcome] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const dynamicMatch = dynamicMatches.find((thread) => thread.id === id);
  const match = dynamicMatch ?? getMatchThreadById(id);
  const card = match ? getDeckCardById(match.personId) : undefined;
  const isLiveMatch = Boolean(dynamicMatch);

  if (!match || !card) {
    return (
      <ThemedView style={styles.notFound}>
        <ThemedText type="default">Conversation not found.</ThemedText>
      </ThemedView>
    );
  }

  const isOlderMatch = match.matchedAt.includes('week');
  const showOutcomeBanner = isOlderMatch && !bannerDismissed;

  function handleSend() {
    if (!draft.trim()) return;
    if (isLiveMatch) {
      appendMessage(id, draft.trim());
    }
    setDraft('');
  }

  function handleReport() {
    Alert.alert(`Block or report ${card!.name}?`, 'This is a demo — no report is actually sent.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Block & Report', style: 'destructive', onPress: () => router.back() },
    ]);
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two, borderColor: theme.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <Pressable style={styles.headerCenter} onPress={() => router.push(`/profile-detail/${card.id}`)}>
          <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={36} />
          <View>
            <ThemedText type="smallBold" numberOfLines={1}>
              {card.name}
            </ThemedText>
            <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
              {card.headline}
            </ThemedText>
          </View>
        </Pressable>
        <Pressable onPress={handleReport} hitSlop={12} style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={22} color={theme.text} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 56}>
        {showOutcomeBanner && (
          <View style={[styles.outcomeBanner, { backgroundColor: theme.backgroundElement }]}>
            {outcome ? (
              <ThemedText type="small" themeColor="textSecondary">
                Thanks for the update — noted “{outcome}.”
              </ThemedText>
            ) : (
              <>
                <View style={styles.outcomeHeaderRow}>
                  <ThemedText type="smallBold" style={{ flex: 1 }}>
                    Any update with {card.name.split(' ')[0]}?
                  </ThemedText>
                  <Pressable onPress={() => setBannerDismissed(true)} hitSlop={8}>
                    <Ionicons name="close" size={16} color={theme.textTertiary} />
                  </Pressable>
                </View>
                <View style={styles.outcomeChipRow}>
                  {OUTCOME_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => setOutcome(option)}
                      style={[styles.outcomeChip, { backgroundColor: theme.card, borderColor: theme.border }]}>
                      <ThemedText type="caption" style={{ fontWeight: '700' }}>
                        {option}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        <FlatList
          data={match.messages}
          keyExtractor={(message) => message.id}
          inverted={false}
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={64} />
              <ThemedText type="smallBold" style={styles.emptyChatTitle}>
                You matched with {card.name.split(' ')[0]}!
              </ThemedText>
              <ThemedText type="default" themeColor="textSecondary" style={styles.emptyChatBody}>
                Send the first message to start the conversation.
              </ThemedText>
            </View>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === 'me';
            return (
              <View style={[styles.bubbleRow, isMe && styles.bubbleRowMe]}>
                <View
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: isMe ? theme.primary : theme.backgroundElement,
                      borderBottomRightRadius: isMe ? 4 : Radius.large,
                      borderBottomLeftRadius: isMe ? Radius.large : 4,
                    },
                  ]}>
                  <ThemedText
                    type="default"
                    style={{ color: isMe ? '#FFFFFF' : theme.text }}>
                    {item.text}
                  </ThemedText>
                </View>
                <ThemedText type="caption" themeColor="textTertiary" style={styles.timestamp}>
                  {item.timestamp}
                </ThemedText>
              </View>
            );
          }}
        />

        <View style={[styles.inputBar, { borderColor: theme.border, paddingBottom: insets.bottom + Spacing.two }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message..."
            placeholderTextColor={theme.textTertiary}
            style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
            multiline
          />
          <Pressable
            style={[styles.sendButton, { backgroundColor: theme.accent, opacity: draft.trim() ? 1 : 0.5 }]}
            disabled={!draft.trim()}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            onPress={handleSend}>
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  backButton: {
    padding: 2,
  },
  moreButton: {
    padding: 2,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  outcomeBanner: {
    margin: Spacing.three,
    marginBottom: 0,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    gap: Spacing.two,
  },
  outcomeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  outcomeChip: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  emptyChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.five,
  },
  emptyChatTitle: {
    marginTop: Spacing.two,
  },
  emptyChatBody: {
    textAlign: 'center',
  },
  bubbleRow: {
    maxWidth: '80%',
    alignItems: 'flex-start',
  },
  bubbleRowMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.large,
  },
  timestamp: {
    marginTop: 4,
    marginHorizontal: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.large,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
