// app/index.tsx - Enhanced Splash Screen

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '~/src/context/AuthContext';
import { useOnboarding } from './_layout'; // Import from your layout file
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const { session, loading: authLoading } = useAuth();
  const { 
    isFirstLaunch, 
    hasCompletedOnboarding, 
    isOnboardingLoading 
  } = useOnboarding();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start splash animations
    startSplashAnimations();

    // Navigation timer
    const navigationTimer = setTimeout(() => {
      handleNavigation();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(navigationTimer);
  }, [authLoading, isOnboardingLoading, session, isFirstLaunch, hasCompletedOnboarding]);

  const startSplashAnimations = () => {
    // Parallel animations for smooth entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNavigation = () => {
    if (authLoading || isOnboardingLoading) {
      // Still loading, wait a bit more
      setTimeout(handleNavigation, 500);
      return;
    }

    if (!session) {
      // User not authenticated
      router.replace('/login');
    } else if (isFirstLaunch && !hasCompletedOnboarding) {
      // First launch - show onboarding
      router.replace('/onboarding');
    } else {
      // User authenticated and onboarding completed
      router.replace('/(tab)/home');
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View className="flex-1 justify-center items-center px-8">
        {/* App Logo/Icon */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="mb-8"
        >
          <View className="w-24 h-24 rounded-3xl bg-white/20 items-center justify-center mb-4">
            <Ionicons name="wallet" size={48} color="white" />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-4xl font-bold text-white text-center mb-2">
            ExpenseTracker
          </Text>
          <Text className="text-lg text-white/80 text-center mb-8">
            Take control of your finances
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute bottom-16"
        >
          <LoadingDots />
        </Animated.View>

        {/* Version/Company Info */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute bottom-8"
        >
          <Text className="text-white/60 text-sm text-center">
            Version 1.0.0
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

// Loading dots component
const LoadingDots: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      const dotAnimation = (animValue: Animated.Value, delay: number) =>
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]);

      Animated.loop(
        Animated.parallel([
          dotAnimation(dot1, 0),
          dotAnimation(dot2, 200),
          dotAnimation(dot3, 400),
        ])
      ).start();
    };

    animateDots();
  }, []);

  return (
    <View className="flex-row space-x-2">
      {[dot1, dot2, dot3].map((dot, index) => (
        <Animated.View
          key={index}
          style={{
            opacity: dot,
            transform: [
              {
                scale: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          }}
          className="w-2 h-2 bg-white rounded-full"
        />
      ))}
    </View>
  );
};

export default SplashScreen;