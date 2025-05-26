import React from 'react';
import { View, Text } from 'react-native';
import styles from '~/src/styles/analyticsStyles';
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
