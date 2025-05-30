import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/transaction";
import { BudgetCategory } from "../types/types";

const TRANSACTIONS_STORAGE_KEY = "@budgetapp_transactions";
const BUDGET_CATEGORIES_STORAGE_KEY = "@budgetapp_budgetCategories";

export const saveTransaction = async (
  transaction: Transaction,
): Promise<void> => {
  try {
    // Get existing transactions
    const existingTransactionsJSON = await AsyncStorage.getItem(
      TRANSACTIONS_STORAGE_KEY,
    );
    let transactions: Transaction[] = [];

    if (existingTransactionsJSON) {
      transactions = JSON.parse(existingTransactionsJSON);
    }

    // Add new transaction
    transactions.push(transaction);

    // Save updated transactions
    await AsyncStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions),
    );
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw new Error("Failed to save transaction");
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const transactionsJSON = await AsyncStorage.getItem(
      TRANSACTIONS_STORAGE_KEY,
    );
    if (transactionsJSON) {
      return JSON.parse(transactionsJSON);
    }
    return [];
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw new Error("Failed to retrieve transactions");
  }
};

export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    // Get existing transactions
    const existingTransactionsJSON = await AsyncStorage.getItem(
      TRANSACTIONS_STORAGE_KEY,
    );
    
    if (!existingTransactionsJSON) {
      throw new Error("No transactions found");
    }

    const transactions: Transaction[] = JSON.parse(existingTransactionsJSON);
    
    // Find the transaction to delete
    const transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === id
    );
    
    if (transactionIndex === -1) {
      throw new Error("Transaction not found");
    }

    // Remove the transaction
    transactions.splice(transactionIndex, 1);

    // Save updated transactions
    await AsyncStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions),
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction");
  }
};

export const updateTransaction = async (updatedTransaction: Transaction): Promise<void> => {
  try {
    // Get existing transactions
    const existingTransactionsJSON = await AsyncStorage.getItem(
      TRANSACTIONS_STORAGE_KEY,
    );
    
    if (!existingTransactionsJSON) {
      throw new Error("No transactions found");
    }

    const transactions: Transaction[] = JSON.parse(existingTransactionsJSON);
    
    // Find the transaction to update
    const transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === updatedTransaction.id
    );
    
    if (transactionIndex === -1) {
      throw new Error("Transaction not found");
    }

    // Update the transaction
    transactions[transactionIndex] = updatedTransaction;

    // Save updated transactions
    await AsyncStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions),
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
};

export const clearAllTransactions = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing transactions:", error);
    throw new Error("Failed to clear transactions");
  }
};

export const saveBudgetCategories = async (
  budgetCategories: BudgetCategory[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      BUDGET_CATEGORIES_STORAGE_KEY,
      JSON.stringify(budgetCategories),
    );
  } catch (error) {
    console.error("Error saving budget categories:", error);
    throw new Error("Failed to save budget categories");
  }
};

export const getBudgetCategories = async (): Promise<BudgetCategory[]> => {
  try {
    const budgetCategoriesJSON = await AsyncStorage.getItem(
      BUDGET_CATEGORIES_STORAGE_KEY,
    );
    if (budgetCategoriesJSON) {
      return JSON.parse(budgetCategoriesJSON);
    }
    return [];
  } catch (error) {
    console.error("Error getting budget categories:", error);
    throw new Error("Failed to retrieve budget categories");
  }
};
