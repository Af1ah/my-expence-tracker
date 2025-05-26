import React from 'react';
import { View, Text } from 'react-native';
import styles from '~/src/styles/analyticsStyles';

interface InsightItem {
  type: "warning" | "success";
  title: string;
  description: string;
  color: string;
  borderColor: string;
}

interface InsightsListProps {
  insights: InsightItem[];
}

export const InsightsList: React.FC<InsightsListProps> = ({ insights }) => {
  const renderInsight = (insight: InsightItem) => (
    <View
      key={insight.title}
      style={[
        styles.insightItem,
        {
          backgroundColor: insight.color,
          borderLeftColor: insight.borderColor
        }
      ]}
    >
      <Text style={styles.insightTitle}>{insight.title}</Text>
      <Text style={styles.insightDescription}>{insight.description}</Text>
    </View>
  );

  return (
    <View>
      {insights.map(renderInsight)}
    </View>
  );
};