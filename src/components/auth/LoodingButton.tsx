import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from 'react-native';

interface LoadingButtonProps  {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: string;
  textStyle?: string;
  onPress: () => void;
}

export default function LoadingButton({
  title,
  loading = false,
  disabled = false,
  style = 'bg-blue-500',
  textStyle = 'text-white',
  onPress,
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`rounded-2xl py-4 px-6 flex-row items-center justify-center ${
        isDisabled 
          ? 'bg-gray-400 opacity-70' 
          : style
      }`}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={`font-semibold text-base text-center ${
        isDisabled ? 'text-gray-300' : textStyle
      }`}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
}