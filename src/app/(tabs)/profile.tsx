import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MyProfilePreview } from '@/components/my-profile-preview';
import { ProfileInsights } from '@/components/profile-insights';
import { RoleSwitch } from '@/components/role-switch';
import { ScreenHeader } from '@/components/screen-header';
import { SettingsRow } from '@/components/settings-row';
import { SettingsSection } from '@/components/settings-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

function goToDetail(key: string, title: string) {
  router.push({ pathname: '/settings-detail/[key]', params: { key, title } });
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { role, filters, sentLikes, isPremium, restartOnboarding } = useAppState();
  const [pausedProfile, setPausedProfile] = useState(false);
  const [incognito, setIncognito] = useState(false);
  const [notifyMatches, setNotifyMatches] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyLikes, setNotifyLikes] = useState(true);
  const [notifyTips, setNotifyTips] = useState(false);

  function handleIncognitoToggle(next: boolean) {
    if (next && !isPremium) {
      router.push('/premium');
      return;
    }
    setIncognito(next);
  }

  function handleRestartOnboarding() {
    restartOnboarding();
    router.replace('/onboarding/welcome');
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MyProfilePreview />
        <ProfileInsights />

        <View style={styles.rolePicker}>
          <ThemedText type="label" themeColor="textTertiary" style={styles.roleLabel}>
            Browsing as
          </ThemedText>
          <RoleSwitch />
        </View>

        {!isPremium && (
          <Pressable
            style={[styles.premiumBanner, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/premium')}>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                Get Referly+
              </ThemedText>
              <ThemedText type="caption" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                Unlimited interest, advanced filters & more
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
          </Pressable>
        )}

        <SettingsSection title={role === 'seeker' ? 'Job Preferences' : 'Hiring Preferences'}>
          <SettingsRow
            icon="briefcase-outline"
            label={role === 'seeker' ? 'Desired roles' : 'Roles hiring for'}
            value={summarizeList(filters.roles)}
            onPress={() => router.push('/job-preferences')}
          />
          <SettingsRow
            icon="home-outline"
            label={role === 'seeker' ? 'Work mode you want' : 'Work mode offered'}
            value={filters.workMode}
            onPress={() => router.push('/job-preferences')}
          />
          <SettingsRow
            icon="navigate-outline"
            label="Maximum distance"
            value={filters.distance}
            onPress={() => router.push('/job-preferences')}
          />
          <SettingsRow
            icon="cash-outline"
            label={role === 'seeker' ? 'Salary expectations' : 'Budget range'}
            value={filters.salary}
            isLast
            onPress={() => router.push('/job-preferences')}
          />
        </SettingsSection>

        <SettingsSection title="Discovery">
          <SettingsRow
            icon="eye-outline"
            label="Show me to"
            value={role === 'seeker' ? 'Recruiters & Referrers' : 'Job Seekers'}
            onPress={() => goToDetail('show-me-to', 'Show me to')}
          />
          <SettingsRow
            icon="pause-circle-outline"
            label="Pause my profile"
            switchValue={pausedProfile}
            onSwitchChange={setPausedProfile}
          />
          <SettingsRow
            icon="glasses-outline"
            label="Incognito mode"
            value={!isPremium ? 'Referly+' : undefined}
            switchValue={incognito}
            onSwitchChange={handleIncognitoToggle}
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsRow icon="person-outline" label="Edit profile" onPress={() => router.push('/edit-profile')} />
          <SettingsRow
            icon="checkmark-circle-outline"
            label="Interest sent"
            value={sentLikes.length > 0 ? String(sentLikes.length) : undefined}
            onPress={() => router.push('/sent-likes')}
          />
          <SettingsRow
            icon="document-attach-outline"
            label="Resume & portfolio"
            onPress={() => goToDetail('resume', 'Resume & Portfolio')}
          />
          <SettingsRow
            icon="call-outline"
            label="Contact info"
            onPress={() => goToDetail('contact-info', 'Contact Info')}
          />
          <SettingsRow
            icon="link-outline"
            label="Linked accounts"
            onPress={() => goToDetail('linked-accounts', 'Linked Accounts')}
          />
          <SettingsRow
            icon="refresh-outline"
            label="Restart onboarding"
            isLast
            onPress={handleRestartOnboarding}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsRow icon="sparkles-outline" label="New matches" switchValue={notifyMatches} onSwitchChange={setNotifyMatches} />
          <SettingsRow icon="chatbubble-outline" label="Messages" switchValue={notifyMessages} onSwitchChange={setNotifyMessages} />
          <SettingsRow icon="bookmark-outline" label="New interest" switchValue={notifyLikes} onSwitchChange={setNotifyLikes} />
          <SettingsRow icon="megaphone-outline" label="Referral tips" switchValue={notifyTips} onSwitchChange={setNotifyTips} isLast />
        </SettingsSection>

        <SettingsSection title="Safety & Support">
          <SettingsRow icon="shield-checkmark-outline" label="Get verified" onPress={() => goToDetail('verification', 'Get Verified')} />
          <SettingsRow icon="hand-left-outline" label="Safety Center" onPress={() => goToDetail('safety', 'Safety Center')} />
          <SettingsRow icon="help-buoy-outline" label="Help Center" onPress={() => goToDetail('help-center', 'Help Center')} />
          <SettingsRow icon="document-text-outline" label="Terms of service" onPress={() => goToDetail('terms', 'Terms of Service')} />
          <SettingsRow icon="lock-closed-outline" label="Privacy policy" isLast onPress={() => goToDetail('privacy', 'Privacy Policy')} />
        </SettingsSection>

        <SettingsSection title="">
          <SettingsRow icon="log-out-outline" label="Log out" destructive onPress={() => goToDetail('log-out', 'Log Out')} />
          <SettingsRow icon="trash-outline" label="Delete account" destructive isLast onPress={() => goToDetail('delete-account', 'Delete Account')} />
        </SettingsSection>
      </ScrollView>
    </ThemedView>
  );
}

function summarizeList(items: string[]) {
  if (items.length === 0) return 'None selected';
  if (items.length === 1) return items[0];
  return `${items[0]} +${items.length - 1}`;
}

const styles = StyleSheet.create({
  content: {
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  rolePicker: {
    marginTop: -Spacing.two,
  },
  roleLabel: {
    marginBottom: Spacing.two,
    marginLeft: Spacing.four + 2,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginHorizontal: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radius.medium,
  },
});
