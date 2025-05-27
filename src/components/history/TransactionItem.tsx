import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormattedCurrency } from "~/src/hooks/useFormattedCurrency";
import { Transaction } from "~/src/types/transaction";
import { getCategoryIcon } from "~/src/utils/categoryUtils";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction, onEdit, onDelete, isDark }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      food: "#6366F1",
      transport: "#10B981",
      shopping: "#EF4444",
      bills: "#F59E0B",
      entertainment: "#8B5CF6",
      health: "#F43F5E",
      housing: "#3B82F6",
      other: "#6B7280",
    };
    return colors[category] || colors.other;
  };

    const { formatCurrency } = useFormattedCurrency();
  

 

  const getAmountColor = (type: string, isDark: boolean) => {
    if (type === "income") {
      return isDark ? "#10B981" : "#059669";
    }
    return isDark ? "#EF4444" : "#DC2626";
  };

  return (
    <TouchableOpacity onPress={() => onEdit(transaction)} activeOpacity={0.9}>
      <View style={[styles.transactionItem, isDark && styles.transactionItemDark]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getCategoryColor(transaction.category) + "20" },
        ]}
      >
       <Ionicons
          name={getCategoryIcon(transaction.category)}
          size={20}
          color={getCategoryColor(transaction.category)}
        />
      </View>

      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionTitle, isDark && styles.transactionTitleDark]}>
          {transaction.title}
        </Text>
        <Text style={[styles.transactionCategory, isDark && styles.transactionCategoryDark]}>
          {transaction.category} • {transaction.time || "00:00"}
        </Text>
      </View>

      <View style={styles.transactionAmount}>
        <Text style={[styles.amountText, { color: getAmountColor(transaction.type, isDark) }]}>
          {formatCurrency(transaction.amount, transaction.type)}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.editButton, isDark && styles.editButtonDark]}
          onPress={() => onEdit(transaction)}
        >
          <MaterialIcons name="edit" size={16} color={isDark ? "#60A5FA" : "#3B82F6"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteButton, isDark && styles.deleteButtonDark]}
          onPress={() => onDelete(transaction.id)}
        >
          <MaterialIcons name="delete" size={16} color={isDark ? "#F87171" : "#EF4444"} />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 2,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItemDark: {
    backgroundColor: "#1F2937",
    shadowColor: "#000",
    shadowOpacity: 0.3,
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
    color: "#111827",
    marginBottom: 2,
  },
  transactionTitleDark: {
    color: "#F9FAFB",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#6B7280",
    textTransform: "capitalize",
  },
  transactionCategoryDark: {
    color: "#9CA3AF",
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
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#EBF8FF",
  },
  editButtonDark: {
    backgroundColor: "#1E3A8A",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FEE2E2",
  },
  deleteButtonDark: {
    backgroundColor: "#7F1D1D",
  },
});

export default TransactionItem;