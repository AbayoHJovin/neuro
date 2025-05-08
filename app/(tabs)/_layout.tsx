import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

import AnalyticsIcon from "@/assets/svg/AnalyticsIcon";
import ChatIcon from "@/assets/svg/ChatIcon";
import HistoryTabIcon from "@/assets/svg/HistoryTabIcon";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import BrainIcon from "@/components/BrainIcon";
import CustomTabBar from "@/components/ui/CustomTabBar";

const ICON_SIZE = 22; // Consistent icon size

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3563E9",
        tabBarInactiveTintColor: "#6D6D6D",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <BrainIcon color={color} filled={focused} size={ICON_SIZE} />
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
          tabBarIcon: ({ color }) => (
            <AnalyticsIcon color={color} width={ICON_SIZE} height={ICON_SIZE} />
          ),
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
          tabBarIcon: ({ color }) => (
            <HistoryTabIcon
              color={color}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          ),
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
            <ChatIcon
              color={color}
              filled={focused}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
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
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} width={ICON_SIZE} height={ICON_SIZE} />
          ),
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
    marginTop: 4,
    textAlign: "center",
  },
});
