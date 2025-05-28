// theme/index.ts

export interface Typography {
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  fontWeight: {
    normal: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface BorderRadius {
  sm: number;
  base: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Shadows {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ShadowLevels {
  light: Shadows;
  medium: Shadows;
  heavy: Shadows;
}

export interface ColorScheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceHover: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  warning: string;
  info: string;
  border: string;
  borderLight: string;
  borderDark: string;
  income: string;
  expense: string;
  categoryFood: string;
  categoryTransport: string;
  categoryShopping: string;
  categoryEntertainment: string;
  categoryHealth: string;
  categoryOther: string;
  edit: string;
  delete: string;
  shadow: string;
}

export interface Theme {
  colors: ColorScheme;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: ShadowLevels;
  typography: Typography;
}

// LIGHT THEME COLORS
const lightColors: ColorScheme = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  surfaceHover: '#F3F4F6',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',
  info: '#3B82F6',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  income: '#10B981',
  expense: '#EF4444',
  categoryFood: '#F59E0B',
  categoryTransport: '#3B82F6',
  categoryShopping: '#8B5CF6',
  categoryEntertainment: '#EC4899',
  categoryHealth: '#06B6D4',
  categoryOther: '#6B7280',
  edit: '#f0f9ff',
  delete: '#fef2f2',
  shadow: '#000000',
};

// DARK THEME COLORS
const darkColors: ColorScheme = {
  primary: '#818CF8',
  primaryLight: '#A5B4FC',
  primaryDark: '#6366F1',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  surfaceHover: '#475569',
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverse: '#0F172A',
  success: '#34D399',
  successLight: '#6EE7B7',
  error: '#F87171',
  errorLight: '#FCA5A5',
  warning: '#FBBF24',
  info: '#60A5FA',
  border: '#475569',
  borderLight: '#334155',
  borderDark: '#64748B',
  income: '#34D399',
  expense: '#F87171',
  categoryFood: '#FBBF24',
  categoryTransport: '#60A5FA',
  categoryShopping: '#A78BFA',
  categoryEntertainment: '#F472B6',
  categoryHealth: '#22D3EE',
  categoryOther: '#94A3B8',
  edit: '#1e293b',
  delete: '#450a0a',
  shadow: '#000000',
};

// TYPOGRAPHY
const typography: Typography = {
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 28,
  },
};

// SPACING
const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 44,
  '4xl': 60,
};

// BORDER RADIUS
const borderRadius: BorderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// SHADOWS
const shadows: ShadowLevels = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
};

// FINAL THEME EXPORTS
export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  borderRadius,
  shadows,
  typography,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  shadows,
  typography,
};
