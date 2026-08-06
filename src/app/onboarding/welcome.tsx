import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export default function WelcomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAppState();

  function handleLogIn() {
    completeOnboarding();
    router.replace('/(tabs)');
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient
        colors={['#1A1A1A', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + Spacing.six }]}>
        <View style={[styles.logoMark, { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
          <Ionicons name="briefcase" size={34} color="#FFFFFF" />
        </View>
        <ThemedText type="title" style={styles.wordmark}>
          Referly
        </ThemedText>
        <ThemedText type="subtitle" style={styles.tagline}>
          Job search, but make it human.
        </ThemedText>
      </LinearGradient>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <ThemedText type="default" themeColor="textSecondary" style={styles.blurb}>
          Swipe to meet recruiters, hiring managers, and senior employees who can refer you — or
          candidates ready for their next role. Match, message, and skip the cold application.
        </ThemedText>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={() => router.push('/onboarding/role')}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Get Started
          </ThemedText>
        </Pressable>

        <Pressable hitSlop={8} onPress={handleLogIn} style={styles.skipButton}>
          <ThemedText type="small" themeColor="textSecondary">
            Already have an account? <ThemedText type="smallBold" themeColor="accent">Log in</ThemedText>
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.five,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: Radius.xlarge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  wordmark: {
    color: '#FFFFFF',
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  footer: {
    padding: Spacing.five,
    gap: Spacing.three,
  },
  blurb: {
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: Spacing.two,
  },
  primaryButton: {
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
});
