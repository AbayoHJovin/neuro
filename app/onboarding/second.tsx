import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function OnboardingSecond() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050628]">
      <StatusBar style="light" />

      {/* Placeholder for the second onboarding screen */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl mb-8">
          Second Onboarding Screen
        </Text>
        <Text className="text-white text-center px-8 mb-10">
          This is a placeholder for the second onboarding screen. It will be
          updated once the first screen is approved.
        </Text>

        <Pressable
          onPress={handleContinue}
          className="bg-[#B8A625] rounded-full py-4 px-16 items-center mt-8"
        >
          <Text className="text-white text-lg font-medium">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
