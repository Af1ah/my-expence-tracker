import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsContextType {
  isDarkMode: boolean;
  selectedCountry: string;
  toggleDarkMode: () => void;
  setCountry: (country: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      const country = await AsyncStorage.getItem('selectedCountry');
      
      if (darkMode !== null) {
        setIsDarkMode(JSON.parse(darkMode));
      }
      if (country !== null) {
        setSelectedCountry(country);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Failed to save dark mode setting:', error);
    }
  };

  const setCountry = async (country: string) => {
    setSelectedCountry(country);
    try {
      await AsyncStorage.setItem('selectedCountry', country);
    } catch (error) {
      console.error('Failed to save country setting:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        selectedCountry,
        toggleDarkMode,
        setCountry,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
