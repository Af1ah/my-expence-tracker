// HistoryScreen.tsx - Fixed version

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactions } from "~/src/context/TransactionContext";
import { TransactionFilter, Transaction } from "~/src/types/transaction";
import styles from "~/src/styles/historyStyles";
import AddTransactionButton from "~/src/components/AddTransactionButton";
import FilterBar from "~/src/components/FilterBar";
import DateSection from "~/src/components/DateSection";

export default function HistoryScreen() {
  const { transactions, isLoading, error, deleteTransaction } = useTransactions();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Define filters
  const filters: TransactionFilter[] = [
    { id: "all", label: "All" },
    { id: "income", label: "Income", type: "income" },
    { id: "expense", label: "Expense", type: "expense" },
    { id: "food", label: "Food", category: "food" },
    { id: "transport", label: "Transport", category: "transport" },
    { id: "shopping", label: "Shopping", category: "shopping" },
    { id: "bills", label: "Bills", category: "bills" },
    { id: "entertainment", label: "Entertainment", category: "entertainment" },
    { id: "health", label: "Health", category: "health" },
    { id: "housing", label: "Housing", category: "housing" },
    { id: "other", label: "Other", category: "other" },
  ];

  // Apply filters and search when activeFilter, transactions, or searchQuery change
  useEffect(() => {
    let filtered = [...transactions]; // Create a copy to avoid mutation

    // Apply category/type filter
    if (activeFilter !== "all") {
      const filter = filters.find((f) => f.id === activeFilter);
      if (filter) {
        filtered = filtered.filter((transaction) => {
          if (filter.type) return transaction.type === filter.type;
          if (filter.category) return transaction.category === filter.category;
          return true;
        });
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.amount.toString().includes(searchQuery) ||
        (transaction.note && transaction.note.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTransactions(filtered);
  }, [activeFilter, transactions, searchQuery, filters]); // Added filters to dependencies

  // Group transactions by date
  const groupTransactionsByDate = () => {
    const groupedData: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach((transaction) => {
      let dateKey = transaction.date;

      const today = new Date().toISOString().split("T")[0];
      if (dateKey === today) {
        dateKey = "Today";
      } else {
        // Format date as "Month Day, Year"
        const date = new Date(dateKey);
        if (!isNaN(date.getTime())) { // Check if date is valid
          dateKey = `${date.toLocaleString("default", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
        }
      }

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }

      groupedData[dateKey].push(transaction);
    });

    // Convert to array for FlatList and sort by date (most recent first)
    return Object.entries(groupedData)
      .map(([date, transactions]) => ({
        date,
        transactions: transactions.sort((a, b) => {
          // Sort by time if available, otherwise by creation order
          if (a.time && b.time) {
            return b.time.localeCompare(a.time);
          }
          return 0;
        }),
      }))
      .sort((a, b) => {
        // Sort sections with "Today" first
        if (a.date === "Today") return -1;
        if (b.date === "Today") return 1;
        
        // For other dates, sort by the actual date of the first transaction
        const dateA = new Date(a.transactions[0].date);
        const dateB = new Date(b.transactions[0].date);
        
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0; // If dates are invalid, maintain current order
        }
        
        return dateB.getTime() - dateA.getTime();
      });
  };

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    // Navigate to edit screen with transaction data
    router.push({
      pathname: "../../addtransaction",
      params: {
        editMode: "true",
        transactionId: transaction.id,
        title: transaction.title,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
        time: transaction.time || "",
        note: transaction.note || "",
      },
    });
  };

  // Handle delete transaction
  const handleDeleteTransaction = async (transactionId: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction(transactionId);
              Alert.alert("Success", "Transaction deleted successfully");
            } catch (error) {
              console.error("Delete transaction error:", error);
              Alert.alert("Error", "Failed to delete transaction. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Handle filter change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  // Handle retry on error
  const handleRetry = () => {
    // This would typically trigger a refetch of transactions
    // Implementation depends on your TransactionContext
    console.log("Retrying to fetch transactions...");
  };

  const renderDateSection = ({
    item,
  }: {
    item: { date: string; transactions: Transaction[] };
  }) => (
    <DateSection
      date={item.date}
      transactions={item.transactions}
      onEditTransaction={handleEditTransaction}
      onDeleteTransaction={handleDeleteTransaction}
    />
  );

  // Memoize grouped data to prevent unnecessary recalculations
  const groupedData = React.useMemo(() => {
    return groupTransactionsByDate();
  }, [filteredTransactions]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchToggle}>
          <MaterialIcons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
              <MaterialIcons name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Filters */}
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Transactions List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="receipt-long" size={64} color="#ccc" />
          <Text style={styles.emptyText}>
            {searchQuery.trim() 
              ? `No transactions found matching "${searchQuery}"` 
              : activeFilter === "all" 
                ? "No transactions found" 
                : `No ${activeFilter} transactions found`
            }
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("../../addtransaction")}
          >
            <Text style={styles.addButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={groupedData}
          renderItem={renderDateSection}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}

      {/* Floating Action Button */}
      <AddTransactionButton />
    </View>
  );
}