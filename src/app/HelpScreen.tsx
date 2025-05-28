import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

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
  const { isDarkMode } = useTheme();

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@expensetracker.com?subject=Help Request');
  };

  const handleOpenDocs = () => {
    Linking.openURL('https://docs.expensetracker.com');
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View className={`flex-row items-center justify-between px-4 py-4 pt-12 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Help & Support
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1">
        {/* Quick Actions */}
        <View className="px-4 py-6">
          <Text className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </Text>
          
          <TouchableOpacity 
            className={`flex-row items-center justify-between p-4 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
            onPress={handleContactSupport}
          >
            <View className="flex-row items-center">
              <MaterialIcons 
                name="email" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text className={`ml-3 text-base ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Contact Support
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            className={`flex-row items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
            onPress={handleOpenDocs}
          >
            <View className="flex-row items-center">
              <MaterialIcons 
                name="description" 
                size={24} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
              <Text className={`ml-3 text-base ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Documentation
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? '#fff' : '#666'} 
            />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View className="px-4 py-6">
          <Text className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </Text>
          
          {FAQ_DATA.map((faq, index) => (
            <View 
              key={index} 
              className={`p-4 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <Text className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {faq.question}
              </Text>
              <Text className={`text-sm leading-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {faq.answer}
              </Text>
            </View>
          ))}
        </View>

        {/* App Info */}
        <View className="px-4 py-6">
          <Text className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            App Information
          </Text>
          
          <View className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <View className="flex-row justify-between items-center mb-3">
              <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Version
              </Text>
              <Text className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                1.0.0
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center mb-3">
              <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Last Updated
              </Text>
              <Text className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                May 2025
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Developer
              </Text>
              <Text className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Expense Tracker Team
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}