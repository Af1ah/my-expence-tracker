import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '~/src/context/ThemeContext';

const TIME_PERIODS = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

interface TimeFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({ selectedPeriod, onPeriodChange }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.timeFilterContainer}>
      {TIME_PERIODS.map((period) => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.timeFilterButton,
            selectedPeriod === period.id && styles.activeTimeFilterButton,
          ]}
          onPress={() => onPeriodChange(period.id)}
        >
          <Text
            style={[
              styles.timeFilterText,
              selectedPeriod === period.id && styles.activeTimeFilterText,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 🔧 Theme-aware styles
const getStyles = (theme: any) =>
  StyleSheet.create({
    timeFilterContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceSecondary ?? theme.colors.surface,
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
      backgroundColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    timeFilterText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textsecondary,
    },
    activeTimeFilterText: {
      color: "white", // Usually white
      fontWeight: '600',
    },
  });
