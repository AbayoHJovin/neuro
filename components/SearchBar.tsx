import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
};

const SearchBar = ({
  placeholder = "Search",
  value,
  onChangeText,
  onClear,
}: SearchBarProps) => {
  return (
    <View className="h-11 rounded-lg bg-[rgba(142,142,147,0.08)] flex-row items-center px-2 border border-[#1D4FD7]">
      <View className="px-1.5 ">
        <Ionicons name="search" size={20} color="#1D4FD7" />
      </View>
      <TextInput
        className="flex-1 text-white text-base py-2"
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity className="p-1.5" onPress={onClear}>
          <Ionicons name="close-circle" size={18} color="#8E8E93" />
        </TouchableOpacity>
      )}
      {value.length > 0 && (
        <TouchableOpacity className="p-1.5">
          <Ionicons name="mic" size={20} color="#3563E9" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
