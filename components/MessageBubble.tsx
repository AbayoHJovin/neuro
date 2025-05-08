import React from "react";
import { Text, View } from "react-native";
import BrainIcon from "./BrainIcon";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  return (
    <View
      className={`flex-row mx-4 my-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <View className="mr-2 self-start bg-[rgba(53,99,233,0.1)] rounded-2xl p-2">
          <BrainIcon size={24} color="#3563E9" filled />
        </View>
      )}
      <View
        className={`p-3 rounded-2xl max-w-[80%] ${
          isUser ? "bg-[#1D4FD7] rounded-br-sm" : "bg-[#022266] rounded-bl-sm"
        }`}
      >
        <View className="flex-row justify-between mb-1">
          <Text className="text-white font-bold text-sm">
            {isUser ? "User" : "NeurAi"}
          </Text>
        </View>
        <Text className="text-white text-[15px] leading-5">{message}</Text>
        <Text className="text-white opacity-60 text-xs mt-1.5 self-end">
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
