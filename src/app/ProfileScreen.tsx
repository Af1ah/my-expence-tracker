// screens/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '~/src/context/SettingsContext';
import getStyles from '../styles/mainstyle';

export default function ProfileScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { isDarkMode } = useSettings();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');

  const styles = getStyles(isDarkMode);

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    navigation.goBack();
  };

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
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Picture */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePicture}>
            <MaterialIcons 
              name="person" 
              size={60} 
              color={isDarkMode ? '#666' : '#ccc'} 
            />
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}