// historyStyles.ts - Updated styles with action buttons

import { StyleSheet } from "react-native";

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  
  // Filter styles
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  filterButton: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeFilterButton: {
    backgroundColor: "#6366F1",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  activeFilterText: {
    color: "#fff",
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
    color: "#374151",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  
  // Transaction item styles
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "capitalize",
  },
  transactionAmount: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",
  },
  
  // Action buttons styles
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f9ff",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  // Add these styles to your historyStyles.js file

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
  marginTop: 15
},

headerTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#000',
},

searchButton: {
  padding: 8,
  borderRadius: 8,
  backgroundColor: '#f5f5f5',
},

searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 16,
  marginVertical: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
},

searchIcon: {
  marginRight: 8,
},

searchInput: {
  flex: 1,
  fontSize: 16,
  color: '#000',
},

clearButton: {
  padding: 4,
},
});

export default styles;