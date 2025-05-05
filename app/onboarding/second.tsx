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

import Button from "@/components/Button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import InputField from "@/components/InputField";
import StarIcon from "@/components/StarIcon";

// Mock data for simulation
const MOCK_USER = {
  email: "test@example.com",
  password: "password123",
};

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      // Try to make the API call
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set onboarding as completed
        await AsyncStorage.setItem("hasCompletedOnboarding", "true");
        // Handle successful signup
        router.replace("/(tabs)");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.log("Using mock data, API unreachable:", error);

      // Simulate API call with mock data
      // Just simulate success for now since this is just a UI mockup
      setTimeout(async () => {
        // Set onboarding as completed even in mock mode
        await AsyncStorage.setItem("hasCompletedOnboarding", "true").catch(
          (err) =>
            console.error("Error setting onboarding completion status:", err)
        );
        setIsLoading(false);
        router.replace("/(tabs)");
      }, 1500);
    }
  };

  const handleGoogleSignUp = async () => {
    // This would connect to Google Sign-In in a real implementation
    Alert.alert("Info", "Google Sign-In would be implemented here");

    // For demo purposes, we'll just set the onboarding as completed
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/(tabs)");
      }, 1500);
    } catch (error) {
      console.error("Error setting onboarding completion status:", error);
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    // Navigate to login screen (not implemented yet)
    Alert.alert("Info", "Login screen would be implemented next");
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
            <StarIcon size={40} />
          </View>

          {/* Header text */}
          <View className="mt-6 px-8">
            <Text className="text-white text-3xl font-bold mb-2">
              Welcome To NeuroLab
            </Text>
            <Text className="text-white text-lg opacity-80">
              Sign up to track your mental status
            </Text>
          </View>

          {/* Form fields */}
          <View className="mt-8 px-8 w-full">
            <InputField
              label="Full Names"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              error={errors.fullName}
            />

            <InputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              containerStyle="mb-2"
            />

            <View className="items-end mb-6">
              <Text className="text-white opacity-80">Forgot Password?</Text>
            </View>

            <Button
              title="Sign Up"
              onPress={handleSignUp}
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
            <GoogleSignInButton onPress={handleGoogleSignUp} />
          </View>

          {/* Already have account section */}
          <View className="mt-8 mb-6 items-center justify-center flex-row">
            <Text className="text-white">Already have an account? </Text>
            <Pressable onPress={goToLogin}>
              <Text className="text-[#3D5AF1] font-medium">Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
