import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export default function FormInput({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  ...props
}: FormInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const shouldShowPassword = secureTextEntry ? !isPasswordVisible : false;
  const eyeIcon = isPasswordVisible ? 'eye-off' : 'eye';

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2 text-base">{label}</Text>
      <View
        className={`flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border-2 ${
          isFocused
            ? 'border-blue-500 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-200'
        }`}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? '#3B82F6' : error ? '#EF4444' : '#9CA3AF'}
            style={{ marginRight: 12 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-gray-800 text-base"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={shouldShowPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={eyeIcon}
              size={20}
              color={isFocused ? '#3B82F6' : '#9CA3AF'}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? '#3B82F6' : '#9CA3AF'}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error ? (
        <Text className="text-red-500 text-sm mt-1 ml-2">{error}</Text>
      ) : null}
    </View>
  );
}