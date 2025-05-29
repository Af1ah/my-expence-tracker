// app/fixed-expenses/AddFixedExpenseModal.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFixedExpenses } from "~/src/context/FixedExpensesContext";
import { FixedExpense, FREQUENCY_OPTIONS, EXPENSE_CATEGORIES } from "~/src/types/fixedExpenses";
import { calculateNextDueDate } from "~/src/utils/fixedExpensesStorage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from "~/src/context/ThemeContext";

interface AddFixedExpenseModalProps {
  visible: boolean;
  expense?: FixedExpense | null;
  onClose: () => void;
}

export default function AddFixedExpenseModal({
  visible,
  expense,
  onClose,
}: AddFixedExpenseModalProps) {
  const { addFixedExpense, updateFixedExpense } = useFixedExpenses();
  const { theme } = useTheme();

  // Form state
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [frequency, setFrequency] = useState<FixedExpense['frequency']>('monthly');
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDaysBefore, setReminderDaysBefore] = useState(3);
  const [nextDueDate, setNextDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Initialize form when editing an expense
  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount.toString());
      setType(expense.type);
      setFrequency(expense.frequency);
      setCategory(expense.category || "");
      setDescription(expense.description || "");
      setIsActive(expense.isActive);
      setReminderEnabled(expense.reminderEnabled);
      setReminderDaysBefore(expense.reminderDaysBefore || 3);
      setNextDueDate(new Date(expense.nextDueDate));
    } else {
      // Reset form for new expense
      setName("");
      setAmount("");
      setType('expense');
      setFrequency('monthly');
      setCategory("");
      setDescription("");
      setIsActive(true);
      setReminderEnabled(false);
      setReminderDaysBefore(3);
      setNextDueDate(new Date());
    }
  }, [expense]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name for the expense/income");
      return;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const expenseData = {
      name: name.trim(),
      amount: parseFloat(amount),
      type,
      frequency,
      nextDueDate: nextDueDate.toISOString(),
      isActive,
      reminderEnabled,
      reminderDaysBefore,
      category: category.trim() || undefined,
      description: description.trim() || undefined,
    };

    try {
      if (expense) {
        await updateFixedExpense({
          ...expenseData,
          id: expense.id,
          createdAt: expense.createdAt,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addFixedExpense(expenseData);
      }
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to save fixed expense");
      console.error(error);
    }
  };

  const handleFrequencyChange = (freq: FixedExpense['frequency']) => {
    setFrequency(freq);
    setShowFrequencyPicker(false);
    // Update next due date based on frequency if not manually set
    if (!expense) {
      setNextDueDate(new Date(calculateNextDueDate(freq)));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNextDueDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-50"
      >
        <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">
              {expense ? 'Edit Fixed Item' : 'Add Fixed Item'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Type Toggle */}
          <View className="flex-row items-center justify-center mb-6">
            <TouchableOpacity
              onPress={() => setType('expense')}
              className={`flex-1 py-3 rounded-l-lg items-center ${
                type === 'expense' ? 'bg-red-100' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`font-medium ${
                  type === 'expense' ? 'text-red-700' : 'text-gray-500'
                }`}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setType('income')}
              className={`flex-1 py-3 rounded-r-lg items-center ${
                type === 'income' ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`font-medium ${
                  type === 'income' ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Rent, Salary, Netflix"
              className="bg-white p-3 rounded-lg border border-gray-200"
            />
          </View>

          {/* Amount Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Amount</Text>
            <View className="flex-row items-center bg-white p-3 rounded-lg border border-gray-200">
              <Text className="text-gray-500 mr-2">₹</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                className="flex-1"
              />
            </View>
          </View>

          {/* Frequency Picker */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Frequency</Text>
            <TouchableOpacity
              onPress={() => setShowFrequencyPicker(true)}
              className="bg-white p-3 rounded-lg border border-gray-200 flex-row justify-between items-center"
            >
              <Text className="text-gray-800">
                {FREQUENCY_OPTIONS.find(f => f.value === frequency)?.label}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Next Due Date */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Next Due Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-white p-3 rounded-lg border border-gray-200 flex-row justify-between items-center"
            >
              <Text className="text-gray-800">{formatDate(nextDueDate)}</Text>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Category Picker */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Category (Optional)</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryPicker(true)}
              className="bg-white p-3 rounded-lg border border-gray-200 flex-row justify-between items-center"
            >
              <Text className={`${category ? 'text-gray-800' : 'text-gray-400'}`}>
                {category || "Select a category"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">Description (Optional)</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add any notes"
              multiline
              numberOfLines={3}
              className="bg-white p-3 rounded-lg border border-gray-200 h-20"
            />
          </View>

          {/* Active Toggle */}
          <View className="flex-row justify-between items-center mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <Text className="text-sm font-medium text-gray-700">Active</Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
              thumbColor={isActive ? '#4F46E5' : '#9CA3AF'}
            />
          </View>

          {/* Reminder Toggle */}
          <View className="flex-row justify-between items-center mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <Text className="text-sm font-medium text-gray-700">Enable Reminder</Text>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
              thumbColor={reminderEnabled ? '#4F46E5' : '#9CA3AF'}
            />
          </View>

          {reminderEnabled && (
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-1">Remind Before (Days)</Text>
              <View className="flex-row space-x-2">
                {[1, 2, 3, 5, 7].map((days) => (
                  <TouchableOpacity
                    key={days}
                    onPress={() => setReminderDaysBefore(days)}
                    className={`py-2 px-4 rounded-lg ${
                      reminderDaysBefore === days
                        ? 'bg-indigo-100 border border-indigo-300'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text
                      className={`${
                        reminderDaysBefore === days
                          ? 'text-indigo-700 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {days} day{days > 1 ? 's' : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-indigo-500 py-3 rounded-lg items-center mt-4 mb-8"
          >
            <Text className="text-white font-medium">
              {expense ? 'Update Fixed Item' : 'Add Fixed Item'}
            </Text>
          </TouchableOpacity>

          {/* Frequency Picker Modal */}
          {showFrequencyPicker && (
            <Modal
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowFrequencyPicker(false)}
            >
              <View className="flex-1 justify-end bg-[rgb(0,0,0)]/30">
                <View className="bg-white rounded-t-lg p-4">
                  <Text className="text-lg font-bold mb-4">Select Frequency</Text>
                  {FREQUENCY_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleFrequencyChange(option.value)}
                      className="py-3 border-b border-gray-100"
                    >
                      <Text className={`text-lg ${
                        frequency === option.value ? 'text-indigo-600 font-medium' : 'text-gray-800'
                      }`}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => setShowFrequencyPicker(false)}
                    className="py-3 mt-2 items-center"
                  >
                    <Text className="text-red-500 font-medium">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Category Picker Modal */}
          {showCategoryPicker && (
            <Modal
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowCategoryPicker(false)}
            >
              <View className="flex-1 justify-end bg-[rgb(0,0,0)]/30 ">
                <View className="bg-white rounded-t-lg p-4 max-h-96 mx-1">
                  <Text className="text-lg font-bold mb-4">Select Category</Text>
                  <ScrollView>
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => {
                          setCategory(cat);
                          setShowCategoryPicker(false);
                        }}
                        className="py-3 border-b border-gray-100"
                      >
                        <Text className={`text-lg ${
                          category === cat ? 'text-indigo-600 font-medium' : 'text-gray-800'
                        }`}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      onPress={() => {
                        setCategory('');
                        setShowCategoryPicker(false);
                      }}
                      className="py-3 border-b border-gray-100"
                    >
                      <Text className={`text-lg ${
                        !category ? 'text-indigo-600 font-medium' : 'text-gray-800'
                      }`}>
                        None
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => setShowCategoryPicker(false)}
                    className="py-3 mt-2 items-center"
                  >
                    <Text className="text-red-500 font-medium">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={nextDueDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}