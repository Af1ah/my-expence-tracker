// DateSection.tsx - Reusable date section component for grouped transactions

import React from "react";
import { View, Text } from "react-native";
import { Transaction } from "~/src/types/transaction";
import TransactionItem from "./history/TransactionItem";
import { useTheme } from "../context/ThemeContext";

interface DateSectionProps {
  date: string | undefined;
  isDark?: boolean;
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
}

export default function DateSection({
  date,
  transactions,
  onEditTransaction,
  onDeleteTransaction,
  isDark,
}: DateSectionProps) {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark' || isDark;

  if (!date) {
    return null; // or render a placeholder
  }

  return (
    <View>
      <Text className={`p-3 font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {date}
      </Text>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
          isDark={isDark}
        />
      ))}
    </View>
  );
}