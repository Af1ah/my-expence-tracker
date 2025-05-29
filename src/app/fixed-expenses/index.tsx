// app/fixed-expenses/index.tsx

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFixedExpenses } from "~/src/context/FixedExpensesContext";
import { useFormattedCurrency } from "~/src/hooks/useFormattedCurrency";
import { useTheme } from "~/src/context/ThemeContext";
import { FixedExpense } from "~/src/types/fixedExpenses";
import AddFixedExpenseModal from "../(modal)/AddFixedExpenseModal";

export default function FixedExpensesScreen(): React.JSX.Element {
  const router = useRouter();
  const { theme } = useTheme();
  const { formatCurrency } = useFormattedCurrency();
  const {
    fixedExpenses,
    deleteFixedExpense,
    toggleExpenseActive,
    getMonthlyTotal,
    getSpendableBalance,
    getUpcomingExpenses,
    isLoading,
  } = useFixedExpenses();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<FixedExpense | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');

  // Calculate totals
  const monthlyIncome = getMonthlyTotal('income');
  const monthlyExpenses = getMonthlyTotal('expense');
  const spendableBalance = getSpendableBalance();
  const upcomingExpenses = getUpcomingExpenses(7); // Next 7 days

  // Filter expenses based on active tab
  const filteredExpenses = useMemo(() => {
    let filtered = fixedExpenses;
    if (activeTab !== 'all') {
      filtered = fixedExpenses.filter(expense => expense.type === activeTab);
    }
    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [fixedExpenses, activeTab]);

  const handleEdit = (expense: FixedExpense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const handleDelete = (expense: FixedExpense) => {
    Alert.alert(
      "Delete Fixed Item",
      `Are you sure you want to delete "${expense.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteFixedExpense(expense.id),
        },
      ]
    );
  };

  const handleToggleActive = async (id: string) => {
    try {
      await toggleExpenseActive(id);
    } catch (error) {
      Alert.alert("Error", "Failed to update expense status");
    }
  };

  const formatFrequency = (frequency: FixedExpense['frequency']) => {
    const frequencyMap = {
      weekly: 'Weekly',
      biweekly: 'Bi-weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
    };
    return frequencyMap[frequency];
  };

  const formatNextDue = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    return `Due in ${diffDays} days`;
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExpense(null);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-500">Loading fixed expenses...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Fixed Expenses</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="w-10 h-10 rounded-full bg-indigo-500 items-center justify-center"
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        
      </View>

      <ScrollView className="flex-1">
        {/* Upcoming Expenses */}
        {upcomingExpenses.length > 0 && (
          <View className="mx-4 mt-4 bg-white rounded-lg p-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Ionicons name="time-outline" size={18} color="#F59E0B" />
              <Text className="ml-2 text-sm font-semibold text-gray-800">Upcoming (Next 7 Days)</Text>
            </View>
            {upcomingExpenses.slice(0, 3).map((expense) => (
              <View key={expense.id} className="flex-row justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-800">{expense.name}</Text>
                  <Text className="text-xs text-amber-600">{formatNextDue(expense.nextDueDate)}</Text>
                </View>
                <Text className={`text-sm font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Filter Tabs */}
        <View className="flex-row mx-4 mt-4 bg-white rounded-lg p-1 shadow-sm">
          {['all', 'income', 'expense'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 rounded-md ${
                activeTab === tab
                  ? 'bg-indigo-500'
                  : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expenses List */}
        <View className="mx-4 mt-4 space-y-3">
          {filteredExpenses.length === 0 ? (
            <View className="bg-white rounded-lg p-8 items-center shadow-sm">
              <Ionicons name="calendar-outline" size={32} color="#9CA3AF" />
              <Text className="text-gray-500 text-center mt-2">
                No {activeTab === 'all' ? 'fixed expenses' : activeTab} items yet
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="mt-3 bg-indigo-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-sm font-medium">Add First Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredExpenses.map((expense) => (
              <View key={expense.id} className="bg-white rounded-lg p-4 shadow-sm">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-lg font-semibold text-gray-800">{expense.name}</Text>
                      {!expense.isActive && (
                        <View className="ml-2 bg-gray-100 px-2 py-1 rounded">
                          <Text className="text-xs text-gray-500">INACTIVE</Text>
                        </View>
                      )}
                    </View>
                    {expense.category && (
                      <Text className="text-sm text-gray-500 mt-1">{expense.category}</Text>
                    )}
                    <Text className="text-sm text-gray-600 mt-1">
                      {formatFrequency(expense.frequency)} • {formatNextDue(expense.nextDueDate)}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className={`text-lg font-bold ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
                    </Text>
                    <Switch
                      value={expense.isActive}
                      onValueChange={() => handleToggleActive(expense.id)}
                      trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
                      thumbColor={expense.isActive ? '#4F46E5' : '#9CA3AF'}
                    />
                  </View>
                </View>

                <View className="flex-row justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
                  <TouchableOpacity
                    onPress={() => handleEdit(expense)}
                    className="bg-blue-50 px-3 py-2 rounded-lg flex-row items-center"
                  >
                    <Ionicons name="pencil-outline" size={16} color="#3B82F6" />
                    <Text className="text-blue-600 text-sm font-medium ml-1">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(expense)}
                    className="bg-red-50 px-3 py-2 rounded-lg flex-row items-center"
                  >
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                    <Text className="text-red-600 text-sm font-medium ml-1">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View className="h-6" />
      </ScrollView>

      {/* Add/Edit Modal */}
      <AddFixedExpenseModal
        visible={modalVisible}
        expense={selectedExpense}
        onClose={closeModal}
      />
    </View>
  );
}