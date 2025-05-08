import HistoryIcon from "@/assets/svg/HistoryIcon";
import ScrollToBottomIcon from "@/assets/svg/ScrollToBottomIcon";
import SendIcon from "@/assets/svg/SendIcon";
import BrainIcon from "@/components/BrainIcon";
import ChatHistoryModal from "@/components/History/ChatHistoryModal";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import SafeAreaForTabs from "@/components/ui/SafeAreaForTabs";
import apiService, { ChatHistoryItem } from "@/services/api";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello how can i help you today with your mental health?",
      isUser: false,
      timestamp: "5:20 PM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Chat history state
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const scrollPositionRef = useRef(0);

  // Fetch chat history
  const fetchChatHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const history = await apiService.getChatHistory();
      setChatHistory(history);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // Load a specific chat by ID
  const handleSelectChat = async (chatId: string) => {
    try {
      setIsLoading(true);
      const chatDetail = await apiService.getChatById(chatId);

      if (chatDetail && chatDetail.messages) {
        // Convert API messages to the local Message format
        const formattedMessages = chatDetail.messages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          isUser: msg.isUser,
          timestamp: msg.timestamp,
        }));

        setMessages(formattedMessages);
      }

      // Close the history modal
      setHistoryModalVisible(false);
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new chat
  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello how can i help you today with your mental health?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
    setHistoryModalVisible(false);
  };

  const handleOpenHistory = () => {
    fetchChatHistory();
    setHistoryModalVisible(true);
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    // Add user message to the list
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call API to get AI response
      const response = await fetch("http:10.0.2.2:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (
        data.success &&
        data.responseChunks &&
        data.responseChunks.length > 0
      ) {
        // Create initial AI message
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: "",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        };

        // Add empty message to start
        setMessages((prev) => [...prev, aiMessage]);

        // Wait for a moment with the typing indicator
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsTyping(false);

        let fullText = "";

        // Process each chunk from the server
        for (let i = 0; i < data.responseChunks.length; i++) {
          const chunk = data.responseChunks[i];

          fullText += (i > 0 ? " " : "") + chunk;

          // Update the message with the current text
          setMessages((prev) => [
            ...prev.slice(0, -1),
            {
              ...aiMessage,
              text: fullText,
            },
          ]);

          // Add a delay between chunks
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  const handleScroll = (event: any) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    const distanceFromBottom =
      event.nativeEvent.contentSize.height -
      currentPosition -
      event.nativeEvent.layoutMeasurement.height;

    scrollPositionRef.current = currentPosition;

    // Show scroll button when user is not at the bottom
    setShowScrollToBottom(distanceFromBottom > 100);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToBottom
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [scrollToBottom]);

  // Auto-scroll when a new message is added
  useEffect(() => {
    if (!showScrollToBottom) {
      scrollToBottom();
    }
  }, [messages, showScrollToBottom, scrollToBottom]);

  return (
    <SafeAreaForTabs className="bg-[#050628] px-4 pt-4">
      <StatusBar style="light" />
      <View className="flex-row justify-between items-center px-5 pt-2.5 pb-5">
        <View className="flex-row items-center">
          <BrainIcon size={32} color="#3563E9" filled={true} />
          <Text className="text-white text-lg font-bold ml-2">NeurAi</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full overflow-hidden">
            <Image
              source={require("../../assets/images/userAvatar.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* AI Assistant Title with History Icon */}
      <View className="flex-row items-center justify-between px-5 mb-3">
        <Text className="text-white text-2xl font-bold">Ai Assistant</Text>
        <TouchableOpacity onPress={handleOpenHistory} activeOpacity={0.7}>
          <HistoryIcon color="#3563E9" width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            message={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
          />
        )}
        keyExtractor={(item) => item.id}
        className="flex-grow"
        contentContainerStyle={{ paddingVertical: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        style={{ zIndex: 0 }}
      />

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Scroll to bottom button */}
      {showScrollToBottom && (
        <TouchableOpacity
          className="absolute right-4 bottom-20 shadow-md shadow-black/40"
          onPress={scrollToBottom}
          activeOpacity={0.8}
        >
          <ScrollToBottomIcon width={40} height={40} />
        </TouchableOpacity>
      )}

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
        className="p-3"
      >
        <View className="flex-row items-center rounded-lg border border-[#1D4FD7] px-4 py-1">
          <TextInput
            className="flex-1 text-white text-base py-3"
            placeholder="Enter Message"
            placeholderTextColor="#1D4FD7"
            value={inputText}
            onChangeText={setInputText}
            multiline={true}
            numberOfLines={1}
            maxLength={500}
          />
          <TouchableOpacity
            className="w-10 h-10 justify-center items-center ml-2"
            onPress={handleSend}
            disabled={isLoading || inputText.trim() === ""}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <SendIcon color="#1D4FD7" width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Chat History Modal */}
      <ChatHistoryModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        chatHistory={chatHistory}
        isLoading={isHistoryLoading}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
    </SafeAreaForTabs>
  );
}
