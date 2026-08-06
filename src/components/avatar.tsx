import { Image, type ImageStyle } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type AvatarProps = {
  name: string;
  colors: readonly [string, string];
  photoUrl?: string;
  size?: number;
  style?: ViewStyle;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, colors, photoUrl, size = 56, style }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const containerStyle = [
    styles.container,
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ];

  if (photoUrl && !failed) {
    return (
      <Image
        source={{ uri: photoUrl }}
        style={[{ width: size, height: size, borderRadius: size / 2 }, style] as ImageStyle[]}
        contentFit="cover"
        transition={150}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={containerStyle}>
      <View style={styles.inner}>
        <ThemedText style={{ fontSize: size * 0.36, color: '#FFFFFF' }} type="smallBold">
          {getInitials(name)}
        </ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
