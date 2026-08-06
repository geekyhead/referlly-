import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const PERKS = [
  { icon: 'eye-outline', label: 'See everyone who’s interested' },
  { icon: 'infinite-outline', label: 'Unlimited interest & Spotlights' },
  { icon: 'options-outline', label: 'Advanced filters — seniority, industry, company size' },
  { icon: 'glasses-outline', label: 'Browse in incognito mode' },
  { icon: 'trending-up-outline', label: 'Priority placement in Discover' },
] as const;

const PLANS = [
  { id: 'm1', label: '1 month', price: '$19.99', perMonth: '$19.99/mo' },
  { id: 'm3', label: '3 months', price: '$39.99', perMonth: '$13.33/mo', tag: 'Most Popular' },
  { id: 'm6', label: '6 months', price: '$59.99', perMonth: '$9.99/mo', tag: 'Best Value' },
];

export default function PremiumScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isNarrow = width < 380;
  const { isPremium, setPremium } = useAppState();
  const [selectedPlan, setSelectedPlan] = useState('m3');

  function handleContinue() {
    setPremium(true);
    router.back();
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <LinearGradient
          colors={['#1A1A1A', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + Spacing.three }]}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.closeButton}>
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </Pressable>
          <Ionicons name="sparkles" size={30} color="#FFFFFF" />
          <ThemedText type="title" style={styles.heroText}>
            Referly+
          </ThemedText>
          <ThemedText type="default" style={[styles.heroText, { opacity: 0.85 }]}>
            {isPremium ? 'You’re already Referly+. Thank you!' : 'Get seen first. Get referred faster.'}
          </ThemedText>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.perks}>
            {PERKS.map((perk) => (
              <View key={perk.label} style={styles.perkRow}>
                <View style={[styles.perkIcon, { backgroundColor: theme.backgroundElement }]}>
                  <Ionicons name={perk.icon} size={18} color={theme.primary} />
                </View>
                <ThemedText type="default" style={{ flex: 1 }}>
                  {perk.label}
                </ThemedText>
                <Ionicons name="checkmark" size={18} color={theme.success} />
              </View>
            ))}
          </View>

          {!isPremium && (
            <View style={[styles.plans, isNarrow && styles.plansNarrow]}>
              {PLANS.map((plan) => {
                const active = plan.id === selectedPlan;
                return (
                  <Pressable
                    key={plan.id}
                    onPress={() => setSelectedPlan(plan.id)}
                    style={[
                      styles.plan,
                      plan.tag ? styles.planWithTag : null,
                      isNarrow && styles.planNarrow,
                      {
                        backgroundColor: theme.card,
                        borderColor: active ? theme.primary : theme.border,
                        borderWidth: active ? 2 : StyleSheet.hairlineWidth,
                      },
                    ]}>
                    {plan.tag && (
                      <View style={styles.planTagRow} pointerEvents="none">
                        <View style={[styles.planTag, { backgroundColor: theme.accent }]}>
                          <ThemedText
                            type="caption"
                            numberOfLines={1}
                            style={[styles.planTagText, isNarrow && styles.planTagTextNarrow]}>
                            {plan.tag}
                          </ThemedText>
                        </View>
                      </View>
                    )}
                    <ThemedText type="smallBold" numberOfLines={1}>
                      {plan.label}
                    </ThemedText>
                    <ThemedText
                      type={isNarrow ? 'subtitle' : 'heading'}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.75}>
                      {plan.price}
                    </ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
                      {plan.perMonth}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.three, borderColor: theme.border }]}>
        {!isPremium && (
          <ThemedText type="caption" themeColor="textTertiary" style={styles.disclaimer}>
            This is a demo — no real purchase will be made.
          </ThemedText>
        )}
        <Pressable
          onPress={isPremium ? () => router.back() : handleContinue}
          style={[styles.continueButton, { backgroundColor: theme.primary }]}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            {isPremium ? 'Done' : 'Continue'}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.four,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  heroText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  perks: {
    gap: Spacing.three,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  perkIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plans: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  plansNarrow: {
    gap: Spacing.one,
  },
  plan: {
    flex: 1,
    minWidth: 0,
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.two,
    paddingBottom: Spacing.three,
    paddingTop: Spacing.three,
    gap: 2,
    alignItems: 'center',
  },
  planWithTag: {
    paddingTop: Spacing.five,
  },
  planNarrow: {
    paddingHorizontal: Spacing.one,
  },
  planTagRow: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  planTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    maxWidth: '92%',
  },
  planTagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  planTagTextNarrow: {
    fontSize: 9,
  },
  footer: {
    padding: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  disclaimer: {
    textAlign: 'center',
  },
  continueButton: {
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
});
