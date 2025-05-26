// DateSection.tsx - Reusable date section component for grouped transactions

import React from "react";
import { View, Text } from "react-native";
import { Transaction } from "~/src/types/transaction";
import TransactionItem from "./TransactionItem";
import styles from "~/src/styles/historyStyles";

interface DateSectionProps {
  date: string;
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
}

export default function DateSection({
  date,
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}: DateSectionProps): React.JSX.Element {
  return (
    <View style={styles.dateSection}>
      <Text style={styles.dateSectionTitle}>{date}</Text>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
        />
      ))}
    </View>
  );
}