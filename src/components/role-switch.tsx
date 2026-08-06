import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';
import { Role } from '@/types';

const OPTIONS: { label: string; value: Role }[] = [
  { label: 'Job Seeker', value: 'seeker' },
  { label: 'Recruiter', value: 'recruiter' },
];

export function RoleSwitch() {
  const theme = useTheme();
  const { role, setRole } = useAppState();

  return (
    <View style={[styles.track, { backgroundColor: theme.backgroundElement }]}>
      {OPTIONS.map((option) => {
        const active = option.value === role;
        return (
          <Pressable
            key={option.value}
            onPress={() => setRole(option.value)}
            style={[styles.segment, active && { backgroundColor: theme.primary }]}>
            <ThemedText
              type="caption"
              style={{ color: active ? '#FFFFFF' : theme.textSecondary, fontWeight: '700' }}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: Radius.pill,
    padding: 3,
    alignSelf: 'flex-start',
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.three,
  },
  segment: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
});
