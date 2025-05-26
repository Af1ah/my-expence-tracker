import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  typeSelectorContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeExpenseButton: {
    backgroundColor: "#EF4444",
  },
  activeIncomeButton: {
    backgroundColor: "#10B981",
  },
  inactiveButton: {
    backgroundColor: "#f0f0f0",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  inactiveButtonText: {
    color: "#000",
    marginLeft: 8,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 8,
  },
  dollarSign: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "bold",
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
 
 
  
 
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#6366F1",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  categoryGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 12,
},
categoryButton: {
  width: '22%',
  aspectRatio: 1,
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  borderWidth: 1,
  borderColor: '#e9ecef',
},
selectedCategoryButton: {
  backgroundColor: '#007bff',
  borderColor: '#007bff',
},
categoryText: {
  fontSize: 11,
  color: '#555',
  textAlign: 'center',
  marginTop: 4,
  fontWeight: '500',
},
});

export default styles;