import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#101010',
    textSecondary: '#5A5A5A',
    textTertiary: '#8C8C8C',
    background: '#FFFFFF',
    backgroundElement: '#F1F1F1',
    backgroundSelected: '#E2E2E2',
    card: '#FFFFFF',
    border: '#DEDEDE',
    primary: '#141414',
    accent: '#141414',
    star: '#4A4A4A',
    success: '#2F6F4E',
    danger: '#7A3030',
    overlayLike: '#2F6F4E',
    overlayNope: '#7A3030',
    tabInactive: '#B5B5B5',
  },
  dark: {
    text: '#F2F2F2',
    textSecondary: '#ABABAB',
    textTertiary: '#787878',
    background: '#0C0C0C',
    backgroundElement: '#1B1B1B',
    backgroundSelected: '#272727',
    card: '#161616',
    border: '#2B2B2B',
    primary: '#3D3D3D',
    accent: '#3D3D3D',
    star: '#9A9A9A',
    success: '#3E8562',
    danger: '#A24444',
    overlayLike: '#3E8562',
    overlayNope: '#A24444',
    tabInactive: '#5F5F5F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, serif',
    rounded: '-apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'Menlo, monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  small: 10,
  medium: 16,
  large: 24,
  xlarge: 32,
  pill: 999,
} as const;

export const CardShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  android: { elevation: 6 },
  default: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
}) as object;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
