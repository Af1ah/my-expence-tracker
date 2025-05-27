import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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


const styles = StyleSheet.create({
  timeFilterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  activeTimeFilterButton: {
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timeFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTimeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
});