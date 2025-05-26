import {router, Stack} from "expo-router";
import "./../../global.css";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider,useAuth } from "../context/AuthContext";
import { TransactionProvider } from "./../context/TransactionContext";
import { useNotificationRedirect } from "../providers/NotificationProvider";
import { SettingsProvider } from "../context/SettingsContext";
import { NavigationContainer } from "@react-navigation/native";



function RootLayoutNav() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/");
    }
  }, [session, loading]);

  if (loading) {
    return null; // Or a loading screen
  }

  return (

    <Stack>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="HelpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="addtransaction"
        options={{
          presentation: "transparentModal", // or "modal"
          animation: "slide_from_bottom",
          headerShown: false, // optional
        }}
      />
     
    </Stack>
  );
}

export default function RootLayout() {

  useNotificationRedirect();

  return (
   <SettingsProvider>
     <TransactionProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <RootLayoutNav />
      </AuthProvider>
    </TransactionProvider>
   </SettingsProvider>
  );
}
