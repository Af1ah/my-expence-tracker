import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Transaction } from "./../types/transaction";
import { getTransactions, saveTransaction, deleteTransaction } from "./../utils/storage";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        const storedTransactions = await getTransactions();
        setTransactions(storedTransactions);
      } catch (err) {
        setError("Failed to load transactions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = async (transaction: Transaction): Promise<void> => {
    try {
      await saveTransaction(transaction);
      setTransactions((prev) => [...prev, transaction]);
    } catch (err) {
      setError("Failed to add transaction");
      console.error(err);
      throw err;
    }
  };

  const updateTransaction = async (updatedTransaction: Transaction): Promise<void> => {
    try {
      // First delete the old transaction
      await deleteTransaction(updatedTransaction.id);
      // Then add the updated transaction
      await saveTransaction(updatedTransaction);
      
      // Update local state
      setTransactions((prev) => 
        prev.map((transaction) => 
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        )
      );
      
      // Clear any previous errors on successful update
      setError(null);
    } catch (err) {
      setError("Failed to update transaction");
      console.error(err);
      throw err;
    }
  };

  const deleteTransactionHandler = async (id: string): Promise<void> => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
      // Clear any previous errors on successful delete
      setError(null);
    } catch (err) {
      setError("Failed to delete transaction");
      console.error(err);
      throw err;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction: deleteTransactionHandler,
        isLoading,
        error,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider",
    );
  }
  return context;
};