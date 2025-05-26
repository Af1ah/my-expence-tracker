import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "~/src/styles/analyticsStyles";
import { StatusBar } from "expo-status-bar";
import { useTransactionTotals } from "~/src/hooks/useTransactionTotals";
import { getTransactions } from "~/src/utils/storage";
import { Transaction } from "~/src/types/transaction";
import {
  getWeeklyTotalsForMonth,
  getDailyTotalsForWeek,
  getMonthlyTotalsForYear,
} from "~/src/utils/getChartData";

// Import components
import { TimeFilter } from "~/src/components/analytics/TimeFilter";
import { SpendingChart } from "~/src/components/analytics/SpendingChart";
import { CategoryList } from "~/src/components/analytics/CategoryList";
import { InsightsList } from "~/src/components/analytics/InsightsList";
import { HeaderDropdown } from "~/src/components/common/HeaderDropdown";

type ChartPoint = {
  date: string;
  amount: number;
};

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

interface InsightItem {
  type: "warning" | "success";
  title: string;
  description: string;
  color: string;
  borderColor: string;
}

export default function AnalyticsScreen(): React.JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [monthDate, setMonthDate] = useState(new Date());

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const {
    food,
    shopping,
    transport,
    bills,
    entertainment,
    housing,
    health,
    other,
  } = useTransactionTotals();

  const chartData = useMemo((): ChartPoint[] => {
    switch (selectedPeriod) {
      case "week":
        return getDailyTotalsForWeek(transactions);
      case "month":
        return getWeeklyTotalsForMonth(monthDate, transactions);
      case "year":
        return getMonthlyTotalsForYear(transactions);
      default:
        return [];
    }
  }, [selectedPeriod, transactions, monthDate]);

  const topCategories = useMemo((): CategoryData[] => {
    const categories = [
      { name: "Food", amount: food, color: "#6366F1" },
      { name: "Transport", amount: transport, color: "#10B981" },
      { name: "Shopping", amount: shopping, color: "#EF4444" },
      { name: "Bills", amount: bills, color: "#F59E0B" },
      { name: "Entertainment", amount: entertainment, color: "#8B5CF6" },
      { name: "Housing", amount: housing, color: "#3B82F6" },
      { name: "Health", amount: health, color: "#F43F5E" },
      { name: "Other", amount: other, color: "#6B7280" },
    ];

    const filteredCategories = categories
      .filter(cat => cat.amount > 0)
      .sort((a, b) => b.amount - a.amount);

    const total = filteredCategories.reduce((sum, cat) => sum + cat.amount, 0);

    return filteredCategories
      .slice(0, 4)
      .map(cat => ({
        ...cat,
        percentage: total > 0 ? (cat.amount / total) * 100 : 0
      }));
  }, [food, transport, shopping, bills, entertainment, housing, health, other]);

  const insights = useMemo((): InsightItem[] => {
    const totalSpending = topCategories.reduce((sum, cat) => sum + cat.amount, 0);
    const topCategory = topCategories[0];
    
    const insightsList: InsightItem[] = [];

    if (topCategory?.name === "Food" && topCategory.amount > 500) {
      insightsList.push({
        type: "warning",
        title: "Food expenses are higher than usual",
        description: "Your food spending is 15% higher than last month.",
        color: "#FEF3C7",
        borderColor: "#F59E0B"
      });
    }

    if (totalSpending < 2000) {
      insightsList.push({
        type: "success",
        title: "You're saving more this month",
        description: "You've saved 8% more compared to your average.",
        color: "#D1FAE5",
        borderColor: "#10B981"
      });
    }

    return insightsList;
  }, [topCategories]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <HeaderDropdown title="Analytics" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Analysis</Text>
          <TimeFilter 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={setSelectedPeriod} 
          />
          <SpendingChart data={chartData} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Spending Categories</Text>
            <Text style={styles.periodLabel}>This Month</Text>
          </View>
          <CategoryList categories={topCategories} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <InsightsList insights={insights} />
        </View>
      </ScrollView>
    </View>
  );
}