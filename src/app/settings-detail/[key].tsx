import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsDetailScreen() {
  const { title } = useLocalSearchParams<{ key: string; title?: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="heading">{title ?? 'Settings'}</ThemedText>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.body}>
        <View style={[styles.iconCircle, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="construct-outline" size={28} color={theme.textSecondary} />
        </View>
        <ThemedText type="subtitle" style={styles.text}>
          {title}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.text}>
          This is a placeholder screen. There’s no live functionality behind it yet — it’s here to show
          where this setting will live.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    gap: Spacing.three,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  text: {
    textAlign: 'center',
  },
});
