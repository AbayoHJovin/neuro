import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TestCardProps = {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  onPress?: () => void;
};

const TestCard = ({
  id,
  label,
  description,
  timestamp,
  onPress,
}: TestCardProps) => {
  const handleReadMore = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to analytics tab with test ID and slide from right animation
      router.push(
        {
          pathname: "/(tabs)/analytics",
          params: { testId: id },
        },
        {
          animation: "slide_from_right",
        }
      );
    }
  };

  // Choose gradient colors based on mental state
  const getGradientColors = () => {
    switch (label) {
      case "Focused":
        return ["#242a70", "#091052"]; // Blue gradient
      case "Relaxed":
        return ["#145214", "#1c7947"]; // Green gradient
      case "Distracted":
        return ["#5c2323", "#8a3030"]; // Red gradient
      case "Flow State":
        return ["#4a3268", "#7b4dbd"]; // Purple gradient
      case "Meditative":
        return ["#1d6a8c", "#2a95c4"]; // Teal gradient
      default:
        return ["#242a70", "#091052"]; // Default blue gradient
    }
  };

  // Choose label color based on mental state
  const getLabelColor = () => {
    switch (label) {
      case "Focused":
        return "#4ADE80"; // Green
      case "Relaxed":
        return "#60D6FF"; // Light blue
      case "Distracted":
        return "#FF6060"; // Red
      case "Flow State":
        return "#B490FF"; // Purple
      case "Meditative":
        return "#60EFFF"; // Cyan
      default:
        return "#4ADE80"; // Default green
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.label, { color: getLabelColor() }]}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#FFFFFF"
              style={styles.timeIcon}
            />
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <Pressable onPress={handleReadMore}>
            <Text style={styles.readMore}>Read More</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeIcon: {
    marginRight: 4,
    opacity: 0.7,
  },
  timestamp: {
    color: "#FFFFFF",
    opacity: 0.7,
    fontSize: 14,
  },
  readMore: {
    color: "#FFD700",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default TestCard;
