import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: string;
  showPasswordToggle?: boolean;
}

export default function InputField({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  containerStyle = "mb-6",
  showPasswordToggle = false,
  ...props
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className={containerStyle}>
      <Text className="text-white mb-2">{label}</Text>
      <View className="relative">
        <View
          className={`bg-[#242350] rounded-lg flex-row items-center ${
            error ? "border border-red-500" : ""
          }`}
        >
          <TextInput
            className={`text-white h-14 rounded-lg px-4 flex-1 ${
              showPasswordToggle ? "pr-10" : ""
            }`}
            placeholderTextColor="#6b6b6b"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            {...props}
          />
          {showPasswordToggle && (
            <Pressable
              onPress={togglePasswordVisibility}
              style={{ position: "absolute", right: 12 }}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <AntDesign
                name={isPasswordVisible ? "eye" : "eyeo"}
                size={20}
                color="#B8A625"
              />
            </Pressable>
          )}
        </View>
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
