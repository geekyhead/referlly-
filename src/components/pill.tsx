import { StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PillVariant = 'neutral' | 'success' | 'accent' | 'outline';

type PillProps = {
  label: string;
  variant?: PillVariant;
  style?: ViewStyle;
};

export function Pill({ label, variant = 'neutral', style }: PillProps) {
  const theme = useTheme();

  const backgroundColor = {
    neutral: theme.backgroundElement,
    success: theme.success + '1F',
    accent: theme.accent + '1F',
    outline: 'transparent',
  }[variant];

  const textColor = {
    neutral: theme.textSecondary,
    success: theme.success,
    accent: theme.accent,
    outline: theme.textSecondary,
  }[variant];

  const borderColor = variant === 'outline' ? theme.border : 'transparent';

  return (
    <View style={[styles.pill, { backgroundColor, borderColor }, style]}>
      <ThemedText type="caption" style={{ color: textColor, fontWeight: '700' }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
});
