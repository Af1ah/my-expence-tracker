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

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async (values: SignupFormValues) => {
    try {
      setIsLoading(true);
      await signUp(values.email, values.password, values.name);
      Alert.alert(
        'Success',
        'Account created successfully! Please check your email for verification.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
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
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 bg-gradient-to-br from-green-50 to-emerald-100">
          <View className="flex-1 justify-center px-6 py-8">
            <View className="bg-white rounded-3xl shadow-lg p-8">
              {/* Header */}
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
                  <Ionicons name="person-add" size={40} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 mb-2">
                  Create Account
                </Text>
                <Text className="text-gray-500 text-center text-base">
                  Join us to start tracking your expenses smartly
                </Text>
              </View>

              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSignUp}
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
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && errors.name ? errors.name : ''}
                      autoCapitalize="words"
                      leftIcon="person"
                    />

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
                      placeholder="Create a strong password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password ? errors.password : ''}
                      secureTextEntry
                      leftIcon="lock-closed"
                    />

                    <FormInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ''
                      }
                      secureTextEntry
                      leftIcon="lock-closed"
                    />

                    <LoadingButton
                      title="Create Account"
                      onPress={handleSubmit}
                      loading={isLoading}
                      disabled={!isValid || isLoading}
                      style="bg-green-500 mt-6"
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

              {/* Sign In Link */}
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-4 px-6"
                onPress={() => router.push('/login')}
                disabled={isLoading}
              >
                <Text className="text-center text-gray-700 font-medium text-base">
                  Already have an account?{' '}
                  <Text className="text-green-500 font-semibold">Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}