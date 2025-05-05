import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import Stars from "@/assets/svg/Stars";
import Button from "@/components/Button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import InputField from "@/components/InputField";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    // Clear any previous API errors
    setApiError("");

    // Validate form inputs
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      // Try to make the API call
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set onboarding as completed
        await AsyncStorage.setItem("hasCompletedOnboarding", "true");
        // Handle successful login
        router.replace("/(tabs)");
      } else {
        // Handle API error responses
        setApiError(
          data.message || "Login failed. Please check your credentials."
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Using mock data, API unreachable:", error);

      // For demo - simulate login with test credentials
      // Use email: test@example.com and password: password123 for successful login
      if (email === "test@example.com" && password === "password123") {
        setTimeout(async () => {
          await AsyncStorage.setItem("hasCompletedOnboarding", "true").catch(
            (err) =>
              console.error("Error setting onboarding completion status:", err)
          );
          setIsLoading(false);
          router.replace("/(tabs)");
        }, 1500);
      } else {
        // Simulate failed login
        setTimeout(() => {
          setApiError("Invalid email or password");
          setIsLoading(false);
        }, 1500);
      }
    }
  };

  const handleGoogleLogin = async () => {
    // Clear any previous API errors
    setApiError("");
    setIsLoading(true);

    try {
      // This would connect to Google Sign-In in a real implementation
      // For demo purposes, we'll just set the onboarding as completed
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/(tabs)");
      }, 1500);
    } catch (error) {
      console.error("Error setting onboarding completion status:", error);
      setApiError("Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    router.push("/onboarding/second");
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "A password reset link would be sent to your email."
    );
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
              Login to get updates
            </Text>
          </View>

          {/* API Error Message */}
          {apiError ? (
            <View className="mt-4 mx-8 bg-red-900/30 border border-red-500 rounded-lg p-3">
              <Text className="text-red-500 text-center">{apiError}</Text>
            </View>
          ) : null}

          {/* Form fields */}
          <View className="mt-8 px-8 w-full">
            <InputField
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email && text.trim()) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password && text.trim()) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              secureTextEntry
              showPasswordToggle
              error={errors.password}
              containerStyle="mb-2"
            />

            <View className="items-end mb-6">
              <Pressable onPress={handleForgotPassword}>
                <Text className="text-white opacity-80">Forgot Password?</Text>
              </Pressable>
            </View>

            <Button
              title="Login"
              onPress={handleLogin}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Or sign in section */}
          <View className="mt-8 px-8">
            <View className="flex-row items-center justify-center">
              <View className="h-[1px] bg-white opacity-20 flex-1" />
              <Text className="text-white mx-4">Or Sign In</Text>
              <View className="h-[1px] bg-white opacity-20 flex-1" />
            </View>
          </View>

          {/* Google sign in button */}
          <View className="mt-6 px-8">
            <GoogleSignInButton onPress={handleGoogleLogin} />
          </View>

          {/* Don't have account section */}
          <View className="mt-8 mb-6 items-center justify-center flex-row">
            <Text className="text-white">Don&apos;t have an account? </Text>
            <Pressable onPress={goToRegister}>
              <Text className="text-[#3D5AF1] font-medium">Register</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
