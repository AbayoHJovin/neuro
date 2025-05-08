import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
      // Navigate to analytics tab with test ID
      router.push({
        pathname: "/(tabs)/analytics",
        params: { testId: id },
      });
    }
  };

  // Choose gradient colors based on mental state
  const getGradientColors = () => {
    return ["#242a70", "#091052"] as const; // Blue gradient
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
      className="mb-4 rounded-2xl overflow-hidden"
    >
      <View className="p-4">
        <Text
          className="text-lg font-bold mb-2"
          style={{ color: getLabelColor() }}
        >
          {label}
        </Text>
        <Text className="text-white opacity-80 text-sm mb-4">
          {description}
        </Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons
              name="time-outline"
              size={16}
              color="#FFFFFF"
              className="mr-1 opacity-70"
            />
            <Text className="text-white opacity-70 text-sm">{timestamp}</Text>
          </View>
          <Pressable onPress={handleReadMore}>
            <Text className="text-[#FFD700] font-semibold text-sm">
              Read More
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TestCard;
