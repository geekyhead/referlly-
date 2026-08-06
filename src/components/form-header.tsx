import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function FormHeader({ title, actionLabel = 'Save', onAction }: FormHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + Spacing.two, borderColor: theme.border }]}>
      <Pressable onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="close" size={24} color={theme.text} />
      </Pressable>
      <ThemedText type="heading">{title}</ThemedText>
      <Pressable onPress={onAction ?? (() => router.back())} hitSlop={12}>
        <ThemedText type="smallBold" themeColor="accent">
          {actionLabel}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
