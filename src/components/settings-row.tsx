import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  isLast?: boolean;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (next: boolean) => void;
  destructive?: boolean;
};

export function SettingsRow({
  icon,
  label,
  value,
  isLast,
  onPress,
  switchValue,
  onSwitchChange,
  destructive,
}: SettingsRowProps) {
  const theme = useTheme();
  const isSwitch = switchValue !== undefined;

  return (
    <Pressable
      onPress={isSwitch ? undefined : onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
        pressed && !isSwitch && { backgroundColor: theme.backgroundElement },
      ]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: destructive ? theme.danger + '1F' : theme.backgroundElement },
        ]}>
        <Ionicons name={icon} size={17} color={destructive ? theme.danger : theme.textSecondary} />
      </View>
      <ThemedText
        type="default"
        themeColor={destructive ? 'danger' : 'text'}
        style={styles.label}>
        {label}
      </ThemedText>
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.rightSide}>
          {value && (
            <ThemedText type="small" themeColor="textTertiary">
              {value}
            </ThemedText>
          )}
          <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
