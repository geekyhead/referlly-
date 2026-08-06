import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { lockedLikeIds, unlockedLikeIds } from '@/data/likes';
import { matches } from '@/data/matches';
import { notifications } from '@/data/notifications';
import { recruiterLockedLikeIds, recruiterUnlockedLikeIds } from '@/data/recruiter-likes';
import { recruiterMatches } from '@/data/recruiter-matches';
import { recruiterNotifications } from '@/data/recruiter-notifications';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

type IconName = keyof typeof Ionicons.glyphMap;

function TabIcon({ name, color, size }: { name: IconName; color: string; size: number }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  const theme = useTheme();
  const { role, myProfile } = useAppState();

  const unreadMessages = useMemo(() => {
    const threads = role === 'seeker' ? matches : recruiterMatches;
    return threads.reduce((sum, match) => sum + match.unreadCount, 0);
  }, [role]);

  const unreadNotifications = useMemo(() => {
    const items = role === 'seeker' ? notifications : recruiterNotifications;
    return items.filter((item) => !item.read).length;
  }, [role]);

  const totalLikes = useMemo(() => {
    const unlocked = role === 'seeker' ? unlockedLikeIds : recruiterUnlockedLikeIds;
    const locked = role === 'seeker' ? lockedLikeIds : recruiterLockedLikeIds;
    return unlocked.length + locked.length;
  }, [role]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 10,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
        },
        tabBarBadgeStyle: {
          backgroundColor: theme.accent,
          fontSize: 10,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarAccessibilityLabel: 'Discover',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'search' : 'search-outline'} color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="standouts"
        options={{
          title: 'Standouts',
          tabBarAccessibilityLabel: 'Standouts',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'sparkles' : 'sparkles-outline'} color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes You',
          tabBarAccessibilityLabel: 'Likes You',
          tabBarBadge: totalLikes > 0 ? totalLikes : undefined,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'bookmark' : 'bookmark-outline'} color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarAccessibilityLabel: 'Matches',
          tabBarBadge: unreadMessages > 0 ? unreadMessages : undefined,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              color={color}
              size={size + 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Activity',
          tabBarAccessibilityLabel: 'Activity',
          tabBarBadge: unreadNotifications > 0 ? unreadNotifications : undefined,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderRadius: 16,
                borderWidth: 2,
                borderColor: focused ? theme.text : 'transparent',
                padding: 1,
              }}>
              <Avatar name={myProfile.name} colors={myProfile.avatarColor} photoUrl={myProfile.photoUrl} size={26} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
