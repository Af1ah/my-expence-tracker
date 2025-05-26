import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryType } from '~/src/types/transaction';

// Category configuration
export const CATEGORY_CONFIG = {
  food: { 
    label: 'Food', 
    icon: 'fast-food-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FF6B6B' 
  },
  transport: { 
    label: 'Transport', 
    icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
    color: '#4ECDC4' 
  },
  bills: { 
    label: 'Bills', 
    icon: 'receipt-outline' as keyof typeof Ionicons.glyphMap,
    color: '#45B7D1' 
  },
  shopping: { 
    label: 'Shopping', 
    icon: 'cart-outline' as keyof typeof Ionicons.glyphMap,
    color: '#96CEB4' 
  },
  entertainment: { 
    label: 'Entertainment', 
    icon: 'musical-notes-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FECA57' 
  },
  housing: { 
    label: 'Housing', 
    icon: 'home-outline' as keyof typeof Ionicons.glyphMap,
    color: '#FF9FF3' 
  },
  health: { 
    label: 'Health', 
    icon: 'medkit-outline' as keyof typeof Ionicons.glyphMap,
    color: '#54A0FF' 
  },
  other: { 
    label: 'Other', 
    icon: 'pricetag-outline' as keyof typeof Ionicons.glyphMap,
    color: '#5F27CD' 
  },
};

interface CategorySelectorProps {
  selectedCategory: CategoryType;
  onCategorySelect: (category: CategoryType) => void;
  containerStyle?: ViewStyle;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect,
  containerStyle
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryGrid}>
        {Object.entries(CATEGORY_CONFIG).map(([key, category]) => {
          const isSelected = selectedCategory === key;
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryButton,
                isSelected && [
                  styles.selectedCategoryButton,
                  { backgroundColor: category.color }
                ]
              ]}
              onPress={() => onCategorySelect(key as CategoryType)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={category.icon} 
                size={24} 
                color={isSelected ? "#fff" : "#555"} 
              />
              <Text 
                style={[
                  styles.categoryText,
                  isSelected && { color: "#fff", fontWeight: '600' }
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  } as ViewStyle,
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  } as TextStyle,
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between' as 'space-between',
    marginHorizontal: -6, // Alternative to gap
  } as ViewStyle,
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
    marginBottom: 12,
  } as ViewStyle,
  selectedCategoryButton: {
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  } as ViewStyle,
  categoryText: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  } as TextStyle,
});

export default CategorySelector;