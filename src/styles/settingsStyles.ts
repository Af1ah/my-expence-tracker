// styles/settingsStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme';

export const createSettingsStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
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
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  saveButton: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.success,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.light,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  settingValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
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
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  modalCancel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
  },
  countryList: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.xs,
  },
  selectedCountryItem: {
    backgroundColor: theme.colors.primaryLight,
  },
  countryFlag: {
    fontSize: theme.typography.fontSize['2xl'],
    marginRight: theme.spacing.md,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  countryCurrency: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs / 2,
  },
  
  // Profile styles
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing['2xl'],
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.base,
  },
  changePhotoButton: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
  },
  changePhotoText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.success,
    fontWeight: theme.typography.fontWeight.medium,
  },
  formSection: {
    paddingHorizontal: theme.spacing.base,
  },
  inputGroup: {
    marginBottom: theme.spacing.xl,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  // Help screen styles
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.light,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
  faqItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  faqQuestion: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  faqAnswer: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.normal,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.light,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
});
