import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarStyle } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

type ThemeMode = 'light' | 'dark' | 'system';

import { lightTheme, darkTheme, Theme } from '../theme';

interface ThemeContextType {
  isDarkMode: boolean;
  themeMode: ThemeMode;
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [theme, setTheme] = useState<Theme>(isDarkMode ? darkTheme : lightTheme);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update dark mode based on theme mode and system preference
  useEffect(() => {
    const newIsDarkMode = themeMode === 'system' 
      ? systemColorScheme === 'dark' 
      : themeMode === 'dark';
    
    setIsDarkMode(newIsDarkMode);
    setTheme(newIsDarkMode ? darkTheme : lightTheme);
    updateSystemAppearance(newIsDarkMode);
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const updateSystemAppearance = (isDark: boolean) => {
    // Update status bar
    setStatusBarStyle(isDark ? 'light' : 'dark');
    
    // Update system UI (navigation bar on Android)
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync(isDark ? '#0f172a' : '#ffffff');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, themeMode, theme, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
