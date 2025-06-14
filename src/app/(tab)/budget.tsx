// BudgetScreen.tsx - Main budget screen component (updated)

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTransactionTotals } from "~/src/hooks/useTransactionTotals";
import { BudgetCategory, MONTHS } from "~/src/types/types";
import { CategoryItem, MonthlyBudgetOverview } from "~/src/components/BudgetComponents";
import BudgetEditModal from "~/src/app/(modal)/BudgetEditModal";
import { getBudgetCategories, saveBudgetCategories } from "~/src/utils/storage";

function Budget(): React.JSX.Element {
  const {
    food,
    shopping,
    transport,
    housing,
    health,
    other,
    bills,
    entertainment,
  } = useTransactionTotals();
  
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);

  useEffect(() => {
    const loadBudgetCategories = async () => {
      try {
        const storedBudgetCategories = await getBudgetCategories();
        if (storedBudgetCategories) {
          if (storedBudgetCategories.length > 0) {
            setBudgetCategories(storedBudgetCategories);
          } else {
            // Initial budget categories derived from transaction data
            setBudgetCategories([
              {
                id: "1",
                name: "Food",
                spent: food,
                limit: 800,
                color: "#4F46E5", // Indigo
                icon: "nutrition-outline",
              },
              {
                id: "2",
                name: "Transport",
                spent: transport,
                limit: 500,
                color: "#F59E0B", // Amber
                icon: "car-outline",
              },
              {
                id: "3",
                name: "Bills",
                spent: bills,
                limit: 400,
                color: "#10B981", // Emerald
                icon: "document-text-outline",
              },
              {
                id: "4",
                name: "Shopping",
                spent: shopping,
                limit: 300,
                color: "#EC4899", // Pink
                icon: "cart-outline",
              },
              {
                id: "5",
                name: "Entertainment",
                spent: entertainment,
                limit: 300,
                color: "#8B5CF6", // Purple
                icon: "film-outline",
              },
              {
                id: "6",
                name: "Housing",
                spent: housing,
                limit: 300,
                color: "#3B82F6", // Blue
                icon: "home-outline",
              },
              {
                id: "7",
                name: "Health",
                spent: health,
                limit: 300,
                color: "#F43F5E", // Rose
                icon: "medkit-outline",
              },
              {
                id: "8",
                name: "Other",
                spent: other,
                limit: 300,
                color: "#6B7280", // Gray
                icon: "ellipsis-horizontal-outline",
              },
            ]);
          }
        } else {
            // Initial budget categories derived from transaction data
            setBudgetCategories([
              {
                id: "1",
                name: "Food",
                spent: food,
                limit: 800,
                color: "#4F46E5", // Indigo
                icon: "nutrition-outline",
              },
              {
                id: "2",
                name: "Transport",
                spent: transport,
                limit: 500,
                color: "#F59E0B", // Amber
                icon: "car-outline",
              },
              {
                id: "3",
                name: "Bills",
                spent: bills,
                limit: 400,
                color: "#10B981", // Emerald
                icon: "document-text-outline",
              },
              {
                id: "4",
                name: "Shopping",
                spent: shopping,
                limit: 300,
                color: "#EC4899", // Pink
                icon: "cart-outline",
              },
              {
                id: "5",
                name: "Entertainment",
                spent: entertainment,
                limit: 300,
                color: "#8B5CF6", // Purple
                icon: "film-outline",
              },
              {
                id: "6",
                name: "Housing",
                spent: housing,
                limit: 300,
                color: "#3B82F6", // Blue
                icon: "home-outline",
              },
              {
                id: "7",
                name: "Health",
                spent: health,
                limit: 300,
                color: "#F43F5E", // Rose
                icon: "medkit-outline",
              },
              {
                id: "8",
                name: "Other",
                spent: other,
                limit: 300,
                color: "#6B7280", // Gray
                icon: "ellipsis-horizontal-outline",
              },
            ]);
        }
      } catch (error) {
        console.error("Error loading budget categories:", error);
      }
    };

    loadBudgetCategories();
  }, [food, shopping, transport, housing, health, other, bills, entertainment]);

  // Calculate total budget metrics
  const budgetMetrics = useMemo(() => {
    const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.limit, 0);
    const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const budgetRemaining = totalBudget - totalSpent;
    const percentageUsed = Math.round((totalSpent / totalBudget) * 100);

    // Calculate days remaining in the month
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const daysRemaining = lastDayOfMonth - today.getDate();

    return {
      totalBudget,
      totalSpent,
      budgetRemaining,
      percentageUsed,
      daysRemaining,
    };
  }, [budgetCategories]);

  // Get current month and year
  const currentMonth = useMemo(() => {
    const currentDate = new Date();
    return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, []);

  // Memoized handlers
  const openEditModal = useCallback((category: BudgetCategory) => {
    setSelectedCategory(category);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedCategory(null);
  }, []);

  const saveBudgetLimit = useCallback((categoryId: string, newLimit: number) => {
    setBudgetCategories(prev => {
      const updatedCategories = prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, limit: newLimit }
          : cat
      );
      saveBudgetCategories(updatedCategories);
      return updatedCategories;
    });
  }, []);

  const navigateToAddTransaction = useCallback(() => router.push("./../fixed-expenses"), [router]);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Budget</Text>
        
      </View>

      <ScrollView className="flex-1">
        {/* Monthly Budget Overview */}
        <MonthlyBudgetOverview 
          budgetMetrics={budgetMetrics} 
          currentMonth={currentMonth} 
        />

        <TouchableOpacity
          className="mx-4 mt-4  bg-indigo-600 rounded-xl px-6 py-4 flex-row items-center justify-center shadow-lg active:bg-indigo-700"
          onPress={navigateToAddTransaction}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="add-circle-outline" 
            size={24} 
            color="white" 
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-lg font-semibold">
            Add Fixed Expense
          </Text>
        </TouchableOpacity>

        {/* Category Breakdown */}
        <Text className="mx-4 mt-6 mb-2 text-lg font-semibold text-gray-800">
          Budget by Category
        </Text>

        {budgetCategories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            onPress={openEditModal} 
          />
        ))}
              <View className="h-24"/>
        
      </ScrollView>

      {/* Edit Budget Modal */}
      <BudgetEditModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={closeModal}
        onSave={saveBudgetLimit}
      />
    </View>
  );
}

export default Budget;
