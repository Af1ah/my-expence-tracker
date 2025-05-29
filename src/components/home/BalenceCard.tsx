import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "~/src/context/ThemeContext";
import { useFixedExpenses } from "~/src/context/FixedExpensesContext";
import { useFormattedCurrency } from "~/src/hooks/useFormattedCurrency";

interface BalanceCardProps {
  balance?: string;
  income?: string;
  expense?: string;
}

// Updated BalanceCard component changes

export default function BalanceCard({
  balance = "₹0",
  income = "₹0",
  expense = "₹0",
}: BalanceCardProps) {
  const { isDarkMode } = useTheme();
  const { getSpendableBalance, getMonthlyTotal } = useFixedExpenses();
  const { formatCurrency } = useFormattedCurrency();

  // Get monthly totals from fixed expenses
  const monthlyFixedIncome = getMonthlyTotal('income');
  const monthlyFixedExpenses = getMonthlyTotal('expense');
  const netFixedAmount = monthlyFixedIncome - monthlyFixedExpenses;

  // Extract numeric value from currency string
  const parseCurrency = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const balanceValue = parseCurrency(balance);
  const incomeValue = parseCurrency(income);
  const expenseValue = parseCurrency(expense);
  
  // Calculate actual spendable balance
  // Current balance + net fixed income/expenses
  const actualSpendableBalance = balanceValue + netFixedAmount;

  const gradientColors = isDarkMode
    ? ["#1e293b", "#0f172a", "#020617"]
    : ["#4c66ef", "#3b4fd3", "#2c3dcb"];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl shadow-lg m-4 overflow-hidden mb-6"
    >
      <View className="p-6">
        {/* Top section with balance info */}
        <View className="border-b border-white/10 pb-4">
          <Text className="text-sm font-medium text-white/80">
            Total Balance
          </Text>
          <Text className="text-4xl font-bold text-white my-2">
            {formatCurrency(balanceValue)}
          </Text>
          
          <View className="flex-row items-center mt-1 bg-white/10 self-start px-3 py-1 rounded-full">
            <Text className="text-white/80 text-sm mr-2">Spendable: </Text>
            <MaterialIcons
              name={actualSpendableBalance >= 0 ? "trending-up" : "trending-down"}
              size={16}
              color={actualSpendableBalance >= 0 ? "#4ADE80" : "#EF4444"}
            />
            <Text className={`text-lg font-bold ml-1 ${
              actualSpendableBalance >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatCurrency(actualSpendableBalance)}
            </Text>
          </View>
          
          {/* Fixed expenses summary */}
          {(monthlyFixedIncome > 0 || monthlyFixedExpenses > 0) && (
            <View className="mt-2 bg-white/5 rounded-lg p-2">
              <Text className="text-white/60 text-xs">Monthly Fixed:</Text>
              <View className="flex-row justify-between mt-1">
                <Text className="text-green-400 text-xs">
                  +{formatCurrency(monthlyFixedIncome)}
                </Text>
                <Text className="text-red-400 text-xs">
                  -{formatCurrency(monthlyFixedExpenses)}
                </Text>
                <Text className={`text-xs font-medium ${
                  netFixedAmount >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {netFixedAmount >= 0 ? '+' : ''}{formatCurrency(netFixedAmount)}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        {/* Bottom section with actions */}
        <View className="flex-row space-x-3 mt-4">
          <ActionButton 
            icon="south-west"
            label="Income"
            sublabel={formatCurrency(incomeValue)}
          />
          <ActionButton 
            icon="north-east"
            label="Expense"
            sublabel={formatCurrency(expenseValue)}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

interface ActionButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  sublabel: string;
}

function ActionButton({ icon, label, sublabel }: ActionButtonProps) {
  return (
    <Pressable 
      className="bg-white/10 rounded-2xl p-4 flex-1 flex-row items-center m-1 justify-between active:bg-white/20"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <View>
        <Text className="text-white font-medium">{label}</Text>
        <Text className="text-white/80 text-xs mt-1">{sublabel}</Text>
      </View>
      <View className="bg-white/20 rounded-full p-2">
        <MaterialIcons name={icon} size={20} color="white" />
      </View>
    </Pressable>
  );
}