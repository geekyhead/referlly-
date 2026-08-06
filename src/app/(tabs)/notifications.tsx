import { useMemo } from 'react';
import { FlatList } from 'react-native';

import { NotificationRow } from '@/components/notification-row';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { notifications } from '@/data/notifications';
import { recruiterNotifications } from '@/data/recruiter-notifications';
import { useAppState } from '@/state/app-context';

export default function NotificationsScreen() {
  const { role } = useAppState();
  const items = useMemo(() => (role === 'seeker' ? notifications : recruiterNotifications), [role]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader title="Activity" subtitle="Matches, likes & profile views" />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        renderItem={({ item }) => <NotificationRow notification={item} />}
        contentContainerStyle={{ paddingHorizontal: Spacing.two, paddingBottom: Spacing.five }}
      />
    </ThemedView>
  );
}
