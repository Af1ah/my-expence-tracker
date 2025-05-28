import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FormInput from '../components/auth/FormInput';
import LoadingButton from '../components/auth/LoodingButton';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export default function ProfileScreen() {
  const { user, profile, signOut, updateProfile, updatePassword, resetPassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (values: { name: string; email: string }) => {
    try {
      setIsLoading(true);
      await updateProfile({
        name: values.name,
        email: values.email,
      });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      await updatePassword(values.newPassword);
      setIsChangingPassword(false);
      Alert.alert('Success', 'Password updated successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;

    try {
      setIsLoading(true);
      await resetPassword(user.email);
      Alert.alert('Password Reset', 'A password reset link has been sent to your email address.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/login');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  if (!user || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-500 px-6 pb-8 pt-12">
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Profile</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} className="p-2">
            <Ionicons name={isEditing ? 'close' : 'create'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Avatar */}
        <View className="items-center">
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-white">
            {profile.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} className="h-24 w-24 rounded-full" />
            ) : (
              <Ionicons name="person" size={48} color="#3B82F6" />
            )}
          </View>
          <Text className="text-2xl font-bold text-white">{profile.name || 'User'}</Text>
          <Text className="text-base text-blue-100">{profile.email}</Text>
        </View>
      </View>

      <View className="px-6 py-6">
        {!isEditing && !isChangingPassword && (
          <View className="space-y-4">
            {/* Profile Info Card */}
            <View className="rounded-2xl bg-white p-6 shadow-sm">
              <Text className="mb-4 text-lg font-bold text-gray-800">Account Information</Text>

              <View className="space-y-4">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={20} color="#6B7280" />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-gray-500">Full Name</Text>
                    <Text className="text-base font-medium text-gray-800">
                      {profile.name || 'Not set'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="mail" size={20} color="#6B7280" />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-gray-500">Email</Text>
                    <Text className="text-base font-medium text-gray-800">{profile.email}</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="calendar" size={20} color="#6B7280" />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-gray-500">Member Since</Text>
                    <Text className="text-base font-medium text-gray-800">
                      {profile.created_at
                        ? new Date(profile.created_at).toLocaleDateString()
                        : 'Unknown'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="space-y-3">
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                onPress={() => setIsEditing(true)}>
                <View className="flex-row items-center">
                  <Ionicons name="create" size={20} color="#3B82F6" />
                  <Text className="ml-3 text-base font-medium text-gray-800">Edit Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                onPress={() => setIsChangingPassword(true)}>
                <View className="flex-row items-center">
                  <Ionicons name="lock-closed" size={20} color="#10B981" />
                  <Text className="ml-3 text-base font-medium text-gray-800">Change Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                onPress={handleResetPassword}>
                <View className="flex-row items-center">
                  <Ionicons name="key" size={20} color="#F59E0B" />
                  <Text className="ml-3 text-base font-medium text-gray-800">Reset Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                onPress={handleSignOut}>
                <View className="flex-row items-center">
                  <Ionicons name="log-out" size={20} color="#EF4444" />
                  <Text className="ml-3 text-base font-medium text-red-500">Sign Out</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Edit Profile Form */}
        {isEditing && (
          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <Text className="mb-6 text-lg font-bold text-gray-800">Edit Profile</Text>

            <Formik
              initialValues={{
                name: profile.name || '',
                email: profile.email || '',
              }}
              validationSchema={ProfileSchema}
              onSubmit={handleUpdateProfile}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View className="space-y-4">
                  <FormInput
                    label="Full Name"
                    placeholder="Enter your name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={touched.name ? errors.name : undefined}
                  />

                  <FormInput
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={touched.email ? errors.email : undefined}
                  />

                  <LoadingButton
                    title="Save Changes"
                    onPress={handleSubmit}
                    loading={isLoading}
                    disabled={!isValid || isLoading}
                  />

                  <TouchableOpacity
                    onPress={() => setIsEditing(false)}
                    className="mt-4 items-center">
                    <Text className="text-blue-500">Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        )}

     
        {isChangingPassword && (
          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <Text className="mb-6 text-lg font-bold text-gray-800">Change Password</Text>

            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={PasswordSchema}
              onSubmit={handleChangePassword}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View className="space-y-4">
                  <FormInput
                    label="Current Password"
                    placeholder="Enter current password"
                    secureTextEntry
                    onChangeText={handleChange('currentPassword')}
                    onBlur={handleBlur('currentPassword')}
                    value={values.currentPassword}
                    error={touched.currentPassword ? errors.currentPassword : undefined}
                  />

                  <FormInput
                    label="New Password"
                    placeholder="Enter new password"
                    secureTextEntry
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    error={touched.newPassword ? errors.newPassword : undefined}
                  />

                  <FormInput
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  />

                  <LoadingButton
                    title="Update Password"
                    onPress={handleSubmit}
                    loading={isLoading}
                    disabled={!isValid || isLoading}
                  />

                  <TouchableOpacity
                    onPress={() => setIsChangingPassword(false)}
                    className="mt-4 items-center">
                    <Text className="text-blue-500">Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
