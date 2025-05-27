// theme/colors.ts
export const lightColors = {
  // Primary colors
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Background colors
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  surfaceHover: '#F3F4F6',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  
  // Income/Expense colors
  income: '#10B981',
  expense: '#EF4444',
  
  // Category colors
  categoryFood: '#F59E0B',
  categoryTransport: '#3B82F6',
  categoryShopping: '#8B5CF6',
  categoryEntertainment: '#EC4899',
  categoryHealth: '#06B6D4',
  categoryOther: '#6B7280',
  
  // Action colors
  edit: '#f0f9ff',
  delete: '#fef2f2',
  
  // Shadow
  shadow: '#000000',
};

export const darkColors = {
  // Primary colors
  primary: '#818CF8',
  primaryLight: '#A5B4FC',
  primaryDark: '#6366F1',
  
  // Background colors
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  surfaceHover: '#475569',
  
  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverse: '#0F172A',
  
  // Status colors
  success: '#34D399',
  successLight: '#6EE7B7',
  error: '#F87171',
  errorLight: '#FCA5A5',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  // Border colors
  border: '#475569',
  borderLight: '#334155',
  borderDark: '#64748B',
  
  // Income/Expense colors
  income: '#34D399',
  expense: '#F87171',
  
  // Category colors
  categoryFood: '#FBBF24',
  categoryTransport: '#60A5FA',
  categoryShopping: '#A78BFA',
  categoryEntertainment: '#F472B6',
  categoryHealth: '#22D3EE',
  categoryOther: '#94A3B8',
  
  // Action colors
  edit: '#1e293b',
  delete: '#450a0a',
  
  // Shadow
  shadow: '#000000',
};

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

export const lightColorScheme = lightColors;
export const darkColorScheme = darkColors;
