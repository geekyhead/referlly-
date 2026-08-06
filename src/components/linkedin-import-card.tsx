import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { linkedInMockData, LinkedInImportData } from '@/data/linkedin-mock';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const LINKEDIN_BLUE = '#0A66C2';

type Status = 'idle' | 'connecting' | 'imported';

type LinkedInImportCardProps = {
  onUse: (data: LinkedInImportData) => void;
  onSkip?: () => void;
};

export function LinkedInImportCard({ onUse, onSkip }: LinkedInImportCardProps) {
  const theme = useTheme();
  const { role } = useAppState();
  const [status, setStatus] = useState<Status>('idle');

  function handleConnect() {
    setStatus('connecting');
    setTimeout(() => setStatus('imported'), 1400);
  }

  const imported = linkedInMockData[role];

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {status === 'idle' && (
        <>
          <View style={styles.headerRow}>
            <View style={[styles.iconWrap, { backgroundColor: LINKEDIN_BLUE }]}>
              <Ionicons name="logo-linkedin" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="smallBold">Import from LinkedIn</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                We’ll pull your title, company, and skills so you don’t have to type it twice.
              </ThemedText>
            </View>
          </View>
          <Pressable
            onPress={handleConnect}
            style={[styles.connectButton, { backgroundColor: LINKEDIN_BLUE }]}>
            <Ionicons name="logo-linkedin" size={16} color="#FFFFFF" />
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              Connect with LinkedIn
            </ThemedText>
          </Pressable>
        </>
      )}

      {status === 'connecting' && (
        <View style={styles.connectingRow}>
          <ActivityIndicator color={LINKEDIN_BLUE} />
          <ThemedText type="default" themeColor="textSecondary">
            Connecting to LinkedIn…
          </ThemedText>
        </View>
      )}

      {status === 'imported' && (
        <>
          <View style={styles.headerRow}>
            <View style={[styles.iconWrap, { backgroundColor: theme.success }]}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="smallBold">Experience verified</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                Here’s what we found — review before adding it to your profile.
              </ThemedText>
            </View>
          </View>

          <View style={[styles.summary, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold">{imported.title}</ThemedText>
            {imported.company && (
              <ThemedText type="caption" themeColor="textSecondary">
                {imported.company}
              </ThemedText>
            )}
            <ThemedText type="caption" themeColor="textSecondary">
              {imported.yearsExperience} years of experience
            </ThemedText>
            <View style={styles.chipRow}>
              {imported.skills.map((skill) => (
                <Pill key={skill} label={skill} />
              ))}
            </View>
          </View>

          <Pressable
            onPress={() => onUse(imported)}
            style={[styles.connectButton, { backgroundColor: theme.primary }]}>
            <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              Use this info
            </ThemedText>
          </Pressable>
        </>
      )}

      {status !== 'connecting' && onSkip && (
        <Pressable onPress={onSkip} hitSlop={8} style={styles.skipButton}>
          <ThemedText type="small" themeColor="textSecondary">
            Skip for now
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
  },
  connectingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  summary: {
    borderRadius: Radius.medium,
    padding: Spacing.three,
    gap: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
});
