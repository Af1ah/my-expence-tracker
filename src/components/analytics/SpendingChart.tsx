import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from '~/src/styles/analyticsStyles';

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
                  bottom: 40,
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
