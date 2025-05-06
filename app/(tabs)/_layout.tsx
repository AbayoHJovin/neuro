import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

import AnalyticsIcon from "@/assets/svg/AnalyticsIcon";
import ChatIcon from "@/assets/svg/ChatIcon";
import HistoryIcon from "@/assets/svg/HistoryIcon";
import HomeIcon from "@/assets/svg/HomeIcon";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: "#3563E9",
        tabBarInactiveTintColor: "#6D6D6D",
        tabBarStyle: {
          backgroundColor: "#040429",
          height: 60,
          borderTopWidth: 0,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={color} filled={focused} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.label,
                { color, fontWeight: focused ? "600" : "400" },
              ]}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => <AnalyticsIcon color={color} />,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.label,
                { color, fontWeight: focused ? "600" : "400" },
              ]}
            >
              Analytics
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.label,
                { color, fontWeight: focused ? "600" : "400" },
              ]}
            >
              History
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <ChatIcon color={color} filled={focused} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.label,
                { color, fontWeight: focused ? "600" : "400" },
              ]}
            >
              Chat
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[
                styles.label,
                { color, fontWeight: focused ? "600" : "400" },
              ]}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 2,
  },
});
