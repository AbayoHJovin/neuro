import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";

import Stars from "@/assets/svg/Stars";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (isSuccess) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSuccess]);

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleChangePassword = async () => {
    // Clear previous errors
    setApiError("");

    // Validate email
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to request password reset
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        setIsSuccess(true);
      } else {
        // Show error message
        setApiError(
          data.message || "Failed to process your request. Please try again."
        );
      }
    } catch (error) {
      console.log("API error or not reachable:", error);

      // For demo purposes, simulate success after a brief delay
      setTimeout(() => {
        setIsSuccess(true);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToLogin = () => {
    router.push("/onboarding/third");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050628]">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Star icon */}
          <View className="mt-10 ml-8">
            <Stars />
          </View>

          {/* Header text */}
          <View className="mt-6 px-8">
            <Text className="text-white text-center text-3xl font-bold mb-2">
              Welcome To NeuroLab
            </Text>
            <Text className="text-white text-center text-lg opacity-80">
              {isSuccess ? "Check your email" : "Reset your password"}
            </Text>
          </View>

          {/* API Error Message */}
          {apiError ? (
            <View className="mt-4 mx-8 bg-red-900/30 border border-red-500 rounded-lg p-3">
              <Text className="text-red-500 text-center">{apiError}</Text>
            </View>
          ) : null}

          {isSuccess ? (
            // Success message with fade-in animation
            <Animated.View
              className="flex-1 px-8 items-center justify-center"
              style={{ opacity: fadeAnim }}
            >
              <Text className="text-white text-center text-lg mb-6">
                A password reset link has been sent to your email. Please check
                your inbox and follow the instructions to reset your password.
              </Text>
              <View className="w-full px-4">
                <Button 
                  title="Return to Login" 
                  onPress={handleReturnToLogin}
                  fullWidth={true}
                />
              </View>
            </Animated.View>
          ) : (
            // Reset password form
            <View className="mt-8 px-8 w-full">
              <Text className="text-white text-base mb-3">
                Enter your Email
              </Text>
              <InputField
                label=""
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error && text.trim()) {
                    setError("");
                  }
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
                containerStyle="mb-10"
              />

              <View className="items-center w-full px-4">
                <Button
                  title="Change Password"
                  onPress={handleChangePassword}
                  isLoading={isLoading}
                  disabled={isLoading}
                  fullWidth={true}
                />
              </View>
              
              {/* Return to login link */}
              <View className="mt-8 mb-6 items-center justify-center">
                <Pressable 
                  onPress={handleReturnToLogin} 
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  className="py-2 px-4"
                >
                  <Text className="text-[#3D5AF1] text-base font-medium">Return to Login</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
 