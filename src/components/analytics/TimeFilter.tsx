import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '~/src/styles/analyticsStyles';

const TIME_PERIODS = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" }
];

interface TimeFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <View style={styles.timeFilterContainer}>
      {TIME_PERIODS.map((period) => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.timeFilterButton,
            selectedPeriod === period.id && styles.activeTimeFilterButton
          ]}
          onPress={() => onPeriodChange(period.id)}
        >
          <Text
            style={[
              styles.timeFilterText,
              selectedPeriod === period.id && styles.activeTimeFilterText
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
