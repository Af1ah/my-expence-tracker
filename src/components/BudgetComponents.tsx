// BudgetComponents.tsx - Reusable components for the budget screen

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BudgetCategory, BudgetMetrics, getProgressBarColor, getCategoryBgColor } from "./../types/types";
import { getCategoryIcon } from "../types/Iconstypes";
import { useFormattedCurrency } from "../hooks/useFormattedCurrency";
import { useFixedExpenses } from "../context/FixedExpensesContext";
interface CategoryItemProps {
  category: BudgetCategory;
  onPress: (category: BudgetCategory) => void;
}





export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  const percentUsed = Math.round((category.spent / category.limit) * 100);
  const remaining = category.limit - category.spent;
  const isOverBudget = category.spent > category.limit;

  const { formatCurrency } = useFormattedCurrency();

  return (
    <TouchableOpacity
      key={category.id}
      className="mx-4 mb-4 bg-white rounded-xl shadow-sm p-4"
      onPress={() => onPress(category)}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full mr-2 items-center justify-center ${getCategoryBgColor(category.name)}`}
          >
            <Ionicons name={getCategoryIcon(category.name)} size={16} color="white" />
          </View>
          <Text className="font-medium text-gray-800">{category.name}</Text>
        </View>
        <Text className="font-semibold text-gray-800">
          {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
        </Text>
      </View>

      {/* Category Progress Bar */}
      <View className="h-2 bg-gray-200 rounded-full mb-2">
        <View
          className={`h-2 rounded-full ${getProgressBarColor(percentUsed)}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </View>

      <View className="flex-row justify-between">
        <Text className="text-sm text-gray-600">{percentUsed}% used</Text>
        <Text
          className={`text-sm ${isOverBudget ? "text-red-500" : "text-gray-600"}`}
        >
          {isOverBudget
            ? `${formatCurrency(Math.abs(remaining))} over budget`
            : `${formatCurrency(remaining)} left`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface MonthlyBudgetOverviewProps {
  budgetMetrics: BudgetMetrics;
  currentMonth: string;
}

// Updated MonthlyBudgetOverview component

export const MonthlyBudgetOverview: React.FC<MonthlyBudgetOverviewProps> = ({
  budgetMetrics,
  currentMonth,
}) => {
  const { getSpendableBalance, getMonthlyTotal } = useFixedExpenses();
  const { formatCurrency } = useFormattedCurrency();
  
  // Get fixed expenses data
  const monthlyFixedIncome = getMonthlyTotal('income');
  const monthlyFixedExpenses = getMonthlyTotal('expense');
  const netFixedAmount = monthlyFixedIncome - monthlyFixedExpenses;
  
  // Calculate adjusted budget metrics considering fixed expenses
  const adjustedBudgetRemaining = budgetMetrics.budgetRemaining + netFixedAmount;
  const isOverAdjustedBudget = adjustedBudgetRemaining < 0;

  return (
    <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm p-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">Monthly Budget</Text>
        <Text className="text-indigo-500">{currentMonth}</Text>
      </View>

      <View className="mb-2">
        <Text className="text-2xl font-bold text-gray-800">
          {formatCurrency(budgetMetrics.totalSpent)} / 
          {formatCurrency(budgetMetrics.totalBudget)}
        </Text>
        <Text className="text-gray-500 text-sm">
          {budgetMetrics.percentageUsed}% of budget used
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="h-2 bg-gray-200 rounded-full mb-2">
        <View
          className={`h-2 rounded-full ${getProgressBarColor(budgetMetrics.percentageUsed)}`}
          style={{ width: `${Math.min(budgetMetrics.percentageUsed, 100)}%` }}
        />
      </View>

      <View className="flex-row justify-between mb-3">
        <Text className="text-sm text-gray-600">
          {formatCurrency(budgetMetrics.budgetRemaining)} left
        </Text>
        <Text className="text-sm text-gray-600">
          {budgetMetrics.daysRemaining} days remaining
        </Text>
      </View>

      {/* Fixed Expenses Impact Section */}
      {(monthlyFixedIncome > 0 || monthlyFixedExpenses > 0) && (
        <View className="border-t border-gray-100 pt-3">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            After Fixed Expenses:
          </Text>
          
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-xs text-gray-500">Fixed Income:</Text>
            <Text className="text-xs text-green-600">
              +{formatCurrency(monthlyFixedIncome)}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs text-gray-500">Fixed Expenses:</Text>
            <Text className="text-xs text-red-600">
              -{formatCurrency(monthlyFixedExpenses)}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-medium text-gray-700">
              Actual Available:
            </Text>
            <Text className={`text-sm font-bold ${
              isOverAdjustedBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {formatCurrency(adjustedBudgetRemaining)}
            </Text>
          </View>
          
          {isOverAdjustedBudget && (
            <View className="mt-2 bg-red-50 p-2 rounded-lg">
              <Text className="text-xs text-red-700 text-center">
                ⚠️ Fixed expenses exceed available budget
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// export const MonthlyBudgetOverview: React.FC<MonthlyBudgetOverviewProps> = ({
//   budgetMetrics,
//   currentMonth,
// }) => {
//     const { getSpendableBalance } = useFixedExpenses();
  
//   const spendableBalance = getSpendableBalance();

  


//   const { formatCurrency } = useFormattedCurrency();
//   return (
//     <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm p-4">
//       <View className="flex-row justify-between items-center mb-2">
//         <Text className="text-lg font-semibold text-gray-800">Monthly Budget</Text>
//         <Text className="text-indigo-500">{currentMonth}</Text>
//       </View>

//       <View className="mb-2">
//         <Text className="text-2xl font-bold text-gray-800">
//           {formatCurrency(budgetMetrics.totalSpent)} / 
//           {formatCurrency(budgetMetrics.totalBudget)}
//         </Text>
//         <Text className="text-gray-500 text-sm">
//           {budgetMetrics.percentageUsed}% of budget used
//         </Text>
//       </View>

//       {/* Progress Bar */}
//       <View className="h-2 bg-gray-200 rounded-full mb-2">
//         <View
//           className={`h-2 rounded-full ${getProgressBarColor(budgetMetrics.percentageUsed)}`}
//           style={{ width: `${Math.min(budgetMetrics.percentageUsed, 100)}%` }}
//         />
//       </View>

//       <View className="flex-row justify-between">
//         <Text className="text-sm text-gray-600">
//           {formatCurrency(budgetMetrics.budgetRemaining)} left
//         </Text>
//         <Text className="text-sm text-gray-600">
//           {budgetMetrics.daysRemaining} days remaining
//         </Text>
//       </View>
//     </View>
//   );
// };