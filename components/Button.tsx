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
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  isLoading = false,
  variant = "primary",
  disabled = false,
  fullWidth = true,
  ...props
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = fullWidth 
      ? "rounded-lg items-center justify-center h-14 px-8 w-full" 
      : "rounded-lg items-center justify-center h-14 px-8";
      
    if (disabled)
      return `bg-[#8c7e24] ${baseStyle}`;

    switch (variant) {
      case "primary":
        return `bg-[#B8A625] ${baseStyle}`;
      case "secondary":
        return `bg-[#3D5AF1] ${baseStyle}`;
      case "outline":
        return `border border-[#B8A625] ${baseStyle}`;
      default:
        return `bg-[#B8A625] ${baseStyle}`;
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
