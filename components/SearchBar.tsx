import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Ionicons name="close-circle" size={18} color="#8E8E93" />
        </TouchableOpacity>
      )}
      {value.length > 0 && (
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={20} color="#3563E9" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(142, 142, 147, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  searchIconContainer: {
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 6,
  },
  micButton: {
    padding: 6,
  },
});

export default SearchBar;
