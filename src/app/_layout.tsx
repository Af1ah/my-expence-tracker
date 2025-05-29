import { router, Stack } from "expo-router";
import "./../../global.css";
import React, { useEffect, useState, createContext, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TransactionProvider } from "./../context/TransactionContext";
import { useNotificationRedirect } from "../providers/NotificationProvider";
import { SettingsProvider } from "../context/SettingsContext";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import { ThemeProvider } from '~/src/context/ThemeContext';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FixedExpenseProvider } from "../context/FixedExpensesContext";

// Onboarding Context
interface OnboardingContextType {
  isFirstLaunch: boolean | null;
  setIsFirstLaunch: (value: boolean) => void;
  hasCompletedOnboarding: boolean | null;
  setHasCompletedOnboarding: (value: boolean) => void;
  isOnboardingLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType>({
  isFirstLaunch: null,
  setIsFirstLaunch: () => {},
  hasCompletedOnboarding: null,
  setHasCompletedOnboarding: () => {},
  isOnboardingLoading: true,
});

export const useOnboarding = () => useContext(OnboardingContext);

// Onboarding Provider
const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const [firstLaunchValue, onboardingValue] = await Promise.all([
        AsyncStorage.getItem('isFirstLaunch'),
        AsyncStorage.getItem('hasCompletedOnboarding')
      ]);

      // If no value exists, it's first launch
      const isFirst = firstLaunchValue === null;
      const hasCompleted = onboardingValue === 'true';

      setIsFirstLaunch(isFirst);
      setHasCompletedOnboarding(hasCompleted);

      // Mark that app has been launched
      if (isFirst) {
        await AsyncStorage.setItem('isFirstLaunch', 'false');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Default to first launch if there's an error
      setIsFirstLaunch(true);
      setHasCompletedOnboarding(false);
    } finally {
      setIsOnboardingLoading(false);
    }
  };

  const updateIsFirstLaunch = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('isFirstLaunch', value.toString());
      setIsFirstLaunch(value);
    } catch (error) {
      console.error('Error updating first launch status:', error);
    }
  };

  const updateHasCompletedOnboarding = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', value.toString());
      setHasCompletedOnboarding(value);
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isFirstLaunch,
        setIsFirstLaunch: updateIsFirstLaunch,
        hasCompletedOnboarding,
        setHasCompletedOnboarding: updateHasCompletedOnboarding,
        isOnboardingLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

function RootLayoutNav() {
  const { session, loading: authLoading } = useAuth();
  const { 
    isFirstLaunch, 
    hasCompletedOnboarding, 
    isOnboardingLoading 
  } = useOnboarding();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Navigation logic based on app state
  useEffect(() => {
    if (!authLoading && !isOnboardingLoading) {
      if (!session) {
        // User not authenticated - go to login
        router.replace("/login");
      } else if (isFirstLaunch && !hasCompletedOnboarding) {
        // First launch and onboarding not completed - show onboarding
        router.replace("/onboarding");
      } else {
        // User authenticated and onboarding completed - go to main app
        // The index page (splash) will handle the transition
        console.log('User ready for main app');
      }
    }
  }, [session, authLoading, isFirstLaunch, hasCompletedOnboarding, isOnboardingLoading]);

  // Show loading while checking auth and onboarding status
  if (authLoading || isOnboardingLoading) {
    return null; // The index page (splash screen) will show
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="HelpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
      <Stack.Screen 
        name="fixed-expenses/index" 
        options={{ headerShown: false, title: "Fixed Expenses" }} 
      />
      <Stack.Screen
        name="addtransaction"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useNotificationRedirect();

  return (
    <FixedExpenseProvider>
      <SafeAreaProvider className="flex-1 bg-white">
        <ThemeProvider>
          <SettingsProvider>
            <TransactionProvider>
              <AuthProvider>
                <OnboardingProvider>
                  <StatusBar style="auto" />
                  <RootLayoutNav />
                </OnboardingProvider>
              </AuthProvider>
            </TransactionProvider>
          </SettingsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </FixedExpenseProvider>
  );
}