import { router } from 'expo-router';
import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { FormHeader } from '@/components/form-header';
import { SelectChip } from '@/components/select-chip';
import { SettingsRow } from '@/components/settings-row';
import { SettingsSection } from '@/components/settings-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAppState } from '@/state/app-context';

const SEEKER_ROLE_OPTIONS = [
  'Product Design',
  'UX Research',
  'Design Systems',
  'Frontend Engineering',
  'Backend Engineering',
  'Product Management',
  'Data Science',
];
const RECRUITER_ROLE_OPTIONS = [
  'Frontend Engineering',
  'Backend Engineering',
  'Product Design',
  'Product Management',
  'Data Science',
  'Sales',
  'Marketing',
];
const WORK_MODES = ['Remote', 'Hybrid', 'Onsite'];
const DISTANCES = ['5 mi', '10 mi', '25 mi', '50 mi', '100 mi'];
const SALARY_BANDS = ['$60k – $80k', '$80k – $100k', '$100k – $120k', '$120k – $150k', '$150k+'];
const SENIORITY_LEVELS = ['Entry', 'Mid-level', 'Senior', 'Lead', 'Executive'];
const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'];
const COMPANY_SIZES = ['Startup (1–50)', 'Mid-size (50–500)', 'Enterprise (500+)'];

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="label" themeColor="textTertiary" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <View style={styles.chipRow}>{children}</View>
    </View>
  );
}

export default function JobPreferencesScreen() {
  const { role, filters, updateFilters } = useAppState();
  const roleOptions = role === 'seeker' ? SEEKER_ROLE_OPTIONS : RECRUITER_ROLE_OPTIONS;

  function toggleListValue(key: 'roles' | 'seniority' | 'industries', value: string) {
    const current = filters[key];
    updateFilters({
      [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    });
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <FormHeader title={role === 'seeker' ? 'Job Preferences' : 'Hiring Preferences'} onAction={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <FormSection title={role === 'seeker' ? 'Desired roles' : 'Roles hiring for'}>
          {roleOptions.map((option) => (
            <SelectChip
              key={option}
              label={option}
              selected={filters.roles.includes(option)}
              onPress={() => toggleListValue('roles', option)}
            />
          ))}
        </FormSection>

        <FormSection title={role === 'seeker' ? 'Seniority you’re targeting' : 'Candidate seniority'}>
          {SENIORITY_LEVELS.map((level) => (
            <SelectChip
              key={level}
              label={level}
              selected={filters.seniority.includes(level)}
              onPress={() => toggleListValue('seniority', level)}
            />
          ))}
        </FormSection>

        <FormSection title={role === 'seeker' ? 'Work mode you want' : 'Work mode offered'}>
          {WORK_MODES.map((mode) => (
            <SelectChip key={mode} label={mode} selected={filters.workMode === mode} onPress={() => updateFilters({ workMode: mode })} />
          ))}
        </FormSection>

        <FormSection title="Maximum distance">
          {DISTANCES.map((item) => (
            <SelectChip key={item} label={item} selected={filters.distance === item} onPress={() => updateFilters({ distance: item })} />
          ))}
        </FormSection>

        <FormSection title={role === 'seeker' ? 'Salary expectations' : 'Budget range'}>
          {SALARY_BANDS.map((band) => (
            <SelectChip key={band} label={band} selected={filters.salary === band} onPress={() => updateFilters({ salary: band })} />
          ))}
        </FormSection>

        <FormSection title={role === 'seeker' ? 'Industries you’re interested in' : 'Industries you hire for'}>
          {INDUSTRIES.map((industry) => (
            <SelectChip
              key={industry}
              label={industry}
              selected={filters.industries.includes(industry)}
              onPress={() => toggleListValue('industries', industry)}
            />
          ))}
        </FormSection>

        <FormSection title={role === 'seeker' ? 'Company size preference' : 'Your team size'}>
          {COMPANY_SIZES.map((size) => (
            <SelectChip key={size} label={size} selected={filters.companySize === size} onPress={() => updateFilters({ companySize: size })} />
          ))}
        </FormSection>

        <SettingsSection title="More filters">
          <SettingsRow
            icon="shield-checkmark-outline"
            label={role === 'seeker' ? 'Verified recruiters only' : 'Verified candidates only'}
            switchValue={filters.verifiedOnly}
            onSwitchChange={(value) => updateFilters({ verifiedOnly: value })}
          />
          <SettingsRow
            icon="flash-outline"
            label={role === 'seeker' ? 'Actively hiring only' : 'Actively job-seeking only'}
            switchValue={filters.activelyHiringOnly}
            onSwitchChange={(value) => updateFilters({ activelyHiringOnly: value })}
            isLast
          />
        </SettingsSection>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    gap: Spacing.five,
    paddingBottom: Spacing.six,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    marginLeft: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
