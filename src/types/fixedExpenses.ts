// types/fixedExpenses.ts

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'weekly' | 'monthly' | 'biweekly' | 'quarterly' | 'yearly';
  nextDueDate: string; // ISO date string
  isActive: boolean;
  reminderEnabled: boolean;
  reminderDaysBefore: number;
  category?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FixedExpenseContextType {
  fixedExpenses: FixedExpense[];
  addFixedExpense: (expense: Omit<FixedExpense, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFixedExpense: (expense: FixedExpense) => Promise<void>;
  deleteFixedExpense: (id: string) => Promise<void>;
  toggleExpenseActive: (id: string) => Promise<void>;
  getUpcomingExpenses: (days: number) => FixedExpense[];
  getMonthlyTotal: (type: 'income' | 'expense') => number;
  getSpendableBalance: () => number;
  isLoading: boolean;
  error: string | null;
}

export interface FrequencyOption {
  value: FixedExpense['frequency'];
  label: string;
  days: number;
}

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { value: 'weekly', label: 'Weekly', days: 7 },
  { value: 'biweekly', label: 'Bi-weekly', days: 14 },
  { value: 'monthly', label: 'Monthly', days: 30 },
  { value: 'quarterly', label: 'Quarterly', days: 90 },
  { value: 'yearly', label: 'Yearly', days: 365 },
];

export const EXPENSE_CATEGORIES = [
  'Rent/Mortgage',
  'Utilities',
  'Insurance',
  'Subscriptions',
  'Loan EMI',
  'Phone Bill',
  'Internet',
  'Gym Membership',
  'Salary',
  'Freelance',
  'Investment Returns',
  'Other',
];