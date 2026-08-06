import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { CardShadow, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export function ProfileInsights() {
  const theme = useTheme();
  const { role } = useAppState();

  const stats = [
    { icon: 'eye-outline' as const, label: 'Profile views', value: '128' },
    { icon: 'chatbubble-outline' as const, label: 'Response rate', value: '92%' },
    { icon: 'checkmark-circle-outline' as const, label: role === 'seeker' ? 'Interest rate' : 'Reply rate', value: '41%' },
  ];

  return (
    <View style={[styles.card, CardShadow, { backgroundColor: theme.card }]}>
      {stats.map((stat, index) => (
        <View key={stat.label} style={[styles.stat, index < stats.length - 1 && styles.statDivider, { borderColor: theme.border }]}>
          <Ionicons name={stat.icon} size={16} color={theme.textSecondary} />
          <ThemedText type="heading" style={styles.statValue}>
            {stat.value}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            {stat.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: Radius.large,
    marginHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  statValue: {
    marginTop: 2,
  },
});
