import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="role" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="linkedin" />
      <Stack.Screen name="prompts" />
      <Stack.Screen name="preferences" />
    </Stack>
  );
}
