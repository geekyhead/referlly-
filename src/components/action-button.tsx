import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { CardShadow, Radius } from '@/constants/theme';

type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  backgroundColor: string;
  size?: number;
  iconSize?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function ActionButton({
  icon,
  color,
  backgroundColor,
  size = 56,
  iconSize = 26,
  onPress,
  accessibilityLabel,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.button,
        CardShadow,
        {
          width: size,
          height: size,
          borderRadius: Radius.pill,
          backgroundColor,
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
      ]}>
      <Ionicons name={icon} size={iconSize} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
