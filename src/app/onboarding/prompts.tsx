import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

import { OnboardingProgress } from '@/components/onboarding-progress';
import { SelectChip } from '@/components/select-chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { recruiterPromptBank, seekerPromptBank } from '@/data/prompt-bank';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const REQUIRED_PROMPTS = 3;

export default function PromptsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { role, setPrompts } = useAppState();
  const bank = role === 'seeker' ? seekerPromptBank : recruiterPromptBank;

  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function toggle(question: string) {
    setSelected((current) => {
      if (current.includes(question)) return current.filter((item) => item !== question);
      if (current.length >= REQUIRED_PROMPTS) return current;
      return [...current, question];
    });
  }

  const canContinue =
    selected.length === REQUIRED_PROMPTS && selected.every((question) => (answers[question] ?? '').trim().length > 0);

  function handleContinue() {
    setPrompts(selected.map((question) => ({ question, answer: answers[question].trim() })));
    router.push('/onboarding/preferences');
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top + Spacing.three }}>
      <OnboardingProgress step={4} total={5} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="heading">Pick 3 prompts</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          Show a little personality — this is what starts the conversation.
        </ThemedText>

        <View style={styles.chipRow}>
          {bank.map((question) => (
            <SelectChip
              key={question}
              label={question}
              selected={selected.includes(question)}
              onPress={() => toggle(question)}
            />
          ))}
        </View>

        {selected.length > 0 && (
          <Animated.View entering={FadeIn} style={styles.answers}>
            <ThemedText type="label" themeColor="textTertiary">
              Write your answers ({selected.length}/{REQUIRED_PROMPTS})
            </ThemedText>
            {selected.map((question) => (
              <View key={question} style={[styles.answerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <ThemedText type="smallBold">{question}</ThemedText>
                <TextInput
                  value={answers[question] ?? ''}
                  onChangeText={(text) => setAnswers((current) => ({ ...current, [question]: text }))}
                  placeholder="Your answer..."
                  placeholderTextColor={theme.textTertiary}
                  multiline
                  style={[styles.answerInput, { color: theme.text }]}
                />
              </View>
            ))}
          </Animated.View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.three }]}>
        <Pressable
          disabled={!canContinue}
          onPress={handleContinue}
          style={[styles.continueButton, { backgroundColor: theme.primary, opacity: canContinue ? 1 : 0.5 }]}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Continue
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: Spacing.five,
  },
  subtitle: {
    marginBottom: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  answers: {
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  answerCard: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  answerInput: {
    fontSize: 15,
    lineHeight: 21,
    minHeight: 44,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  continueButton: {
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
});
