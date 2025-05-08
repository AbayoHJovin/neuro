import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  lastMessageSnippet: string;
}

interface ChatHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
  isLoading: boolean;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const { width, height } = Dimensions.get("window");

const ChatHistoryModal = ({
  visible,
  onClose,
  chatHistory,
  isLoading,
  onSelectChat,
  onNewChat,
}: ChatHistoryModalProps) => {
  const renderHistoryItem = ({ item }: { item: ChatHistoryItem }) => {
    // Format the timestamp to a more readable format
    const formattedDate = format(parseISO(item.timestamp), "MMM d, yyyy • h:mm a");

    return (
      <TouchableOpacity
        className="bg-[#17153A] rounded-lg p-4 mb-3"
        activeOpacity={0.7}
        onPress={() => onSelectChat(item.id)}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white font-medium text-lg">{item.title}</Text>
          <Text className="text-gray-400 text-xs">{formattedDate}</Text>
        </View>
        <Text className="text-gray-300 text-sm" numberOfLines={2}>
          {item.lastMessageSnippet}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/30 justify-end">
        <View className="bg-[#0A0933] rounded-t-3xl h-[75%] px-4 py-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Chat History</Text>
            <TouchableOpacity
              onPress={onClose}
              className="h-8 w-8 rounded-full bg-[#17153A] justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-[#1D4FD7] rounded-lg py-3 mb-6 flex-row justify-center items-center"
            activeOpacity={0.8}
            onPress={onNewChat}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text className="text-white font-medium text-base ml-2">New Chat</Text>
          </TouchableOpacity>

          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#1D4FD7" />
            </View>
          ) : chatHistory.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400 text-base">No chat history yet</Text>
            </View>
          ) : (
            <FlatList
              data={chatHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ChatHistoryModal; 