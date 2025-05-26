import { useTransactions } from "../context/TransactionContext";


type Category =
  | "food"
  | "transport"
  | "bills"
  | "shopping"
  | "entertainment"
  | "health"
  | "housing"
  | "income"
  | "other";

interface Transaction {
  amount: number;
  type: "income" | "expense";
  category: Category;
}


export function useTransactionTotals() {
  const { transactions } = useTransactions();

  let incomeTotal = 0;
  let expenseTotal = 0;

  const categoryTotals: Record<Category, number> = {
    food: 0,
    transport: 0,
    bills: 0,
    shopping: 0,
    entertainment: 0,
    health: 0,
    housing: 0,
    income: 0,
    other: 0,
  };

  transactions.forEach((t) => {
    if (t.type === "income") {
      incomeTotal += t.amount;
    } else if (t.type === "expense") {
      expenseTotal += t.amount;

      // ✅ Add to category only if it's an expense
      if (categoryTotals.hasOwnProperty(t.category)) {
        categoryTotals[t.category] += t.amount;
      } else {
        categoryTotals.other += t.amount;
      }
    }
  });

  return {
    incomeTotal,
    expenseTotal,
    ...categoryTotals,
  };
}
