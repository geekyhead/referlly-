import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { OnboardingProgress } from '@/components/onboarding-progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export default function BasicsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { role, myProfile, updateMyProfile } = useAppState();
  const [name, setName] = useState(myProfile.name);
  const [title, setTitle] = useState(myProfile.title);
  const [company, setCompany] = useState(myProfile.company ?? '');
  const [location, setLocation] = useState(myProfile.location);

  const canContinue = name.trim().length > 0 && title.trim().length > 0;

  function handleContinue() {
    updateMyProfile({
      name: name.trim(),
      title: title.trim(),
      company: role === 'recruiter' ? company.trim() : undefined,
      location: location.trim(),
    });
    router.push('/onboarding/linkedin');
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top + Spacing.three }}>
      <OnboardingProgress step={2} total={5} />
      <View style={styles.content}>
        <ThemedText type="heading">The basics</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          This is what {role === 'seeker' ? 'recruiters' : 'candidates'} will see first.
        </ThemedText>

        <View style={styles.avatarRow}>
          <Avatar name={name || '?'} colors={myProfile.avatarColor} photoUrl={myProfile.photoUrl} size={80} />
        </View>

        <Field label="Name" value={name} onChangeText={setName} placeholder="Your name" />
        <Field
          label={role === 'seeker' ? 'Current or target title' : 'Your title'}
          value={title}
          onChangeText={setTitle}
          placeholder={role === 'seeker' ? 'e.g. Product Designer' : 'e.g. Senior Technical Recruiter'}
        />
        {role === 'recruiter' && (
          <Field label="Company" value={company} onChangeText={setCompany} placeholder="e.g. Northwind Labs" />
        )}
        <Field label="Location" value={location} onChangeText={setLocation} placeholder="City, State" />
      </View>

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

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

function Field({ label, value, onChangeText, placeholder }: FieldProps) {
  const theme = useTheme();
  return (
    <View style={styles.field}>
      <ThemedText type="label" themeColor="textTertiary">
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textTertiary}
        style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  subtitle: {
    marginBottom: Spacing.two,
  },
  avatarRow: {
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  field: {
    gap: Spacing.two,
  },
  input: {
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 16,
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
