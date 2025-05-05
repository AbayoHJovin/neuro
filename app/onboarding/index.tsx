import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function OnboardingFirst() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const handleGetStarted = () => {
    // For now, we'll navigate to the tabs directly
    // This will be replaced once the second screen is fully implemented
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050628]">
      <StatusBar style="light" />

      {/* Background dots */}
      <View className="absolute top-5 left-5">
        <View className="w-2 h-2 rounded-full bg-gray-500/50" />
      </View>
      <View className="absolute top-5 right-5">
        <View className="w-2 h-2 rounded-full bg-[#B8A625]" />
      </View>
      <View className="absolute bottom-32 right-5">
        <View className="w-2 h-2 rounded-full bg-[#B8A625]" />
      </View>

      {/* Top logo section */}
      <View className="flex-1 items-center justify-center mt-16">
        <View className="w-36 h-36 mb-4 items-center justify-center">
          {/* NeuroLab logo - a circuit-like brain icon */}
          <View className="w-32 h-32 rounded-full border-2 border-[#B8A625] items-center justify-center">
            <View className="absolute w-full h-full">
              <View className="absolute w-2 h-2 rounded-full bg-[#B8A625] left-1/4 top-1/4" />
              <View className="absolute w-2 h-2 rounded-full bg-[#B8A625] right-1/4 top-1/4" />
              <View className="absolute w-2 h-2 rounded-full bg-[#B8A625] left-1/4 bottom-1/4" />
              <View className="absolute w-2 h-2 rounded-full bg-[#B8A625] right-1/4 bottom-1/4" />
              <View className="absolute w-4 h-4 rounded-full bg-[#B8A625] left-1/2 top-1/2 -ml-2 -mt-2" />

              {/* Connection lines */}
              <View className="absolute w-[1px] h-16 bg-[#B8A625] left-1/2 -ml-[0.5px] top-0" />
              <View className="absolute w-[1px] h-16 bg-[#B8A625] left-1/2 -ml-[0.5px] bottom-0" />
              <View className="absolute w-16 h-[1px] bg-[#B8A625] top-1/2 -mt-[0.5px] left-0" />
              <View className="absolute w-16 h-[1px] bg-[#B8A625] top-1/2 -mt-[0.5px] right-0" />
            </View>
          </View>
        </View>
        <Text className="text-white text-4xl font-bold">NeuroLab</Text>
      </View>

      {/* Middle section with welcome text */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-10 h-10 mb-4 items-center justify-center">
          <Text className="text-[#B8A625] text-6xl font-light">C</Text>
        </View>
        <Text className="text-white text-2xl font-medium text-center">
          Welcome,
        </Text>

        <Text className="text-white text-3xl font-bold text-center mt-5">
          Track your
        </Text>
        <Text className="text-white text-3xl font-bold text-center mt-1">
          Mental Health Status
        </Text>
        <Text className="text-white text-3xl font-bold text-center mt-1">
          with ease
        </Text>
      </View>

      {/* Pagination dots */}
      <View className="flex-row justify-center items-center mb-8">
        <View className="w-12 h-1 bg-white rounded-full mx-1" />
        <View className="w-6 h-1 bg-white/40 rounded-full mx-1" />
        <View className="w-6 h-1 bg-white/40 rounded-full mx-1" />
      </View>

      {/* Button */}
      <View className="px-6 mb-10">
        <Pressable
          onPress={handleGetStarted}
          className="bg-[#B8A625] rounded-full py-4 items-center"
        >
          <Text className="text-white text-lg font-medium">Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
