import C from "@/assets/svg/c";
import NeuroLabLogo from "@/assets/svg/Logo";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";

export default function OnboardingFirst() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const handleGetStarted = () => {
    // Navigate to the signup screen
    router.push("/onboarding/second");
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
      <View className="flex-row items-center justify-center mt-16">
        <View className="w-36 h-36 mr-0 items-center justify-center">
          <NeuroLabLogo />
        </View>
        <Text className="text-white text-4xl font-bold">NeuroLab</Text>
      </View>

      {/* Middle section with welcome text */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="flex-row items-center justify-center">
          <View className="w-20 h-20 mb-4 items-center justify-center">
            <C />
          </View>
          <Text className="text-white text-2xl text-center">Welcome,</Text>
        </View>

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
        <Button title="Get Started" onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  );
}
