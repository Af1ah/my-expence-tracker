import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import BalanceCard from '~/src/components/BalenceCard';
import PerformanceChart from '~/src/components/PieChartCard';
import { useTransactionTotals } from '~/src/hooks/useTransactionTotals';
import AddTransactionButton from '~/src/components/AddTransactionButton';
import { scheduleLocalNotification } from '~/src/lib/notifications';
import { useFormattedCurrency } from '~/src/hooks/useFormattedCurrency';

export default function index() {
    const { formatCurrency } = useFormattedCurrency();
  
  const {
    incomeTotal,
    expenseTotal,
    food,
    shopping,
    transport,
    housing,
    health,
    other,
    bills,
    entertainment,
  } = useTransactionTotals();

  const balance = incomeTotal - expenseTotal;
  const safePercent = (amount: number) =>
    incomeTotal > 0 ? Math.round((amount * 100) / expenseTotal) : 0;

  const spendingData = [
    {
      value: safePercent(food),
      color: '#6366F1', // Indigo
      gradientCenterColor: '#6366F1',
      label: 'Food',
    },
    {
      value: safePercent(shopping),
      color: '#93FCF8', // Light teal
      gradientCenterColor: '#3BE9DE',
      label: 'Shopping',
    },
    {
      value: safePercent(transport),
      color: '#F59E0B', // Amber
      gradientCenterColor: '#FBBF24',
      label: 'Transport',
    },
    {
      value: safePercent(housing),
      color: '#60A5FA', // Blue
      gradientCenterColor: '#3B82F6',
      label: 'Housing',
    },
    {
      value: safePercent(health),
      color: '#10B981', // Emerald
      gradientCenterColor: '#34D399',
      label: 'Health',
    },
    {
      value: safePercent(entertainment),
      color: '#EC4899', // Pink
      gradientCenterColor: '#F472B6',
      label: 'Entertainment',
    },
    {
      value: safePercent(bills),
      color: '#A78BFA', // Violet
      gradientCenterColor: '#8B5CF6',
      label: 'Bills',
    },
    {
      value: safePercent(other),
      color: '#9CA3AF', // Gray
      gradientCenterColor: '#6B7280',
      label: 'Other',
    },
  ].filter((item) => item.value > 0); // ✅ optional: remove 0-value categories from chart

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <BalanceCard
        balance={formatCurrency(balance)}
        income={formatCurrency(incomeTotal)}
        expense={formatCurrency(expenseTotal)}
      />
      <PerformanceChart title="Spending" data={spendingData} />
      <Button
        title="Show Notification in 5 seconds"
        onPress={() => scheduleLocalNotification('Hey Aflah, this is your custom notification!', 5)
          
        }
      />
      <AddTransactionButton />
    </ScrollView>
  );
}
