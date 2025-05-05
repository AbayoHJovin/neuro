import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  isLoading = false,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) {
  const getButtonStyle = () => {
    if (disabled)
      return "bg-[#8c7e24] rounded-lg items-center justify-center h-14";

    switch (variant) {
      case "primary":
        return "bg-[#B8A625] rounded-lg items-center justify-center h-14";
      case "secondary":
        return "bg-[#3D5AF1] rounded-lg items-center justify-center h-14";
      case "outline":
        return "border border-[#B8A625] rounded-lg items-center justify-center h-14";
      default:
        return "bg-[#B8A625] rounded-lg items-center justify-center h-14";
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return "text-[#B8A625] text-lg font-medium";
      default:
        return "text-white text-lg font-medium";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading || disabled}
      className={getButtonStyle()}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={getTextStyle()}>{title}</Text>
      )}
    </Pressable>
  );
}
