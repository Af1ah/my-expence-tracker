import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get("window");
const chartWidth = screenWidth - 32;

type ChartPoint = {
  date: string;
  amount: number;
};

interface SpendingChartProps {
  data: ChartPoint[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(item => item.amount)) : 1;

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartArea}>
        {data.map((point, index) => {
          const height = maxValue > 0 ? (point.amount / maxValue) * 120 : 0;
          const left = data.length > 1 ? (index / (data.length - 1)) * (chartWidth - 80) : 0;

          return (
            <View
              key={`${point.date}-${index}`}
              style={[
                styles.chartPoint,
                {
                  left: left + 20,
                  bottom: 10,
                  height: Math.max(height, 8)
                }
              ]}
            />
          );
        })}
      </View>
      
      <View style={styles.chartLabels}>
        {data.map((point, index) => (
          <Text key={`${point.date}-label-${index}`} style={styles.chartLabel}>
            {point.date}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    paddingTop: 16,
  },
  chartArea: {
    height: 160,
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  chartPoint: {
    position: 'absolute',
    width: 6,
    backgroundColor: '#4F46E5', // Changed from 'red' to proper purple color
    borderRadius: 3,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
});