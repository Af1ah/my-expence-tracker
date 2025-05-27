// styles/commonStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme';

export const createCommonStyles = (theme: Theme) => StyleSheet.create({
  // Layout
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  
  // Containers
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.base,
  },
  cardContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.light,
  },
  
  // Headers
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing['4xl'],
    paddingBottom: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  primaryButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  secondaryButton: {
    backgroundColor: theme.colors.surfaceHover,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  iconButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  
  // Text styles
  h1: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  h2: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  h3: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  h4: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  bodyLarge: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeight.normal,
  },
  bodyMedium: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  caption: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  
  // Input styles
  inputContainer: {
    marginBottom: theme.spacing.base,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
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
  textInputFocused: {
    borderColor: theme.colors.primary,
  },
  textInputError: {
    borderColor: theme.colors.error,
  },
  
  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.xs,
    ...theme.shadows.light,
  },
  listItemPressed: {
    backgroundColor: theme.colors.surfaceHover,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    margin: theme.spacing.base,
    maxWidth: 320,
    width: '100%',
    ...theme.shadows.heavy,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.base,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: theme.typography.lineHeight.normal,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  
  // Status styles
  successContainer: {
    backgroundColor: theme.colors.success,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.sm,
  },
  successText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  warningContainer: {
    backgroundColor: theme.colors.warning,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.sm,
  },
  warningText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.base,
  },
  
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptyStateMessage: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.normal,
  },
});