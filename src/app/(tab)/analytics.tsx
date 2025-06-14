import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
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
import { router } from "expo-router";
import { useFormattedCurrency } from "~/src/hooks/useFormattedCurrency";
import { useTheme } from "~/src/context/ThemeContext";

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
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Separate Insights Component
const InsightsCard: React.FC<{ insights: InsightItem[] }> = ({ insights }) => {
  const {theme} = useTheme();
  const styles = getStyles(theme)

  if (insights.length === 0) {
    return (
      <View style={styles.insightEmptyCard}>
        <View style={styles.insightEmptyContent}>
          <Ionicons name="analytics-outline" size={24} color="#9CA3AF" />
          <Text style={styles.insightEmptyText}>No insights available yet</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.insightsContainer}>
      {insights.map((insight, index) => (
        <View
          key={index}
          style={[
            styles.insightCard,
            {
              borderLeftColor: insight.type === 'warning' 
                ? '#EF4444' 
                : insight.type === 'success' 
                  ? '#10B981' 
                  : '#3B82F6'
            }
          ]}
        >
          <View style={styles.insightContent}>
            <View
              style={[
                styles.insightIconContainer,
                {
                  backgroundColor: insight.type === 'warning' 
                    ? '#FEF2F2' 
                    : insight.type === 'success' 
                      ? '#F0FDF4' 
                      : '#EFF6FF'
                }
              ]}
            >
              <Ionicons 
                name={insight.icon as any} 
                size={20} 
                color={insight.color} 
              />
            </View>
            <View style={styles.insightTextContainer}>
              <Text style={styles.insightTitle}>
                {insight.title}
              </Text>
              <Text style={styles.insightDescription}>
                {insight.description}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function AnalyticsScreen(): React.JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [monthDate, setMonthDate] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const {theme} = useTheme();
  const styles = getStyles(theme)

  const { formatCurrency } = useFormattedCurrency();

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
      { name: "Food", amount: food, color: "#4F46E5" },
      { name: "Transport", amount: transport, color: "#F59E0B" },
      { name: "Shopping", amount: shopping, color: "#EC4899" },
      { name: "Bills", amount: bills, color: "#10B981" },
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

  // Enhanced insights with real budget data
  const insights = useMemo((): InsightItem[] => {
    const insightsList: InsightItem[] = [];
    const totalSpending = food + transport + shopping + bills + entertainment + housing + health + other;
    
    // Budget limits from BudgetScreen (matching the values)
    const budgetLimits = {
      food: 800,
      transport: 500,
      bills: 400,
      shopping: 300,
      entertainment: 300,
      housing: 300,
      health: 300,
      other: 300
    };

    const totalBudget = Object.values(budgetLimits).reduce((sum, limit) => sum + limit, 0);
    const budgetUsagePercentage = (totalSpending / totalBudget) * 100;

    // Top spending category
    const topCategory = topCategories[0];

    // Budget usage insights
    if (budgetUsagePercentage > 90) {
      insightsList.push({
        type: "warning",
        title: "Budget Alert",
        description: `You've used ${budgetUsagePercentage.toFixed(0)}% of your total budget (${formatCurrency(totalSpending)} of ${formatCurrency(totalBudget)})`,
        icon: "warning-outline",
        color: "#EF4444"
      });
    } else if (budgetUsagePercentage < 60) {
      insightsList.push({
        type: "success",
        title: "Great Budget Control",
        description: `You're doing well! Only ${budgetUsagePercentage.toFixed(0)}% of your budget used. You have ${formatCurrency(totalBudget - totalSpending)} remaining.`,
        icon: "checkmark-circle-outline",
        color: "#10B981"
      });
    }

    // Category-specific insights
    if (food > budgetLimits.food) {
      const overspend = food - budgetLimits.food;
      insightsList.push({
        type: "warning",
        title: "Food Budget Exceeded",
        description: `You've spent ${formatCurrency(food)} on food, which is ${formatCurrency(overspend)} over your ${formatCurrency(budgetLimits.food)} budget.`,
        icon: "restaurant-outline",
        color: "#EF4444"
      });
    }

    if (transport > budgetLimits.transport) {
      const overspend = transport - budgetLimits.transport;
      insightsList.push({
        type: "warning",
        title: "Transport Budget Exceeded",
        description: `Transport costs of ${formatCurrency(transport)} exceeded your ${formatCurrency(budgetLimits.transport)} budget by ${formatCurrency(overspend)}.`,
        icon: "car-outline",
        color: "#EF4444"
      });
    }

    // Positive insights for categories under budget
    if (food < budgetLimits.food * 0.8 && food > 0) {
      const saved = budgetLimits.food - food;
      insightsList.push({
        type: "success",
        title: "Food Savings",
        description: `You've saved ${formatCurrency(saved)} on food this month! Keep up the good work.`,
        icon: "leaf-outline",
        color: "#10B981"
      });
    }

    // Days remaining insight
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysRemaining = lastDayOfMonth - today.getDate();
    const dailyBudgetRemaining = (totalBudget - totalSpending) / Math.max(daysRemaining, 1);

    if (daysRemaining > 0) {
      insightsList.push({
        type: "info",
        title: "Daily Budget Remaining",
        description: `With ${daysRemaining} days left this month, you can spend ${formatCurrency(dailyBudgetRemaining)} per day to stay on budget.`,
        icon: "calendar-outline",
        color: "#3B82F6"
      });
    }

    return insightsList;
  }, [topCategories, food, transport, shopping, bills, entertainment, housing, health, other, formatCurrency]);

  // Handle menu item clicks
  const handleMenuItemPress = (action: string) => {
    setShowMenu(false);
    
    switch (action) {
      case 'settings':
        router.push("/SettingsScreen");
        break;
      case 'help':
        console.log("Help pressed");
        break;
      case 'export':
        console.log("Export pressed");
        break;
      default:
        break;
    }
  };

  // Close menu when touching outside
  const handleOutsidePress = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCard}>
          <View style={styles.loadingContent}>
            <View style={styles.loadingIndicator}>
              <View style={styles.loadingDot} />
            </View>
            <Text style={styles.loadingText}>Loading analytics...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Modern Header - Fixed position */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Analytics</Text>
            <Text style={styles.headerSubtitle}>Track your spending patterns</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.headerIconContainer}>
              <Ionicons name="analytics" size={20} color="#4F46E5" />
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => setShowMenu(!showMenu)}
                activeOpacity={0.7}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
              </TouchableOpacity>
              
              {showMenu && (
                <View style={styles.dropdown}>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => handleMenuItemPress('settings')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="settings-outline" size={18} color="#6B7280" />
                    <Text style={styles.dropdownText}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => handleMenuItemPress('help')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="help-circle-outline" size={18} color="#6B7280" />
                    <Text style={styles.dropdownText}>Help</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => handleMenuItemPress('export')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="download-outline" size={18} color="#6B7280" />
                    <Text style={styles.dropdownText}>Export Data</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.scrollableContent}>
            {/* Spending Analysis Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Spending Analysis</Text>
                <View style={styles.trendsBadge}>
                  <Text style={styles.trendsText}>TRENDS</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <TimeFilter
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                />
              </View>
              <View style={styles.chartContainer}>
                <SpendingChart data={chartData} />
              </View>
            </View>

            {/* Top Categories Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Top Categories</Text>
                <View style={styles.monthBadge}>
                  <Text style={styles.monthText}>THIS MONTH</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                {topCategories.length > 0 ? (
                  <CategoryList categories={topCategories} />
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="pie-chart-outline" size={32} color="#9CA3AF" />
                    <Text style={styles.emptyStateText}>No spending data available</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Insights Section */}
            <View style={styles.insightsSection}>
              <View style={styles.insightsHeader}>
                <Text style={styles.insightsSectionTitle}>Smart Insights</Text>
                <View style={styles.aiBadge}>
                  <Text style={styles.aiText}>AI POWERED</Text>
                </View>
              </View>
              <InsightsCard insights={insights} />
            </View>

            {/* Bottom spacing */}
            <View style={styles.bottomSpacing} />
          </View>
        </TouchableWithoutFeedback>
            <View className="h-24"/>
      </ScrollView>
      
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 32,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    width: 24,
    height: 24,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    marginRight: 12,
  },
  loadingDot: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
  },
  loadingText: {
    color: '#374151',
    fontSize: 18,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerSubtitle: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    width: 160,
    zIndex: 10000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    color: theme.colors.text,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  scrollableContent: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  trendsBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  trendsText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '500',
  },
  monthBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  monthText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    paddingHorizontal: 16,
  },
  chartContainer: {
    height: 256,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#6B7280',
    marginTop: 8,
  },
  insightsSection: {
    marginTop: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  insightsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  aiBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  aiText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '500',
  },
  insightsContainer: {
    marginHorizontal: 16,
  },
  insightCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightTextContainer: {
    flex: 1,
  },
  insightTitle: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  insightDescription: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  insightEmptyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  insightEmptyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  insightEmptyText: {
    color: '#6B7280',
    marginLeft: 8,
    fontSize: 16,
  },
  bottomSpacing: {
    height: 24,
  },
});