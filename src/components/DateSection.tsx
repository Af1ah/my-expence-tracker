// DateSection.tsx - Reusable date section component for grouped transactions

import React from "react";
import { View, Text } from "react-native";
import { Transaction } from "~/src/types/transaction";
import TransactionItem from "./history/TransactionItem";
import { createHistoryStyles } from "~/src/styles/historyStyles";
import { useTheme } from "~/src/hooks/useTheme";

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
  const { theme } = useTheme();
  const styles = React.useMemo(() => createHistoryStyles(theme), [theme]);

  if (!date) {
    return null; // or render a placeholder
  }

  return (
    <View>
      <Text className=" p-3 text-gray-500 font-bold">{date}</Text>
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
