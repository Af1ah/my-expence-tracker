import React, { FC,useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactions } from "~/src/context/TransactionContext";
import { TransactionFilter, Transaction } from "~/src/types/transaction";
import AddTransactionButton from "~/src/components/AddTransactionButton";
import DateSection from "~/src/components/DateSection";
import { useTheme } from "~/src/context/ThemeContext";


interface FilterBarProps {
  filters: TransactionFilter[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  isDark: boolean;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

interface DateSectionProps {
  date: string;
  transactions: Transaction[];
  onEditTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  isDark: boolean;
}

// Enhanced FilterBar Component
// ✅ FilterBar Component
const FilterBar: FC<FilterBarProps> = ({ filters, activeFilter, onFilterChange, isDark }) => {
  return (
    <View style={[styles.filtersContainer, isDark && styles.filtersContainerDark]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              isDark && styles.filterButtonDark,
              activeFilter === filter.id && styles.activeFilterButton,
              activeFilter === filter.id && isDark && styles.activeFilterButtonDark,
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                isDark && styles.filterTextDark,
                activeFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


export default function HistoryScreen() {
  const {  isDarkMode, toggleTheme } = useTheme();
  const { transactions, isLoading, error, deleteTransaction } = useTransactions();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Define filters - memoized to prevent recreation on every render
  const filters: TransactionFilter[] = useMemo(() => [
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
  ], []);

  // Apply filters and search when activeFilter, transactions, or searchQuery change
  useEffect(() => {
    let filtered = [...(transactions || [])]; // Create a copy to avoid mutation

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
  }, [activeFilter, transactions, searchQuery, filters]);

  // Group transactions by date
  const groupTransactionsByDate = () => {
    const groupedData: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach((transaction) => {
      let dateKey = transaction.date;

      if (!dateKey) {
        return; // Skip transactions with no date
      }

      const today = new Date().toISOString().split("T")[0];
      if (dateKey === today) {
        dateKey = "Today";
      } else {
        // Format date as "Month Day, Year"
        const date = new Date(dateKey);
        if (!isNaN(date.getTime())) { // Check if date is valid
          dateKey = `${date.toLocaleString("default", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
        } else {
          return; // Skip transactions with invalid dates
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
          return 0; // If dates are invalid, maintain order
        }
        
        return dateB.getTime() - dateA.getTime();
      });
  };

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
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
      isDark={isDarkMode}
    />
  );

  // Memoize grouped data to prevent unnecessary recalculations
  const groupedData = useMemo(() => {
    return groupTransactionsByDate();
  }, [filteredTransactions]);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>
          History
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.searchButton, isDarkMode && styles.searchButtonDark]} 
            onPress={handleSearchToggle}
          >
            <MaterialIcons 
              name="search" 
              size={24} 
              color={isDarkMode ? "#E5E7EB" : "#374151"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.themeButton, isDarkMode && styles.themeButtonDark]} 
            onPress={toggleTheme}
          >
            <MaterialIcons 
              name={isDarkMode ? "light-mode" : "dark-mode"} 
              size={24} 
              color={isDarkMode ? "#E5E7EB" : "#374151"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <View style={[styles.searchContainer, isDarkMode && styles.searchContainerDark]}>
          <MaterialIcons 
            name="search" 
            size={20} 
            color={isDarkMode ? "#9CA3AF" : "#6B7280"} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
            placeholder="Search transactions..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
              <MaterialIcons 
                name="clear" 
                size={20} 
                color={isDarkMode ? "#9CA3AF" : "#6B7280"} 
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Filters */}
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        isDark={isDarkMode}
      />

      {/* Transactions List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={[styles.loadingText, isDarkMode && styles.loadingTextDark]}>
            Loading transactions...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons 
            name="error-outline" 
            size={64} 
            color={isDarkMode ? "#F87171" : "#EF4444"} 
          />
          <Text style={[styles.errorText, isDarkMode && styles.errorTextDark]}>
            {error}
          </Text>
          <TouchableOpacity 
            style={[styles.retryButton, isDarkMode && styles.retryButtonDark]} 
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons 
            name="receipt-long" 
            size={64} 
            color={isDarkMode ? "#6B7280" : "#9CA3AF"} 
          />
          <Text style={[styles.emptyText, isDarkMode && styles.emptyTextDark]}>
            {searchQuery.trim() 
              ? `No transactions found matching "${searchQuery}"` 
              : activeFilter === "all" 
                ? "No transactions found" 
                : `No ${activeFilter} transactions found`
            }
          </Text>
          <TouchableOpacity
            style={[styles.addButton, isDarkMode && styles.addButtonDark]}
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
      )
      
      }

      {/* Floating Action Button */}
      <AddTransactionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  containerDark: {
    backgroundColor: "#111827",
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginTop: 16,
  },
  headerDark: {
    backgroundColor: "#1F2937",
    borderBottomColor: "#374151",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  headerTitleDark: {
    color: "#F9FAFB",
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  searchButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  searchButtonDark: {
    backgroundColor: "#374151",
  },
  themeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  themeButtonDark: {
    backgroundColor: "#374151",
  },

  // Search styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  searchContainerDark: {
    backgroundColor: "#374151",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  searchInputDark: {
    color: "#F9FAFB",
  },
  clearButton: {
    padding: 4,
  },
  
  // Filter styles
  filtersContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filtersContainerDark: {
    backgroundColor: "#1F2937",
    borderBottomColor: "#374151",
  },
  filtersScrollContent: {
    paddingHorizontal: 12,
  },
  filterButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  filterButtonDark: {
    backgroundColor: "#374151",
  },
  activeFilterButton: {
    backgroundColor: "#6366F1",
  },
  activeFilterButtonDark: {
    backgroundColor: "#4F46E5",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  filterTextDark: {
    color: "#D1D5DB",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  
  // List styles
  listContent: {
    paddingBottom: 100,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  dateSectionTitleDark: {
    color: "#9CA3AF",
  },
  
  
  
 
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  loadingTextDark: {
    color: "#9CA3AF",
  },
  
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
  },
  errorTextDark: {
    color: "#F87171",
  },
  retryButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonDark: {
    backgroundColor: "#4F46E5",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  emptyTextDark: {
    color: "#9CA3AF",
  },
  addButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonDark: {
    backgroundColor: "#4F46E5",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});