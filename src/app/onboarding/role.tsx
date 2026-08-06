import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingProgress } from '@/components/onboarding-progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';
import { Role } from '@/types';

const OPTIONS: { value: Role; icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[] = [
  {
    value: 'seeker',
    icon: 'briefcase-outline',
    title: 'I’m looking for my next role',
    description: 'Discover recruiters, hiring managers, and senior employees who can refer you in.',
  },
  {
    value: 'recruiter',
    icon: 'people-outline',
    title: 'I can refer, or I’m hiring',
    description: 'Discover candidates open to work and start the conversation first.',
  },
];

export default function RoleScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { setRole } = useAppState();
  const [selected, setSelected] = useState<Role | null>(null);

  function handleContinue() {
    if (!selected) return;
    setRole(selected);
    router.push('/onboarding/basics');
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top + Spacing.three }}>
      <OnboardingProgress step={1} total={5} />
      <View style={styles.content}>
        <ThemedText type="heading" style={styles.title}>
          What brings you here?
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          You can switch anytime from your profile.
        </ThemedText>

        <View style={styles.options}>
          {OPTIONS.map((option) => {
            const active = selected === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelected(option.value)}
                style={[
                  styles.option,
                  {
                    backgroundColor: theme.card,
                    borderColor: active ? theme.primary : theme.border,
                    borderWidth: active ? 2 : StyleSheet.hairlineWidth,
                  },
                ]}>
                <View style={[styles.iconWrap, { backgroundColor: active ? theme.primary : theme.backgroundElement }]}>
                  <Ionicons name={option.icon} size={22} color={active ? '#FFFFFF' : theme.textSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText type="smallBold">{option.title}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.optionDescription}>
                    {option.description}
                  </ThemedText>
                </View>
                {active && <Ionicons name="checkmark-circle" size={22} color={theme.primary} />}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.three }]}>
        <Pressable
          disabled={!selected}
          onPress={handleContinue}
          style={[styles.continueButton, { backgroundColor: theme.primary, opacity: selected ? 1 : 0.5 }]}>
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
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  title: {
    marginTop: Spacing.two,
  },
  subtitle: {
    marginBottom: Spacing.three,
  },
  options: {
    gap: Spacing.three,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.large,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDescription: {
    marginTop: 2,
    lineHeight: 16,
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
