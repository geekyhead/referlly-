import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Prompt } from '@/types';

type LikeCommentSheetProps = {
  visible: boolean;
  personName: string;
  prompt: Prompt | null;
  onClose: () => void;
  onSend: (comment: string) => void;
};

export function LikeCommentSheet({ visible, personName, prompt, onClose, onSend }: LikeCommentSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [comment, setComment] = useState('');

  function handleSend() {
    onSend(comment.trim());
    setComment('');
  }

  function handleClose() {
    setComment('');
    onClose();
  }

  if (!prompt) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sheetWrap}
        pointerEvents="box-none">
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.card, paddingBottom: insets.bottom + Spacing.three },
          ]}>
          <View style={[styles.grabber, { backgroundColor: theme.border }]} />

          <View style={styles.headerRow}>
            <Ionicons name="checkmark-circle" size={20} color={theme.accent} />
            <ThemedText type="smallBold">Highlight {personName}’s answer</ThemedText>
          </View>

          <View style={[styles.quoteCard, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="label" themeColor="textTertiary">
              {prompt.question}
            </ThemedText>
            <ThemedText type="default" style={styles.quoteAnswer}>
              {prompt.answer}
            </ThemedText>
          </View>

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment (optional)…"
            placeholderTextColor={theme.textTertiary}
            multiline
            style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          />

          <Pressable
            onPress={handleSend}
            style={[styles.sendButton, { backgroundColor: theme.accent }]}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              Send Interest
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetWrap: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: Radius.xlarge,
    borderTopRightRadius: Radius.xlarge,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.one,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  quoteCard: {
    borderRadius: Radius.medium,
    padding: Spacing.three,
    gap: 4,
  },
  quoteAnswer: {
    lineHeight: 21,
  },
  input: {
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    minHeight: 70,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
  },
});
