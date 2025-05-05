import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: string;
}

export default function InputField({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  containerStyle = "mb-6",
  ...props
}: InputFieldProps) {
  return (
    <View className={containerStyle}>
      <Text className="text-white mb-2">{label}</Text>
      <TextInput
        className={`bg-[#242350] text-white h-14 rounded-lg px-4 ${
          error ? "border border-red-500" : ""
        }`}
        placeholderTextColor="#6b6b6b"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
