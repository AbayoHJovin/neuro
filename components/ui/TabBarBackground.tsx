import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["rgba(29, 79, 215, 0.2)", "rgba(64, 134, 244, 0.02)"]}
        locations={[-0.152, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFill, { height: "100%", width: "100%" }]}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  return 20; // Extra space to account for the tab bar gradient effect
}
