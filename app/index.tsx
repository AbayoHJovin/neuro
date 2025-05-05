import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("hasCompletedOnboarding");
        setHasCompletedOnboarding(status === "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#050628",
        }}
      >
        <ActivityIndicator size="large" color="#B8A625" />
      </View>
    );
  }

  // Redirect to tabs directly if user has completed onboarding
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise redirect to onboarding
  return <Redirect href="/onboarding" />;
}
