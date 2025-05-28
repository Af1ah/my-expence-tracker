import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FormInput from '../components/auth/FormInput';
import LoadingButton from '../components/auth/LoodingButton';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      await signIn(values.email, values.password);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Header Section */}
          <View className="flex-1 justify-center px-6 py-8">
            <View className="bg-white rounded-3xl shadow-lg p-8">
              {/* Logo/Icon */}
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
                  <Ionicons name="wallet" size={40} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </Text>
                <Text className="text-gray-500 text-center text-base">
                  Sign in to continue managing your expenses
                </Text>
              </View>

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSignIn}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <View className="space-y-4">
                    <FormInput
                      label="Email Address"
                      placeholder="Enter your email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email ? errors.email : ''}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      leftIcon="mail"
                    />

                    <FormInput
                      label="Password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password ? errors.password : ''}
                      secureTextEntry
                      leftIcon="lock-closed"
                    />

                    <TouchableOpacity className="self-end mt-2">
                      <Text className="text-blue-500 font-medium">
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>

                    <LoadingButton
                      title="Sign In"
                      onPress={handleSubmit}
                      loading={isLoading}
                      disabled={!isValid || isLoading}
                      style="bg-blue-500 mt-6"
                    />
                  </View>
                )}
              </Formik>

              {/* Divider */}
              <View className="flex-row items-center my-8">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-gray-500 font-medium">OR</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Sign Up Link */}
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-4 px-6"
                onPress={() => router.push('/signup')}
                disabled={isLoading}
              >
                <Text className="text-center text-gray-700 font-medium text-base">
                  Don't have an account?{' '}
                  <Text className="text-blue-500 font-semibold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}