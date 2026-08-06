import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
};

export function ScreenHeader({ title, subtitle, rightIcon, onRightPress }: ScreenHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <ThemedText type="title">{title}</ThemedText>
        {subtitle && (
          <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
            {subtitle}
          </ThemedText>
        )}
      </View>
      {rightIcon && (
        <Pressable
          onPress={onRightPress}
          hitSlop={12}
          style={[styles.iconButton, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name={rightIcon} size={20} color={theme.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  subtitle: {
    marginTop: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
