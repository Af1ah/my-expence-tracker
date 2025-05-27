// styles/dashboardStyles.ts
import { StyleSheet } from "react-native";
import { Theme } from '../theme';

export const createDashboardStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.base,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
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
    marginHorizontal: theme.spacing.base,
    marginTop: theme.spacing.base,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing.base,
    ...theme.shadows.light,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.base,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.base,
  },
  periodLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  timeFilterContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.surfaceHover,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  activeTimeFilterButton: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.light,
  },
  timeFilterText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  activeTimeFilterText: {
    color: theme.colors.textPrimary,
  },
  chartContainer: {
    height: 200,
    marginBottom: theme.spacing.sm,
  },
  chartArea: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.borderRadius.md,
  },
  chartPoint: {
    position: "absolute",
    width: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm, // Changed from xs to sm
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  chartLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  categoriesList: {
    gap: theme.spacing.base,
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
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  categoryProgress: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: theme.spacing.base,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.surfaceHover,
    borderRadius: theme.borderRadius.sm, // Changed from xs to sm
    marginRight: theme.spacing.md,
  },
  progressFill: {
    height: "100%",
    borderRadius: theme.borderRadius.sm, // Changed from xs to sm
  },
  categoryAmount: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    minWidth: 80,
    textAlign: "right",
  },
  insightsList: {
    gap: theme.spacing.md,
  },
  insightItem: {
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
  },
  insightTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  insightDescription: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.normal,
  },
  dropdown: {
    position: 'absolute' as const,
    top: 50,
    right: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.heavy,
    minWidth: 120,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
});