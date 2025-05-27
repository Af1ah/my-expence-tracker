// styles/historyStyles.ts
import { StyleSheet } from "react-native";
import { Theme } from '../theme';

export const createHistoryStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginTop: theme.spacing.base,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  searchButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceHover,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceHover,
    borderRadius: theme.borderRadius.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  
  // Filter styles
  filtersContainer: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterButton: {
    backgroundColor: theme.colors.surfaceHover,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginHorizontal: theme.spacing.xs,
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  activeFilterText: {
    color: theme.colors.textInverse,
  },
  
  // List styles
  listContent: {
    paddingBottom: 100,
  },
  dateSection: {
    marginBottom: theme.spacing.base,
  },
  dateSectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.md,
  },
  
  // Transaction item styles
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.xs,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.light,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs / 2,
  },
  transactionCategory: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textTransform: "capitalize",
  },
  transactionAmount: {
    alignItems: "flex-end",
    marginRight: theme.spacing.sm,
  },
  amountText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs / 2,
  },
  timeText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  
  // Action buttons styles
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  editButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.edit,
  },
  deleteButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.delete,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing['2xl'],
  },
  errorText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.base,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  retryButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing['2xl'],
  },
  emptyText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginVertical: theme.spacing.base,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  addButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
});