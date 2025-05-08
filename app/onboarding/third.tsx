import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
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
      const response = await fetch("http:10.0.2.2:5000/api/login", {
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
        // Don't set onboarding as completed yet - that happens in the help-menu
        // Navigate to help menu screen after successful login
        setIsLoading(false);
        router.replace("/onboarding/help-menu");
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
        setTimeout(() => {
          setIsLoading(false);
          router.replace("/onboarding/help-menu");
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
      // For demo purposes, navigate to help menu
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/onboarding/help-menu");
      }, 1500);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setApiError("Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    router.push("/onboarding/second");
  };

  const handleForgotPassword = () => {
    router.push("/onboarding/reset-password");
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
          className="p-4"
        >
          {/* Star icon */}
          <View className="mt-8 ml-4">
            <Stars />
          </View>

          {/* Header text */}
          <View className="mt-8 mb-8">
            <Text className="text-white text-center text-3xl font-bold mb-3">
              Welcome To NeuroLab
            </Text>
            <Text className="text-white text-center text-lg opacity-80">
              Login to get updates
            </Text>
          </View>

          {/* API Error Message */}
          {apiError ? (
            <View className="mb-6 mx-4 bg-red-900/30 border border-red-500 rounded-lg p-3">
              <Text className="text-red-500 text-center">{apiError}</Text>
            </View>
          ) : null}

          {/* Form fields */}
          <View className="mb-6 px-4 w-full">
            <Text className="text-white text-base mb-2">Email</Text>
            <InputField
              label=""
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
              inputStyle="bg-[#2C2C4A]"
              containerStyle="mb-6"
              placeholder=""
            />

            <Text className="text-white text-base mb-2">Password</Text>
            <InputField
              label=""
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
              inputStyle="bg-[#2C2C4A]"
              containerStyle="mb-4"
              placeholder=""
            />

            <View className="items-end mb-6">
              <Pressable
                onPress={handleForgotPassword}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-white opacity-80">Forgot Password?</Text>
              </Pressable>
            </View>

            <View className="items-center">
              <Button
                title="Login"
                onPress={handleLogin}
                isLoading={isLoading}
                disabled={isLoading}
                fullWidth={true}
              />
            </View>
          </View>

          {/* Or sign in section */}
          <View className="mb-6 px-4">
            <View className="flex-row items-center justify-center">
              <View className="h-[1px] bg-white opacity-20 flex-1" />
              <Text className="text-white mx-4">Or Sign In</Text>
              <View className="h-[1px] bg-white opacity-20 flex-1" />
            </View>
          </View>

          {/* Google sign in button */}
          <View className="mb-8 px-4 items-center">
            <GoogleSignInButton onPress={handleGoogleLogin} />
          </View>

          {/* Don't have account section */}
          <View className="mb-8 items-center justify-center flex-row">
            <Text className="text-white">Don&apos;t have an account? </Text>
            <Pressable
              onPress={goToRegister}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-[#3D5AF1] font-medium">Register</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
