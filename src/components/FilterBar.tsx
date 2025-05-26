// FilterBar.tsx - Reusable filter bar component

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { TransactionFilter } from "~/src/types/transaction";
import styles from "~/src/styles/historyStyles";

interface FilterBarProps {
  filters: TransactionFilter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
}: FilterBarProps): React.JSX.Element {
  const renderFilterItem = ({ item }: { item: TransactionFilter }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === item.id ? styles.activeFilterButton : null,
      ]}
      onPress={() => onFilterChange(item.id)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === item.id ? styles.activeFilterText : null,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.filtersContainer}>
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderFilterItem}
      />
    </View>
  );
}