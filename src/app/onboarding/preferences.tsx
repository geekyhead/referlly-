import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingProgress } from '@/components/onboarding-progress';
import { SelectChip } from '@/components/select-chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const SEEKER_ROLE_OPTIONS = [
  'Product Design',
  'UX Research',
  'Frontend Engineering',
  'Backend Engineering',
  'Data Science',
  'Sales',
  'Marketing',
];
const RECRUITER_ROLE_OPTIONS = [
  'Frontend Engineering',
  'Backend Engineering',
  'Product Design',
  'Product Management',
  'Sales',
  'Data Science',
  'Marketing',
];
const DISTANCES = ['5 mi', '10 mi', '25 mi', '50 mi', '100 mi'];

export default function PreferencesScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { role, updateFilters, completeOnboarding } = useAppState();
  const roleOptions = role === 'seeker' ? SEEKER_ROLE_OPTIONS : RECRUITER_ROLE_OPTIONS;

  const [roles, setRoles] = useState<string[]>(roleOptions.slice(0, 2));
  const [distance, setDistance] = useState('25 mi');
  const [notifications, setNotifications] = useState(true);

  function toggleRole(option: string) {
    setRoles((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  function handleFinish() {
    updateFilters({ roles, distance });
    completeOnboarding();
    router.replace('/(tabs)');
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top + Spacing.three }}>
      <OnboardingProgress step={5} total={5} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="heading">Almost there</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          {role === 'seeker' ? 'What roles are you open to?' : 'What roles are you hiring or referring for?'}
        </ThemedText>
        <View style={styles.chipRow}>
          {roleOptions.map((option) => (
            <SelectChip key={option} label={option} selected={roles.includes(option)} onPress={() => toggleRole(option)} />
          ))}
        </View>

        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          Maximum distance
        </ThemedText>
        <View style={styles.chipRow}>
          {DISTANCES.map((item) => (
            <SelectChip key={item} label={item} selected={distance === item} onPress={() => setDistance(item)} />
          ))}
        </View>

        <Pressable
          onPress={() => setNotifications((current) => !current)}
          style={[styles.notifCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.notifIcon, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="notifications-outline" size={20} color={theme.textSecondary} />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText type="smallBold">Turn on notifications</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              Know right away about new matches and messages
            </ThemedText>
          </View>
          <Ionicons
            name={notifications ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={notifications ? theme.success : theme.textTertiary}
          />
        </Pressable>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.three }]}>
        <Pressable onPress={handleFinish} style={[styles.continueButton, { backgroundColor: theme.primary }]}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Finish
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
    marginTop: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.large,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.three,
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
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
