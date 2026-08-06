import { router } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinkedInImportCard } from '@/components/linkedin-import-card';
import { OnboardingProgress } from '@/components/onboarding-progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { LinkedInImportData } from '@/data/linkedin-mock';
import { useAppState } from '@/state/app-context';

export default function LinkedInScreen() {
  const insets = useSafeAreaInsets();
  const { updateMyProfile, setLinkedinVerified } = useAppState();

  function handleUse(data: LinkedInImportData) {
    updateMyProfile({
      title: data.title,
      company: data.company,
      yearsExperience: data.yearsExperience,
      skills: data.skills,
      bio: data.bio,
    });
    setLinkedinVerified(true);
    router.push('/onboarding/prompts');
  }

  function handleSkip() {
    router.push('/onboarding/prompts');
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top + Spacing.three }}>
      <OnboardingProgress step={3} total={5} />
      <View style={{ paddingHorizontal: Spacing.four, gap: Spacing.two, marginBottom: Spacing.four }}>
        <ThemedText type="heading">Verify your experience</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Connect LinkedIn to import your experience — verified profiles get more responses.
        </ThemedText>
      </View>

      <View style={{ paddingHorizontal: Spacing.four }}>
        <LinkedInImportCard onUse={handleUse} onSkip={handleSkip} />
      </View>
    </ThemedView>
  );
}
