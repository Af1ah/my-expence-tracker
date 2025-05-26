import "react-native-url-polyfill/auto";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "~/src/types/transaction";
import { GoTrueClient } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Initialize GoTrue (Auth) client
export const auth = new GoTrueClient({
  url: `${supabaseUrl}/auth/v1`,
  autoRefreshToken: true,
  persistSession: true,
  storageKey: "supabase.auth.token", // or any unique key
  storage: AsyncStorage,
  fetch: fetch, // Use native fetch API
});

// Initialize Postgrest (Database) client
export const db = new PostgrestClient(`${supabaseUrl}/rest/v1`, {
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
  fetch: fetch, // Use native fetch API
});

// Export a combined object for convenience if needed, though direct imports are better
// export const supabase = {
//   auth,
//   db,
// };

export const saveTransactionToSupabase = async (
  transaction: Transaction,
): Promise<void> => {
  try {
    const { error } = await db.from("transactions").insert([transaction]);

    if (error) throw error;
  } catch (error) {
    console.error("Error saving transaction to Supabase:", error);
    throw new Error("Failed to save transaction to Supabase");
  }
};

// Function to fetch transactions from Supabase
export const getTransactionsFromSupabase = async (): Promise<Transaction[]> => {
  try {
    const { data, error } = await db
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return data as Transaction[];
  } catch (error) {
    console.error("Error fetching transactions from Supabase:", error);
    throw new Error("Failed to fetch transactions from Supabase");
  }
};

// Function to update transaction in Supabase
export const updateTransactionInSupabase = async (
  transaction: Transaction,
): Promise<void> => {
  try {
    const { error } = await db
      .from("transactions")
      .update(transaction)
      .eq("id", transaction.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating transaction in Supabase:", error);
    throw new Error("Failed to update transaction in Supabase");
  }
};

// Function to delete transaction from Supabase
export const deleteTransactionFromSupabase = async (
  transactionId: string,
): Promise<void> => {
  try {
    const { error } = await db
      .from("transactions")
      .delete()
      .eq("id", transactionId);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting transaction from Supabase:", error);
    throw new Error("Failed to delete transaction from Supabase");
  }
};
