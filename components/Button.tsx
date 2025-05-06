import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
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
      ? "items-center justify-center w-full"
      : "items-center justify-center";

    if (disabled) return `bg-[#8c7e24] ${baseStyle}`;

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
    <View className={fullWidth ? "w-full items-center" : "items-center"}>
      <Pressable
        onPress={onPress}
        disabled={isLoading || disabled}
        className={getButtonStyle()}
        style={[
          styles.button,
          fullWidth ? styles.fullWidthButton : styles.regularButton,
        ]}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className={getTextStyle()} style={styles.buttonText}>
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
  },
  fullWidthButton: {
    width: "80%",
  },
  regularButton: {
    minWidth: 200,
  },
  buttonText: {
    lineHeight: 24,
  },
});
