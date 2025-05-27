import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormattedCurrency } from '~/src/hooks/useFormattedCurrency';

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

interface CategoryListProps {
  categories: CategoryData[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const { formatCurrency } = useFormattedCurrency();

  const renderCategoryItem = (category: CategoryData) => (
    <View key={category.name} style={styles.categoryItem}>
      <View style={styles.categoryInfo}>
        <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      
      <View style={styles.categoryProgress}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: category.color,
                width: `${Math.min(category.percentage, 100)}%`
              }
            ]}
          />
        </View>
        <Text style={styles.categoryAmount}>
          {formatCurrency(category.amount)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.categoriesList}>
      {categories.map(renderCategoryItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesList: {
    paddingVertical: 8,
  },
  categoryItem: {
    flexDirection: 'column',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  categoryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 4,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    minWidth: 80,
    textAlign: 'right',
  },
});