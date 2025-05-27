import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '~/src/context/SettingsContext';
import {createSettingsStyles} from '../styles/settingsStyles';
import { router } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

const COUNTRIES = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'EU', name: 'European Union', currency: 'EUR', flag: '🇪🇺' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
];

export default function SettingsScreen(): React.JSX.Element {
  const {theme, isDarkMode,toggleTheme} = useTheme();
  const navigation = useNavigation();
  const {  selectedCountry, setCountry } = useSettings();
  const [showCountryModal, setShowCountryModal] = useState(false);

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0];
  const styles = createSettingsStyles(theme);

  const renderCountryItem = ({ item }: { item: typeof COUNTRIES[0] }) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        selectedCountry === item.code && styles.selectedCountryItem
      ]}
      onPress={() => {
        setCountry(item.code);
        setShowCountryModal(false);
      }}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryCurrency}>{item.currency}</Text>
      </View>
      {selectedCountry === item.code && (
        <MaterialIcons name="check" size={24} color="#10B981" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/ProfileScreen' as never)}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons 
                name="person" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name="moon" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#ccc', true: '#10B981' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Localization Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localization</Text>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowCountryModal(true)}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons 
                name="language" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.settingText}>Country & Currency</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {selectedCountryData.flag} {selectedCountryData.currency}
              </Text>
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/HelpScreen' as never)}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons 
                name="help" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Country Selection Modal */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCountryModal(false)}>
              <Text style={[styles.modalCancel, { color: isDarkMode ? '#fff' : '#007AFF' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Select Country
            </Text>
            <View style={{ width: 60 }} />
          </View>
          
          <FlatList
            data={COUNTRIES}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
          />
        </View>
      </Modal>
    </View>
  );
}
