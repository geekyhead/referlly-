import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

function summarize(items: string[], fallback: string) {
  if (items.length === 0) return fallback;
  if (items.length === 1) return items[0];
  return `${items[0]} +${items.length - 1}`;
}

export function FilterChipBar() {
  const theme = useTheme();
  const { role, filters } = useAppState();

  const chips = [
    summarize(filters.roles, role === 'seeker' ? 'Roles' : 'Hiring for'),
    filters.workMode,
    filters.salary,
    summarize(filters.industries, 'Industry'),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      <Pressable
        onPress={() => router.push('/job-preferences')}
        style={[styles.iconChip, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name="options-outline" size={16} color={theme.text} />
      </Pressable>
      {chips.map((label) => (
        <Pressable
          key={label}
          onPress={() => router.push('/job-preferences')}
          style={[styles.chip, { borderColor: theme.border }]}>
          <ThemedText type="small" style={{ fontWeight: '600' }} numberOfLines={1}>
            {label}
          </ThemedText>
          <Ionicons name="chevron-down" size={13} color={theme.textSecondary} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  row: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  iconChip: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.three,
    height: 34,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
