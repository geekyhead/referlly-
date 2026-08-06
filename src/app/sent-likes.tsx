import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { getDeckCardById } from '@/data/people';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

export default function SentLikesScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { sentLikes } = useAppState();

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="heading">Interest Sent</ThemedText>
        <View style={{ width: 26 }} />
      </View>

      {sentLikes.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="checkmark-circle-outline" size={40} color={theme.textTertiary} />
          <ThemedText type="default" themeColor="textSecondary" style={styles.emptyText}>
            Highlight an answer on someone’s profile and it’ll show up here.
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={sentLikes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const card = getDeckCardById(item.personId);
            return (
              <Pressable
                onPress={() => router.push(`/profile-detail/${item.personId}`)}
                style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {card && <Avatar name={card.name} colors={card.avatarColor} photoUrl={card.photoUrl} size={44} />}
                <View style={{ flex: 1, gap: 2 }}>
                  <ThemedText type="smallBold">{item.personName}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">
                    {item.question}
                  </ThemedText>
                  {item.comment.length > 0 && (
                    <ThemedText type="caption" themeColor="textTertiary" style={styles.comment}>
                      “{item.comment}”
                    </ThemedText>
                  )}
                </View>
                <ThemedText type="caption" themeColor="textTertiary">
                  {item.timestamp}
                </ThemedText>
              </Pressable>
            );
          }}
        />
      )}
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    gap: Spacing.three,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  comment: {
    marginTop: 2,
    fontStyle: 'italic',
  },
});
