import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TransactionProvider } from "~/src/context/TransactionContext";
import { SettingsProvider } from "~/src/context/SettingsContext";
import { ThemeProvider, useTheme } from "~/src/context/ThemeContext";
import { FixedExpenseProvider } from "~/src/context/FixedExpensesContext";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 20,
            right: 20,
            height: 60,
            borderRadius: 10,
            backgroundColor: theme.colors.surface,
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingHorizontal: 20,
          },
          tabBarItemStyle: {
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        {/* Empty screen for the add button space */}
        <Tabs.Screen
          name="add-transaction"
          options={{
            title: '',
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budget",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      
      {/* Floating Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push("../../addtransaction")}
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 35,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default function TabRoot() {
  return (
    <FixedExpenseProvider>
      <ThemeProvider>
        <SettingsProvider>
          <TransactionProvider>
            <TabNavigator />
          </TransactionProvider>
        </SettingsProvider>
      </ThemeProvider>
    </FixedExpenseProvider>
  );
}