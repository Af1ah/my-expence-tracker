// styles/addTransactionStyles.ts
import { StyleSheet } from "react-native";
import { Theme } from '../theme';

export const createAddTransactionStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  
  // Type selector styles
  typeSelectorContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.xl,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: theme.spacing.xs,
  },
  activeExpenseButton: {
    backgroundColor: theme.colors.expense,
  },
  activeIncomeButton: {
    backgroundColor: theme.colors.income,
  },
  inactiveButton: {
    backgroundColor: theme.colors.surfaceHover,
  },
  activeButtonText: {
    color: theme.colors.textInverse,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },
  inactiveButtonText: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  
  // Amount input styles
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
  },
  dollarSign: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  amountInput: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  
  // Input container styles
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  // Date input styles
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dateInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
  },
  
  // Category grid styles
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  categoryButton: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.light,
  },
  selectedCategoryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    fontWeight: theme.typography.fontWeight.medium,
  },
  selectedCategoryText: {
    color: theme.colors.textInverse,
  },
  
  // Save button styles
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.base,
    alignItems: "center",
    marginVertical: theme.spacing.base,
    ...theme.shadows.medium,
  },
  saveButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  disabledButton: {
    backgroundColor: theme.colors.surfaceHover,
  },
  disabledButtonText: {
    color: theme.colors.textTertiary,
  },
});