// utils/fixedExpensesStorage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FixedExpense } from "../types/fixedExpenses";

const FIXED_EXPENSES_STORAGE_KEY = "@budgetapp_fixed_expenses";

export const saveFixedExpense = async (
  fixedExpense: FixedExpense,
): Promise<void> => {
  try {
    const existingExpensesJSON = await AsyncStorage.getItem(
      FIXED_EXPENSES_STORAGE_KEY,
    );
    let expenses: FixedExpense[] = [];

    if (existingExpensesJSON) {
      expenses = JSON.parse(existingExpensesJSON);
    }

    // Check if expense already exists (for updates)
    const existingIndex = expenses.findIndex(exp => exp.id === fixedExpense.id);
    
    if (existingIndex >= 0) {
      expenses[existingIndex] = fixedExpense;
    } else {
      expenses.push(fixedExpense);
    }

    await AsyncStorage.setItem(
      FIXED_EXPENSES_STORAGE_KEY,
      JSON.stringify(expenses),
    );
  } catch (error) {
    console.error("Error saving fixed expense:", error);
    throw new Error("Failed to save fixed expense");
  }
};

export const getFixedExpenses = async (): Promise<FixedExpense[]> => {
  try {
    const expensesJSON = await AsyncStorage.getItem(
      FIXED_EXPENSES_STORAGE_KEY,
    );
    if (expensesJSON) {
      return JSON.parse(expensesJSON);
    }
    return [];
  } catch (error) {
    console.error("Error getting fixed expenses:", error);
    throw new Error("Failed to retrieve fixed expenses");
  }
};

export const deleteFixedExpense = async (id: string): Promise<void> => {
  try {
    const existingExpensesJSON = await AsyncStorage.getItem(
      FIXED_EXPENSES_STORAGE_KEY,
    );
    
    if (!existingExpensesJSON) {
      throw new Error("No fixed expenses found");
    }

    const expenses: FixedExpense[] = JSON.parse(existingExpensesJSON);
    
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === id
    );
    
    if (expenseIndex === -1) {
      throw new Error("Fixed expense not found");
    }

    expenses.splice(expenseIndex, 1);

    await AsyncStorage.setItem(
      FIXED_EXPENSES_STORAGE_KEY,
      JSON.stringify(expenses),
    );
  } catch (error) {
    console.error("Error deleting fixed expense:", error);
    throw new Error("Failed to delete fixed expense");
  }
};

export const updateFixedExpense = async (updatedExpense: FixedExpense): Promise<void> => {
  try {
    const existingExpensesJSON = await AsyncStorage.getItem(
      FIXED_EXPENSES_STORAGE_KEY,
    );
    
    if (!existingExpensesJSON) {
      throw new Error("No fixed expenses found");
    }

    const expenses: FixedExpense[] = JSON.parse(existingExpensesJSON);
    
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === updatedExpense.id
    );
    
    if (expenseIndex === -1) {
      throw new Error("Fixed expense not found");
    }

    expenses[expenseIndex] = updatedExpense;

    await AsyncStorage.setItem(
      FIXED_EXPENSES_STORAGE_KEY,
      JSON.stringify(expenses),
    );
  } catch (error) {
    console.error("Error updating fixed expense:", error);
    throw new Error("Failed to update fixed expense");
  }
};

export const clearAllFixedExpenses = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FIXED_EXPENSES_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing fixed expenses:", error);
    throw new Error("Failed to clear fixed expenses");
  }
};

// Utility functions for calculations
export const calculateNextDueDate = (frequency: FixedExpense['frequency'], currentDate = new Date()): string => {
  const date = new Date(currentDate);
  
  switch (frequency) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'biweekly':
      date.setDate(date.getDate() + 14);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  
  return date.toISOString();
};

export const calculateMonthlyEquivalent = (amount: number, frequency: FixedExpense['frequency']): number => {
  switch (frequency) {
    case 'weekly':
      return (amount * 52) / 12; // 52 weeks per year / 12 months
    case 'biweekly':
      return (amount * 26) / 12; // 26 bi-weeks per year / 12 months
    case 'monthly':
      return amount;
    case 'quarterly':
      return amount / 3; // Quarterly to monthly
    case 'yearly':
      return amount / 12; // Yearly to monthly
    default:
      return amount;
  }
};