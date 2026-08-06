import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { HeroBackground } from '@/components/hero-background';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { CardShadow, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { DeckCard as DeckCardData } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const TAP_SLOP = 10;

export type SwipeCardHandle = {
  swipeLeft: () => void;
  swipeRight: () => void;
  swipeUp: () => void;
};

type SwipeCardProps = {
  card: DeckCardData;
  stackIndex: number;
  isTop: boolean;
  onSwiped: (direction: 'left' | 'right' | 'up') => void;
  onPress: () => void;
};

export const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(function SwipeCard(
  { card, stackIndex, isTop, onSwiped, onPress },
  ref,
) {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const fling = (direction: 'left' | 'right' | 'up') => {
    const target =
      direction === 'left'
        ? -SCREEN_WIDTH * 1.5
        : direction === 'right'
          ? SCREEN_WIDTH * 1.5
          : 0;
    const targetY = direction === 'up' ? -SCREEN_WIDTH * 1.5 : translateY.value + (direction === 'left' ? -40 : 40);

    translateX.value = withTiming(target, { duration: 260 });
    translateY.value = withTiming(targetY, { duration: 260 }, (finished) => {
      if (finished) {
        runOnJS(onSwiped)(direction);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    swipeLeft: () => fling('left'),
    swipeRight: () => fling('right'),
    swipeUp: () => fling('up'),
  }));

  const pan = Gesture.Pan()
    .enabled(isTop)
    .minDistance(0)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const isTap = Math.abs(event.translationX) < TAP_SLOP && Math.abs(event.translationY) < TAP_SLOP;
      if (isTap) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(onPress)();
        return;
      }

      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 260 }, (finished) => {
          if (finished) runOnJS(onSwiped)('right');
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 260 }, (finished) => {
          if (finished) runOnJS(onSwiped)('left');
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-12, 0, 12]);
    const stackScale = 1 - stackIndex * 0.04;
    const stackTranslateY = stackIndex * -14;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + stackTranslateY },
        { rotate: `${rotate}deg` },
        { scale: isTop ? 1 : stackScale },
      ],
    };
  });

  const interestedStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  const passStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]),
  }));

  const content = (
    <View style={[styles.card, CardShadow, { backgroundColor: theme.card, zIndex: -stackIndex }]}>
      <HeroBackground photoUrl={card.photoUrl} colors={card.avatarColor} style={styles.hero}>
        <Animated.View style={[styles.stamp, { borderColor: theme.overlayLike }, interestedStampStyle]}>
          <ThemedText type="heading" style={[styles.stampText, { color: theme.overlayLike }]}>
            INTERESTED
          </ThemedText>
        </Animated.View>
        <Animated.View style={[styles.stamp, styles.nopeStamp, { borderColor: theme.overlayNope }, passStampStyle]}>
          <ThemedText type="heading" style={[styles.stampText, { color: theme.overlayNope }]}>
            PASS
          </ThemedText>
        </Animated.View>

        <View style={styles.heroTopRow}>
          <View style={styles.heroTopLeft}>
            {card.matchScore && (
              <View style={[styles.matchScorePill, { backgroundColor: theme.accent }]}>
                <ThemedText type="caption" style={styles.matchScoreText}>
                  {card.matchScore}% Match
                </ThemedText>
              </View>
            )}
            {card.isNew && <Pill label="New here" variant="outline" style={styles.companyTag} />}
          </View>
          {card.badge && <Pill label={card.badge} variant="success" />}
        </View>

        <Pressable
          onPress={() => fling('right')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Mark interested"
          style={styles.cornerCheck}>
          <Ionicons name="checkmark" size={26} color="#FFFFFF" />
        </Pressable>

        <View style={styles.heroBottom}>
          <View style={styles.nameRow}>
            <ThemedText type="title" style={styles.heroText}>
              {card.name}, {card.age}
            </ThemedText>
            {card.verified && (
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" style={{ marginLeft: 6 }} />
            )}
          </View>
          <ThemedText type="subtitle" style={styles.heroText}>
            {card.headline}
          </ThemedText>
          <ThemedText type="default" style={[styles.heroText, { opacity: 0.9 }]}>
            {card.tag} · {card.subline}
          </ThemedText>
        </View>
      </HeroBackground>

      <View style={styles.body}>
        <ThemedText type="label" themeColor="textTertiary">
          {card.tagsLabel}
        </ThemedText>
        <View style={styles.tagRow}>
          {card.tags.map((tag) => (
            <Pill key={tag} label={tag} variant="outline" style={styles.tag} />
          ))}
        </View>
      </View>
    </View>
  );

  if (!isTop) {
    return (
      <Animated.View style={[styles.cardWrapper, cardStyle]} pointerEvents="none">
        {content}
      </Animated.View>
    );
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.cardWrapper, cardStyle]}>{content}</Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
    borderRadius: Radius.xlarge,
    overflow: 'hidden',
  },
  hero: {
    height: '78%',
    padding: Spacing.four,
    justifyContent: 'space-between',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTopLeft: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  matchScorePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  companyTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'transparent',
  },
  cornerCheck: {
    position: 'absolute',
    bottom: Spacing.four,
    right: Spacing.four,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    zIndex: 20,
    elevation: 20,
    ...CardShadow,
  },
  heroBottom: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroText: {
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
    padding: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.two,
    justifyContent: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tag: {
    marginRight: 0,
  },
  stamp: {
    position: 'absolute',
    top: Spacing.five,
    left: Spacing.four,
    borderWidth: 3,
    borderRadius: Radius.small,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    zIndex: 10,
  },
  nopeStamp: {
    left: undefined,
    right: Spacing.four,
  },
  stampText: {
    letterSpacing: 2,
  },
});
