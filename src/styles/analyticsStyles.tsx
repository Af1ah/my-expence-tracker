import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
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
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  periodLabel: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "500",
  },
  timeFilterContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTimeFilterButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeFilterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTimeFilterText: {
    color: "#111827",
  },
  chartContainer: {
    height: 200,
    marginBottom: 8,
  },
  chartArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
  },
  chartPoint: {
    position: "absolute",
    width: 8,
    backgroundColor: "#6366F1",
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  categoriesList: {
    gap: 16,
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
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  categoryProgress: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 16,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    minWidth: 80,
    textAlign: "right",
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

   dropdown: {
    position: 'absolute' as const,
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 120,
    zIndex: 1000,
  },
  dropdownDark: {
    backgroundColor: '#2d2d2d',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemDark: {
    borderBottomColor: '#404040',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItemTextDark: {
    color: '#fff',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },

  
});

export default styles;