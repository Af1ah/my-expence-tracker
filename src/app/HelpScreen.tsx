import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '~/src/context/SettingsContext';
import getStyles from '../styles/mainstyle';

const FAQ_DATA = [
  {
    question: "How do I add a new transaction?",
    answer: "Tap the '+' button on the main screen and fill in the transaction details including amount, category, and description."
  },
  {
    question: "How can I categorize my expenses?",
    answer: "When adding a transaction, select from predefined categories like Food, Transport, Shopping, etc. You can also create custom categories."
  },
  {
    question: "How do I view my spending analytics?",
    answer: "Go to the Analytics tab to see your spending breakdown by category, time period, and detailed insights about your financial habits."
  },
  {
    question: "Can I export my transaction data?",
    answer: "Yes, you can export your data in CSV format from Settings > Data Export. This allows you to analyze your data in external tools."
  },
  {
    question: "How do I set up budget limits?",
    answer: "Navigate to Budget section where you can set monthly limits for different categories and track your progress throughout the month."
  },
  {
    question: "Is my financial data secure?",
    answer: "Yes, all your data is stored locally on your device and encrypted. We don't share your financial information with third parties."
  }
];

export default function HelpScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { isDarkMode } = useSettings();

  const styles = getStyles(isDarkMode);

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@expensetracker.com?subject=Help Request');
  };

  const handleOpenDocs = () => {
    Linking.openURL('https://docs.expensetracker.com');
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleContactSupport}>
            <View style={styles.actionLeft}>
              <MaterialIcons 
                name="email" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.actionText}>Contact Support</Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleOpenDocs}>
            <View style={styles.actionLeft}>
              <MaterialIcons 
                name="description" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text style={styles.actionText}>Documentation</Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {FAQ_DATA.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>May 2025</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>Expense Tracker Team</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
