import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await signUp(email, password);
      Alert.alert('Success', 'Please check your email for verification link');
      router.replace('/'); // Redirect to home after successful signup
    } catch (error : any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      <View className="space-y-4">
        <Text className="text-2xl font-bold text-center mb-6">Sign Up</Text>
        
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="w-full bg-green-500 p-4 rounded-lg"
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold">
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
