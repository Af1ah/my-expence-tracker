// context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme } from '../theme';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // You can add AsyncStorage here to persist theme preference
  useEffect(() => {
    // Load saved theme preference from AsyncStorage
    // const loadTheme = async () => {
    //   try {
    //     const savedTheme = await AsyncStorage.getItem('isDarkMode');
    //     if (savedTheme !== null) {
    //       setIsDarkMode(JSON.parse(savedTheme));
    //     }
    //   } catch (error) {
    //     console.log('Error loading theme:', error);
    //   }
    // };
    // loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    // Save to AsyncStorage
    // AsyncStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};