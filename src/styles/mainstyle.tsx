import { StyleSheet } from 'react-native';



const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#404040' : '#e5e5e5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#000',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    marginBottom: 8,
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
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#000',
    marginLeft: 12,
    flex: 1,
  },
  settingValue: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
    marginRight: 8,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalCancel: {
    fontSize: 16,
  },
  countryList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  selectedCountryItem: {
    backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f9ff',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '500',
    color: isDarkMode ? '#fff' : '#000',
  },
  countryCurrency: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
    marginTop: 2,
  },
  // Profile styles
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
  formSection: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#000',
    borderWidth: 1,
    borderColor: isDarkMode ? '#404040' : '#e5e5e5',
  },
  // Help screen styles
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#000',
    marginLeft: 12,
  },
  faqItem: {
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
    lineHeight: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#000',
  },
  infoValue: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
  },
});
export default getStyles;