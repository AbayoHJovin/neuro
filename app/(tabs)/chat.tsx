import ScrollToBottomIcon from "@/assets/svg/ScrollToBottomIcon";
import SendIcon from "@/assets/svg/SendIcon";
import BrainIcon from "@/components/BrainIcon";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
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

  const flatListRef = useRef<FlatList>(null);
  const scrollPositionRef = useRef(0);

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
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (data.success) {
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
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsTyping(false);

        // Split response into chunks (sentences or parts of sentences)
        const fullResponse = data.response;
        const chunks = fullResponse.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [
          fullResponse,
        ];

        let currentText = "";

        // Process each chunk
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i].trim();
          if (!chunk) continue;

          currentText += (i > 0 ? " " : "") + chunk;

          // Update the message with the current text
          setMessages((prev) => [
            ...prev.slice(0, -1),
            {
              ...aiMessage,
              text: currentText,
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

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

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
  }, []);

  // Auto-scroll when a new message is added
  useEffect(() => {
    if (!showScrollToBottom) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-[#050628]">
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BrainIcon size={32} color="#3563E9" filled={true} />
          <Text style={styles.headerTitle}>NeurAi</Text>
        </View>
        <View style={styles.profileIconContainer}>
          <Image
            source={require("../../assets/images/userAvatar.png")}
            style={styles.profileIcon}
            resizeMode="cover"
          />
        </View>
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
        className="border-t border-t-white/10 p-3"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
