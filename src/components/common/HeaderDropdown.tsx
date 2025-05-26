import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '~/src/context/SettingsContext';
import styles from '~/src/styles/analyticsStyles';
import { router } from 'expo-router';

interface HeaderDropdownProps {
  title: string;
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ title }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const { isDarkMode } = useSettings();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const navigateToSettings = () => {
    setIsDropdownVisible(false);
    router.push('/SettingsScreen' as never);
  };

  const navigateToHelp = () => {
    setIsDropdownVisible(false);
    router.push('/HelpScreen' as never);
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, isDarkMode && { color: '#fff' }]}>{title}</Text>
      <TouchableOpacity style={styles.moreButton} onPress={toggleDropdown}>
        <MaterialIcons 
          name="more-vert" 
          size={24} 
          color={isDarkMode ? '#fff' : '#666'} 
        />
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={[
          styles.dropdown,
          isDarkMode && styles.dropdownDark
        ]}>
          <TouchableOpacity 
            style={[
              styles.dropdownItem,
              isDarkMode && styles.dropdownItemDark
            ]}
            onPress={navigateToSettings}
          >
            <Text style={[
              styles.dropdownItemText,
              isDarkMode && styles.dropdownItemTextDark
            ]}>
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.dropdownItem,
              styles.lastDropdownItem,
              isDarkMode && styles.dropdownItemDark
            ]}
            onPress={navigateToHelp}
          >
            <Text style={[
              styles.dropdownItemText,
              isDarkMode && styles.dropdownItemTextDark
            ]}>
              Help
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};