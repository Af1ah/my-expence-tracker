import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "~/src/context/ThemeContext";

// Pie chart item type
type PieDataItem = {
  value: number;
  color: string;
  gradientCenterColor: string;
  focused?: boolean;
  label?: string | number;
};

// Component props
interface PerformanceChartProps {
  title?: string;
  data?: PieDataItem[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  title = "Spending",
  data = defaultPieData,
}) => {
  const { isDarkMode } = useTheme();

  const chartData = data.length > 0 ? data : defaultPieData;

  const focusedItem =
    chartData.find((item) => item.focused) || chartData[0] || {
      value: 0,
      label: "N/A",
    };

  const renderLegendItem = (item: PieDataItem, index: number) => (
    <View key={index} className="flex-row items-center m-1">
      <View
        className="h-3 w-3 rounded-full mr-2"
        style={{ backgroundColor: item.color }}
      />
      <Text
        className={`text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {item.label?.toString() || "Unnamed"}: {item.value}%
      </Text>
    </View>
  );

  return (
    <View
      className={`rounded-xl shadow-sm mx-6 my-4 p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <Text
        className={`text-xl font-bold mb-2 `}
      >
        {title}
      </Text>

      <View className="items-center justify-center py-2">
        <PieChart
          data={chartData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={isDarkMode ? "#18181b" : "#FFFFFF"}
          centerLabelComponent={() => (
            <View className="justify-center items-center">
              <Text
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {focusedItem.value.toString()}%
              </Text>
              <Text
                className={`text-base ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {focusedItem.label?.toString() || "N/A"}
              </Text>
            </View>
          )}
        />
      </View>

      <View className="flex-row flex-wrap justify-around mt-4">
        {chartData.map(renderLegendItem)}
      </View>
    </View>
  );
};

// Fallback/default pie chart data
const defaultPieData: PieDataItem[] = [
  {
    value: 30,
    color: "#6366F1",
    gradientCenterColor: "#6366F1",
    focused: true,
    label: "Excellent",
  },
  {
    value: 40,
    color: "#93FCF8",
    gradientCenterColor: "#3BE9DE",
    label: "Good",
  },
  {
    value: 16,
    color: "#EF4444",
    gradientCenterColor: "#8F80F3",
    label: "Okay",
  },
  {
    value: 3,
    color: "#FFA5BA",
    gradientCenterColor: "#FF7F97",
    label: "Poor",
  },
];

export default PerformanceChart;
