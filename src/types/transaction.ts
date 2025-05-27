
export type TransactionType = 'income' | 'expense';

export type CategoryType = 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'health' | 'housing'  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  title: string;
  category: CategoryType;
  type: TransactionType;
  date: string;
  time: string;
  note?: string;
}

export interface TransactionFilter {
  id: string;
  label: string;
  type?: TransactionType;
  category?: CategoryType;
}

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