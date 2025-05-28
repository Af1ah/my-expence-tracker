// index.tsx (Fixed Home Screen)
import React from 'react';
import { View, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BalanceCard from '~/src/components/home/BalenceCard';
import PerformanceChart from '~/src/components/home/PieChartCard';
import { useTransactionTotals } from '~/src/hooks/useTransactionTotals';
import AddTransactionButton from '~/src/components/AddTransactionButton';
import { scheduleLocalNotification } from '~/src/lib/notifications';
import { useFormattedCurrency } from '~/src/hooks/useFormattedCurrency';
import { useAuth } from '~/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '~/src/context/ThemeContext';

export default function index() {
  const { user, profile } = useAuth();
  const { isDarkMode } = useTheme();
  const { formatCurrency } = useFormattedCurrency();

  const {
    incomeTotal,
    expenseTotal,
    food,
    shopping,
    transport,
    housing,
    health,
    other,
    bills,
    entertainment,
  } = useTransactionTotals();

  const balance = incomeTotal - expenseTotal;
  const safePercent = (amount: number) =>
    incomeTotal > 0 ? Math.round((amount * 100) / expenseTotal) : 0;

  const spendingData = [
    {
      value: safePercent(food),
      color: '#6366F1',
      gradientCenterColor: '#6366F1',
      label: 'Food',
    },
    {
      value: safePercent(shopping),
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      label: 'Shopping',
    },
    {
      value: safePercent(transport),
      color: '#F59E0B',
      gradientCenterColor: '#FBBF24',
      label: 'Transport',
    },
    {
      value: safePercent(housing),
      color: '#60A5FA',
      gradientCenterColor: '#3B82F6',
      label: 'Housing',
    },
    {
      value: safePercent(health),
      color: '#10B981',
      gradientCenterColor: '#34D399',
      label: 'Health',
    },
    {
      value: safePercent(entertainment),
      color: '#EC4899',
      gradientCenterColor: '#F472B6',
      label: 'Entertainment',
    },
    {
      value: safePercent(bills),
      color: '#A78BFA',
      gradientCenterColor: '#8B5CF6',
      label: 'Bills',
    },
    {
      value: safePercent(other),
      color: '#9CA3AF',
      gradientCenterColor: '#6B7280',
      label: 'Other',
    },
  ].filter((item) => item.value > 0);

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Header Section - Fixed styling */}
      <View className={`pt-12 pb-4 px-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Welcome back
            </Text>
            <Text className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {profile?.name || 'User'}
            </Text>
          </View>
          
          <TouchableOpacity 
            className={`rounded-full p-3 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
            onPress={() => router.push('/ProfileScreen' as never)}
          >
            <Ionicons 
              name="person-outline" 
              size={22} 
              color={isDarkMode ? '#fff' : '#333'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className={`flex-1 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <BalanceCard
          balance={formatCurrency(balance)}
          income={formatCurrency(incomeTotal)}
          expense={formatCurrency(expenseTotal)}
        />
        <PerformanceChart title="Spending" data={spendingData} />
        
        {/* Development button - remove in production */}
        <View className="mx-4 mb-4">
          <Button
            title="Show Notification in 5 seconds"
            onPress={() =>
              scheduleLocalNotification('Hey Aflah, this is your custom notification!', 5)
            }
          />
        </View>
        
        <AddTransactionButton />
      </ScrollView>
    </>
  );
}
