// app/onboarding.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFixedExpenses } from '~/src/context/FixedExpensesContext';
import { useOnboarding } from '../_layout';
import AddFixedExpenseModal from '../(modal)/AddFixedExpenseModal';
import { FixedExpense } from '~/src/types/fixedExpenses';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  lottieSource: any; // Lottie animation source
  fallbackImage?: any; // Optional fallback image
  iconName: keyof typeof Ionicons.glyphMap; 
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to ExpenseTracker",
    subtitle: "Take Control of Your Finances",
    description: "Track your daily expenses, set budgets, and achieve your financial goals with our intuitive expense tracking app.",
    lottieSource: require('~/assets/lottie/wallet-animation.json'), // Add your Lottie file here
    fallbackImage: require('~/assets/images/warning.png'), // Fallback image
    iconName: 'wallet-outline',
  },
  {
    id: 2,
    title: "Smart Budget Management",
    subtitle: "Plan Your Spending Wisely",
    description: "Set custom budgets for different categories and get real-time insights on your spending patterns.",
    lottieSource: require('~/assets/lottie/chart-animation.json'), // Add your Lottie file here
    fallbackImage: require('~/assets/images/warning.png'), // Fallback image
    iconName: 'bar-chart-outline',
  },
  {
    id: 3,
    title: "Track Every Penny",
    subtitle: "Never Miss an Expense",
    description: "Easily add and categorize your daily expenses with our quick and simple interface.",
    lottieSource: require('~/assets/lottie/phone-animation.json'), // Add your Lottie file here
    fallbackImage: require('~/assets/images/warning.png'), // Fallback image
    iconName: 'phone-portrait-outline',
  },
  {
    id: 4,
    title: "Fixed Expenses Made Simple",
    subtitle: "Automate Your Recurring Bills",
    description: "Set up your recurring income and expenses once, and we'll help you stay on top of them.",
    lottieSource: require('~/assets/lottie/refresh-animation.json'), // Add your Lottie file here
    fallbackImage: require('~/assets/images/warning.png'), // Fallback image
    iconName: 'refresh-outline',
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFixedExpenseModal, setShowFixedExpenseModal] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  
  const { fixedExpenses } = useFixedExpenses();
  const { setHasCompletedOnboarding } = useOnboarding();

  // Lottie animation refs
  const lottieRefs = useRef<LottieView[]>([]);

  // Animated values
  const imageScale = useSharedValue(1);
  const imageOpacity = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const textTranslateY = useSharedValue(0);

  // Animation styles
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
        
        transform: [{ scale: imageScale.value }],
        opacity: imageOpacity.value,
        
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    };
  });

  // Animation function for smooth transitions
 const animateTransition = (nextStep: number) => {
  // Animate out
  imageScale.value = withTiming(0.8, { duration: 300 });
  imageOpacity.value = withTiming(0, { duration: 200 });
  textOpacity.value = withTiming(0, { duration: 200 });
  textTranslateY.value = withTiming(-20, { duration: 200 });

  setTimeout(() => {
    setCurrentStep(nextStep);

    // Animate in
    imageScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    imageOpacity.value = withTiming(1, { duration: 400 });
    textOpacity.value = withTiming(1, { duration: 400 });
    textTranslateY.value = withSpring(0, { damping: 12, stiffness: 120 });

    // Play animation
    if (lottieRefs.current[nextStep]) {
      lottieRefs.current[nextStep].play();
    }
  }, 250);
};


  const handleNext = () => {
  if (currentStep < onboardingSteps.length - 1) {
    animateTransition(currentStep + 1);
  } else {
    setSetupComplete(true);
  }
};

