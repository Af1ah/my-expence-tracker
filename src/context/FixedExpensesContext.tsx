// context/FixedExpensesContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { FixedExpense, FixedExpenseContextType } from "../types/fixedExpenses";
import { 
  getFixedExpenses, 
  saveFixedExpense, 
  deleteFixedExpense as deleteFixedExpenseStorage,
  calculateMonthlyEquivalent 
} from "../utils/fixedExpensesStorage";

const FixedExpenseContext = createContext<FixedExpenseContextType | undefined>(
  undefined,
);

export const FixedExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFixedExpenses = async () => {
      try {
        setIsLoading(true);
        const storedExpenses = await getFixedExpenses();
        setFixedExpenses(storedExpenses);
      } catch (err) {
        setError("Failed to load fixed expenses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFixedExpenses();
  }, []);

  const addFixedExpense = async (expenseData: Omit<FixedExpense, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const now = new Date().toISOString();
      const newExpense: FixedExpense = {
        ...expenseData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: now,
        updatedAt: now,
      };

      await saveFixedExpense(newExpense);
      setFixedExpenses((prev) => [...prev, newExpense]);
      setError(null);
    } catch (err) {
      setError("Failed to add fixed expense");
      console.error(err);
      throw err;
    }
  };

  const updateFixedExpense = async (updatedExpense: FixedExpense): Promise<void> => {
    try {
      const expenseWithUpdatedTime = {
        ...updatedExpense,
        updatedAt: new Date().toISOString(),
      };

      await saveFixedExpense(expenseWithUpdatedTime);
      
      setFixedExpenses((prev) => 
        prev.map((expense) => 
          expense.id === updatedExpense.id ? expenseWithUpdatedTime : expense
        )
      );
      
      setError(null);
    } catch (err) {
      setError("Failed to update fixed expense");
      console.error(err);
      throw err;
    }
  };

  const deleteFixedExpense = async (id: string): Promise<void> => {
    try {
      await deleteFixedExpenseStorage(id);
      setFixedExpenses((prev) => prev.filter((expense) => expense.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete fixed expense");
      console.error(err);
      throw err;
    }
  };

  const toggleExpenseActive = async (id: string): Promise<void> => {
    try {
      const expense = fixedExpenses.find(exp => exp.id === id);
      if (!expense) throw new Error("Expense not found");

      const updatedExpense = {
        ...expense,
        isActive: !expense.isActive,
        updatedAt: new Date().toISOString(),
      };

      await updateFixedExpense(updatedExpense);
    } catch (err) {
      setError("Failed to toggle expense status");
      console.error(err);
      throw err;
    }
  };

  const getUpcomingExpenses = (days: number): FixedExpense[] => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return fixedExpenses.filter(expense => {
      if (!expense.isActive) return false;
      
      const dueDate = new Date(expense.nextDueDate);
      return dueDate >= now && dueDate <= futureDate;
    }).sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime());
  };

  const getMonthlyTotal = (type: 'income' | 'expense'): number => {
    return fixedExpenses
      .filter(expense => expense.type === type && expense.isActive)
      .reduce((total, expense) => {
        return total + calculateMonthlyEquivalent(expense.amount, expense.frequency);
      }, 0);
  };

  const getSpendableBalance = (): number => {
    const monthlyIncome = getMonthlyTotal('income');
    const monthlyExpenses = getMonthlyTotal('expense');
    return monthlyIncome - monthlyExpenses;
  };

  return (
    <FixedExpenseContext.Provider
      value={{
        fixedExpenses,
        addFixedExpense,
        updateFixedExpense,
        deleteFixedExpense,
        toggleExpenseActive,
        getUpcomingExpenses,
        getMonthlyTotal,
        getSpendableBalance,
        isLoading,
        error,
      }}
    >
      {children}
    </FixedExpenseContext.Provider>
  );
};

export const useFixedExpenses = (): FixedExpenseContextType => {
  const context = useContext(FixedExpenseContext);
  if (context === undefined) {
    throw new Error(
      "useFixedExpenses must be used within a FixedExpenseProvider",
    );
  }
  return context;
};