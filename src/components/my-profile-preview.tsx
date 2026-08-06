import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { HeroBackground } from '@/components/hero-background';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { CardShadow, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export function MyProfilePreview() {
  const theme = useTheme();
  const { role, myProfile, linkedinVerified } = useAppState();

  const subline =
    role === 'recruiter' && myProfile.company
      ? `${myProfile.company} · ${myProfile.location}`
      : `${myProfile.location} · ${myProfile.workMode}`;

  return (
    <Pressable
      onPress={() => router.push('/edit-profile')}
      style={[styles.card, CardShadow, { backgroundColor: theme.card }]}>
      <HeroBackground photoUrl={myProfile.photoUrl} colors={myProfile.avatarColor} style={styles.hero}>
        <View style={[styles.editBadge, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
          <Ionicons name="pencil" size={14} color="#FFFFFF" />
          <ThemedText type="caption" style={{ color: '#FFFFFF', fontWeight: '700' }}>
            Edit
          </ThemedText>
        </View>
        <View>
          <View style={styles.nameRow}>
            <ThemedText type="title" style={styles.heroText}>
              {myProfile.name}, {myProfile.age}
            </ThemedText>
            {linkedinVerified && (
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
            )}
          </View>
          <ThemedText type="subtitle" style={styles.heroText}>
            {myProfile.title}
          </ThemedText>
          <ThemedText type="default" style={[styles.heroText, { opacity: 0.9 }]}>
            {subline}
          </ThemedText>
        </View>
      </HeroBackground>

      <View style={styles.body}>
        <ThemedText type="label" themeColor="textTertiary">
          {role === 'seeker' ? 'Open to' : 'Hiring for'}
        </ThemedText>
        <View style={styles.tagRow}>
          {myProfile.openTo.map((item) => (
            <Pill key={item} label={item} variant="accent" />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xlarge,
    overflow: 'hidden',
    marginHorizontal: Spacing.four,
  },
  hero: {
    padding: Spacing.four,
    justifyContent: 'space-between',
    minHeight: 180,
  },
  editBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    paddingHorizontal: Spacing.two,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroText: {
    color: '#FFFFFF',
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
