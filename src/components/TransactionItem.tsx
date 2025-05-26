// TransactionItem.tsx - Reusable transaction item component with edit/delete functionality

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Transaction } from "~/src/types/transaction";
import { getCategoryIcon } from "../types/Iconstypes";
import styles from "~/src/styles/historyStyles";
import { useFormattedCurrency } from "../hooks/useFormattedCurrency";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}
   

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps): React.JSX.Element {
  // Background color based on category
  const getBgColor = (category: string, type: string): string => {
    if (type === "income") return "#10B981";
    
    const bgColors: { [key: string]: string } = {
      food: "#FF6B6B",
      transport: "#4ECDC4",
      bills: "#FFD166",
      shopping: "#F06292",
      entertainment: "#A78BFA",
      health: "#06D6A0",
      housing: "#118AB2",
      other: "#B5B5B5",
    };
    
    return bgColors[category] || "#6C757D";
  };

  // Get icon name for category
  const getIconName = (category: string): keyof typeof Ionicons.glyphMap => {
    // Capitalize first letter to match the mapping
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return getCategoryIcon(capitalizedCategory);
  };

  // Handle delete with confirmation
  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete "${transaction.title}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(transaction.id),
        },
      ],
      { cancelable: true }
    );
  };

  const bgColor = getBgColor(transaction.category, transaction.type);
  const amountColor = transaction.type === "income" ? "#10B981" : "#EF4444";
  const iconName = getIconName(transaction.category);
   const { formatCurrency } = useFormattedCurrency();

  return (
    <TouchableOpacity style={styles.transactionItem} onPress={() => onEdit(transaction)}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName} size={20} color="#fff" />
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
      </View>
      
      <View style={styles.transactionAmount}>
        <Text style={[styles.amountText, { color: amountColor }]}>
          {formatCurrency(transaction.amount, transaction.type)}
        </Text>
        <Text style={styles.timeText}>{transaction.time}</Text>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(transaction)}
        >
          <Ionicons name="create-outline" size={18} color="#6366F1" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}