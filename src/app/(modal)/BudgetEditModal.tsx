// BudgetEditModal.tsx - Separate modal component for editing budget limits

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useFormattedCurrency } from "~/src/hooks/useFormattedCurrency";
import { BudgetCategory } from "~/src/types/types";

interface BudgetEditModalProps {
  visible: boolean;
  category: BudgetCategory | null;
  onClose: () => void;
  onSave: (categoryId: string, newLimit: number) => void;
}
    const { formatCurrency } = useFormattedCurrency();

export default function BudgetEditModal({
  visible,
  category,
  onClose,
  onSave,
}: BudgetEditModalProps): React.JSX.Element {
  const [newLimit, setNewLimit] = useState<string>("");

  // Update input when category changes
  useEffect(() => {
    if (category) {
      setNewLimit(category.limit.toString());
    }
  }, [category]);

  const handleSave = () => {
    if (category && newLimit && !isNaN(parseFloat(newLimit))) {
      onSave(category.id, parseFloat(newLimit));
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Reset input when modal closes
    setNewLimit("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-bold text-center text-gray-800 mb-6">
            Edit {category?.name} Budget
          </Text>

          <View className="bg-gray-100 rounded-xl p-4 mb-6">
            <Text className="text-sm text-gray-500 mb-1">Current Budget</Text>
            <Text className="text-lg font-semibold text-gray-800">
              {category ? formatCurrency(category.limit) : "$0"}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-2">New Budget Limit</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-lg"
              keyboardType="numeric"
              value={newLimit}
              onChangeText={setNewLimit}
              placeholder="Enter new budget limit"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 p-4 rounded-xl border border-gray-300"
              onPress={handleClose}
            >
              <Text className="text-center font-medium text-gray-800">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 p-4 rounded-xl bg-indigo-500"
              onPress={handleSave}
            >
              <Text className="text-center font-medium text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}