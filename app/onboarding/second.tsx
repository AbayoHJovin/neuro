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
  const [apiError, setApiError] = useState("");
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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(password)) {
      newErrors.password = "Password must contain at least one number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    // Clear any previous API errors
    setApiError("");

    // Validate form inputs
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      // Try to make the API call
      const response = await fetch("http:10.0.2.2:5000/api/signup", {
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

      const data = await response.json();

      if (response.ok) {
        // Set signup as successful but don't mark onboarding as completed yet
        // Navigate to login screen after successful signup
        setIsLoading(false);
        router.replace("/onboarding/third");
      } else {
        // Handle API error responses
        setApiError(data.message || "Signup failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Using mock data, API unreachable:", error);

      // For demo - simulate some errors based on email
      if (email === "existing@example.com") {
        setApiError("User with this email already exists");
        setIsLoading(false);
        return;
      }

      // Simulate API call with mock data for successful flow
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/onboarding/third");
      }, 1500);
    }
  };

  const handleGoogleSignUp = async () => {
    // Clear any previous API errors
    setApiError("");
    setIsLoading(true);

    try {
      // This would connect to Google Sign-In in a real implementation
      // For demo purposes, we'll just navigate to login screen
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/onboarding/third");
      }, 1500);
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      setApiError("Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    // Navigate to login screen
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
              Sign up to track your mental status
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
            <Text className="text-white text-base mb-2">Full Names</Text>
            <InputField
              label=""
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName && text.trim()) {
                  setErrors({ ...errors, fullName: "" });
                }
              }}
              error={errors.fullName}
              containerStyle="mb-6"
              inputStyle="bg-[#2C2C4A]"
              placeholder=""
            />

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
              containerStyle="mb-6"
              inputStyle="bg-[#2C2C4A]"
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
              containerStyle="mb-6"
              inputStyle="bg-[#2C2C4A]"
              placeholder=""
            />

            <View className="mt-4 mb-4 items-center">
              <Button
                title="Sign Up"
                onPress={handleSignUp}
                isLoading={isLoading}
                disabled={isLoading}
                fullWidth={true}
              />
            </View>
          </View>

          {/* Form requirements info */}
          <View className="mb-6 px-4">
            <Text className="text-gray-400 text-xs">
              • Password must be at least 6 characters
            </Text>
            <Text className="text-gray-400 text-xs">
              • Password must contain at least one number
            </Text>
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
            <GoogleSignInButton onPress={handleGoogleSignUp} />
          </View>

          {/* Already have account section */}
          <View className="mb-8 items-center justify-center flex-row">
            <Text className="text-white">Already have an account? </Text>
            <Pressable
              onPress={goToLogin}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-[#3D5AF1] font-medium">Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
