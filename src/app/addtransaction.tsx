import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import {createAddTransactionStyles} from "./../styles/addTransactionStyles"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CategorySelector from "../components/history/CategorySelector"; // Import the new component
import {
  CategoryType,
  Transaction,
  TransactionType,
} from "~/src//types/transaction";
import { useTransactions } from "~/src//context/TransactionContext";
import { useTheme } from "../context/ThemeContext";

export default function AddTransaction() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const isEditMode = params.editMode === "true";
  const styles = createAddTransactionStyles(theme,);
  
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("food");
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { addTransaction, updateTransaction } = useTransactions();

  // Load transaction data if in edit mode
  useEffect(() => {
    if (isEditMode && params) {
      // Handle parameters that might come as arrays or strings
      const getParam = (param: any) => {
        if (Array.isArray(param)) return param[0] || "";
        return param || "";
      };

      setType((getParam(params.type) as TransactionType) || "expense");
      setAmount(getParam(params.amount) || "");
      setTitle(getParam(params.title) || "");
      setSelectedCategory((getParam(params.category) as CategoryType) || "food");
      setNote(getParam(params.note) || "");
      setDate(getParam(params.date) || "");
    } else {
      // Set default date to today for new transactions
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, []);

  const handleSaveTransaction = async () => {
    try {
      // Validate input
      if (!amount || isNaN(parseFloat(amount))) {
        Alert.alert("Error", "Please enter a valid amount");
        return;
      }

      if (!title.trim()) {
        Alert.alert("Error", "Please enter a title");
        return;
      }

      if (!date) {
        Alert.alert("Error", "Please select a date");
        return;
      }

      setIsSubmitting(true);

      // Create transaction object
      const getParam = (param: any) => {
        if (Array.isArray(param)) return param[0] || "";
        return param || "";
      };

      const transactionData: Transaction = {
        id: isEditMode ? getParam(params.transactionId) || Date.now().toString() : Date.now().toString(),
        amount: parseFloat(amount),
        title: title.trim(),
        category: type === "income" ? "other" : selectedCategory,
        type,
        date,
        time: isEditMode ? getParam(params.time) || new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) : new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        note: note.trim() || undefined,
      };

      // Save or update transaction
      if (isEditMode) {
        await updateTransaction(transactionData);
        Alert.alert("Success", "Transaction updated successfully");
      } else {
        await addTransaction(transactionData);
        Alert.alert("Success", "Transaction added successfully");
      }

      // Navigate back to history page
      router.push("/history");
    } catch (error) {
      Alert.alert("Error", `Failed to ${isEditMode ? 'update' : 'save'} transaction. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'saving'} transaction:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    const formatted = format(selectedDate, 'yyyy-MM-dd');
    setDate(formatted);
    hideDatePicker();
  };

  // Handle type change and reset category if switching to income
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === "income") {
      setSelectedCategory("other");
    } else {
      // Reset to default expense category if switching back to expense
      setSelectedCategory("food");
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: CategoryType) => {
    console.log('Category selected:', category);
    setSelectedCategory(category);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEditMode ? "Edit Transaction" : "Add Transaction"}
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Transaction Type Selector */}
        <View style={styles.typeSelectorContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "expense"
                ? styles.activeExpenseButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleTypeChange("expense")}
          >
            <Ionicons
              name="arrow-down"
              size={20}
              color={type === "expense" ? "#fff" : "#000"}
            />
            <Text
              style={
                type === "expense"
                  ? styles.activeButtonText
                  : styles.inactiveButtonText
              }
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "income"
                ? styles.activeIncomeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleTypeChange("income")}
          >
            <Ionicons
              name="arrow-up"
              size={20}
              color={type === "income" ? "#fff" : "#000"}
            />
            <Text
              style={
                type === "income"
                  ? styles.activeButtonText
                  : styles.inactiveButtonText
              }
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.dollarSign}>₹</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="decimal-pad"
            placeholder="0.00"
            value={amount}
            onChangeText={(text) => {
              console.log('Amount changed:', text);
              setAmount(text);
            }}
          />
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter title"
            value={title}
            onChangeText={(text) => {
              console.log('Title changed:', text);
              setTitle(text);
            }}
          />
        </View>

        {/* Category Selection - Only show for expenses */}
        {type === "expense" && (
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            containerStyle={styles.inputContainer}
          />
        )}

        {/* Date Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <Pressable onPress={showDatePicker}>
            <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <Text style={{ color: date ? '#000' : '#888', flex: 1 }}>
                {date || 'Select date'}
              </Text>
              <Ionicons name="calendar-outline" size={24} color="#555" />
            </View>
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            date={date ? new Date(date) : new Date()}
          />
        </View>

        {/* Note Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput
            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Add a note"
            value={note}
            onChangeText={(text) => {
              console.log('Note changed:', text);
              setNote(text);
            }}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveTransaction}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditMode ? "Update Transaction" : "Save Transaction"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
