// styles/dashboardStyles.ts
import { StyleSheet } from "react-native";

export const createDashboardStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: 24, // theme.typography.fontSize['2xl']
    fontWeight: 'bold', // theme.typography.fontWeight.bold
    color: theme.colors.text.primary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    // Shadow for both platforms
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18, // theme.typography.fontSize.lg
    fontWeight: '600', // theme.typography.fontWeight.semibold
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  periodLabel: {
    fontSize: 16, // theme.typography.fontSize.base
    color: theme.colors.primary,
    fontWeight: '500', // theme.typography.fontWeight.medium
  },
  timeFilterContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  activeTimeFilterButton: {
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeFilterText: {
    fontSize: 16, // theme.typography.fontSize.base
    fontWeight: '500', // theme.typography.fontWeight.medium
    color: theme.colors.text.secondary,
  },
  activeTimeFilterText: {
    color: theme.colors.text.primary,
  },
  chartContainer: {
    height: 200,
    marginBottom: theme.spacing.sm,
  },
  chartArea: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
  },
  chartPoint: {
    position: "absolute",
    width: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  chartLabel: {
    fontSize: 14, // theme.typography.fontSize.sm
    color: theme.colors.text.secondary,
  },
  categoriesList: {
    gap: theme.spacing.md,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  categoryName: {
    fontSize: 16, // theme.typography.fontSize.md
    fontWeight: '500', // theme.typography.fontWeight.medium
    color: theme.colors.text.primary,
  },
  categoryProgress: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  progressFill: {
    height: "100%",
    borderRadius: theme.borderRadius.sm,
  },
  categoryAmount: {
    fontSize: 16, // theme.typography.fontSize.md
    fontWeight: '600', // theme.typography.fontWeight.semibold
    color: theme.colors.text.primary,
    minWidth: 80,
    textAlign: "right",
  },
  insightsList: {
    gap: theme.spacing.md,
  },
  insightItem: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
  },
  insightTitle: {
    fontSize: 16, // theme.typography.fontSize.md
    fontWeight: '600', // theme.typography.fontWeight.semibold
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  insightDescription: {
    fontSize: 16, // theme.typography.fontSize.base
    color: theme.colors.text.secondary,
    lineHeight: 24, // theme.typography.lineHeight.normal
  },
  dropdown: {
    position: 'absolute' as const,
    top: 50,
    right: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    // Heavy shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    minWidth: 120,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    fontSize: 16, // theme.typography.fontSize.base
    color: theme.colors.text.primary,
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
});

// Also, here's an updated theme file to match your usage
// theme/index.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    border: string;
    success: string;
    warning: string;
    error: string;
    // Gradient colors for your balance card
    gradientStart: string;
    gradientMiddle: string;
    gradientEnd: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#4c66ef',
    secondary: '#6b7280',
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      inverse: '#ffffff',
    },
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    // Light theme gradients
    gradientStart: '#4c66ef',
    gradientMiddle: '#3b4fd3',
    gradientEnd: '#2c3dcb',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    card: '#334155',
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      inverse: '#1f2937',
    },
    border: '#475569',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    // Dark theme gradients
    gradientStart: '#1e293b',
    gradientMiddle: '#0f172a',
    gradientEnd: '#020617',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};