const handlePrevious = () => {
  if (currentStep > 0) {
    animateTransition(currentStep - 1);
  }
};


  const handleSkip = () => {
    Alert.alert(
      'Skip Onboarding?',
      'You can always set up fixed expenses later in the app settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: handleFinishOnboarding },
      ]
    );
  };

  const handleFinishOnboarding = async () => {
    try {
      await setHasCompletedOnboarding(true);
      router.replace('/(tab)/home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      router.replace('/(tab)/home');
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  const renderOnboardingContent = () => (
    <View className="flex-1 mt-3 bg-white">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Skip Button */}
        <View className="flex-row justify-end p-4">
          <TouchableOpacity
            onPress={handleSkip}
            className="px-4 py-2 rounded-full bg-gray-100"
          >
            <Text className="text-gray-600 font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center items-center px-6">
          {/* Lottie Animation with curved corners */}
          <Animated.View 
            style={[imageAnimatedStyle]}
            className="mb-12"
          >
            <View className="w-80 h-80 rounded-3xl overflow-hidden bg-gray-50 shadow-lg items-center justify-center">
              <LottieView
                ref={(ref) => {
                  if (ref) lottieRefs.current[currentStep] = ref;
                }}
                source={currentStepData.lottieSource}
                style={{
                  width: 280,
                  height: 280,
                }}
                autoPlay={currentStep === 0} // Auto-play only the first animation
                loop={true}
                speed={0.8}
                resizeMode="contain"
                onAnimationFinish={() => {
                  // Restart animation after finish for continuous loop
                  if (lottieRefs.current[currentStep]) {
                    lottieRefs.current[currentStep].play();
                  }
                }}
              />
              {/* Fallback image in case Lottie fails to load */}
              {currentStepData.fallbackImage && (
                <Image
                  source={currentStepData.fallbackImage}
                  style={{
                    position: 'absolute',
                    width: 280,
                    height: 280,
                    opacity: 0, // Hidden by default, can be shown if Lottie fails
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
          </Animated.View>

          {/* Text Content */}
          <Animated.View 
            style={[textAnimatedStyle]}
            className="items-center"
          >
            {/* Title */}
            <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
              {currentStepData.title}
            </Text>

            {/* Subtitle */}
            <Text className="text-xl font-semibold text-blue-600 text-center mb-6">
              {currentStepData.subtitle}
            </Text>

            {/* Description */}
            <Text className="text-base text-gray-600 text-center leading-6 px-4 max-w-sm">
              {currentStepData.description}
            </Text>
          </Animated.View>
        </View>

        {/* Navigation */}
        <View className="flex-row justify-between items-center p-6">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentStep === 0}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              currentStep === 0 ? 'opacity-0' : 'bg-gray-100'
            }`}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>

          {/* Dots Indicator - Fixed version without animated transforms */}
          <View className="flex-row space-x-2">
            {onboardingSteps.map((_, dotIndex) => (
              <View
                key={dotIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIndex === currentStep
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleNext}
            className="w-12 h-12 rounded-full items-center justify-center bg-blue-500 shadow-md"
          >
            <Ionicons 
              name={currentStep === onboardingSteps.length - 1 ? "checkmark" : "chevron-forward"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderFixedExpenseSetup = () => (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Header */}
        <View className="flex-row justify-between mt-7 items-center p-4 border-b border-gray-100">
          <TouchableOpacity onPress={() => setSetupComplete(false)}>
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Setup Fixed Expenses</Text>
          <TouchableOpacity onPress={handleFinishOnboarding}>
            <Text className="text-blue-600 font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 p-6">
          {/* Info Section */}
          <View className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-100">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center">
                <Ionicons name="information" size={20} color="white" />
              </View>
              <Text className="text-gray-800 font-semibold text-lg ml-3">
                Why Add Fixed Expenses?
              </Text>
            </View>
            <Text className="text-gray-600 leading-6">
              Track your recurring income and expenses like salary, rent, subscriptions, and bills. 
              This helps you budget better and never miss important payments.
            </Text>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            onPress={() => setShowFixedExpenseModal(true)}
            className="bg-white border-2 border-dashed border-blue-300 rounded-2xl p-8 items-center mb-6 shadow-sm"
          >
            <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-3">
              <Ionicons name="add-circle-outline" size={32} color="#3B82F6" />
            </View>
            <Text className="text-gray-800 font-semibold text-lg">
              Add Fixed Expense/Income
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              Tap to add your recurring transactions
            </Text>
          </TouchableOpacity>

          {/* Fixed Expenses List */}
          {fixedExpenses.length > 0 && (
            <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <Text className="text-gray-800 font-semibold text-lg mb-4">
                Added Items ({fixedExpenses.length})
              </Text>
              <View className="max-h-48">
                {fixedExpenses.slice(0, 3).map((expense: FixedExpense) => (
                  <View key={expense.id} className="flex-row justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <View className="flex-1">
                      <Text className="text-gray-800 font-medium">{expense.name}</Text>
                      <Text className="text-gray-500 text-sm capitalize">
                        {expense.type} • {expense.frequency}
                      </Text>
                    </View>
                    <Text className={`font-semibold ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}₹{expense.amount}
                    </Text>
                  </View>
                ))}
                {fixedExpenses.length > 3 && (
                  <Text className="text-gray-500 text-center mt-2">
                    +{fixedExpenses.length - 3} more items
                  </Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Continue Button */}
        <View className="p-6 border-t border-gray-100">
          <TouchableOpacity
            onPress={handleFinishOnboarding}
            className="bg-blue-500 rounded-2xl py-4 items-center shadow-md"
          >
            <Text className="text-white font-semibold text-lg">
              {fixedExpenses.length > 0 ? 'Continue to App' : 'Skip for Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  if (setupComplete) {
    return (
      <View className="flex-1">
        {renderFixedExpenseSetup()}
        <AddFixedExpenseModal
          visible={showFixedExpenseModal}
          onClose={() => setShowFixedExpenseModal(false)}
        />
      </View>
    );
  }

  return renderOnboardingContent();
};

export default OnboardingScreen;