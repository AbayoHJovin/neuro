import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import apiService, { UserProfile } from "@/services/api";

interface ProfileUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onProfileUpdated: (profile: UserProfile) => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  visible,
  onClose,
  currentProfile,
  onProfileUpdated,
}) => {
  const [fullName, setFullName] = useState(currentProfile.fullName);
  const [email, setEmail] = useState(currentProfile.email);
  const [profilePicture, setProfilePicture] = useState(currentProfile.profilePicture);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setFullName(currentProfile.fullName);
    setEmail(currentProfile.email);
    setProfilePicture(currentProfile.profilePicture);
    setErrorMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need access to your photos to update your profile picture."
        );
        return;
      }

      setIsUploading(true);
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Resize/optimize image
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // In a real app, you would upload this to a server and get a URL back
        // For demo purposes, we'll just use the local URI
        setProfilePicture(manipulatedImage.uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image. Please try again.");
      console.error("Image selection error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      setErrorMessage("Name cannot be empty");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // In a real app, you would upload the image to a server first
      // and then update the profile with the image URL
      const result = await apiService.updateUserProfile({
        fullName,
        email,
        profilePicture,
      });

      if (result.success && result.profile) {
        onProfileUpdated(result.profile);
        Alert.alert("Success", result.message);
        onClose();
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Update failed. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-[#0A0933] rounded-t-3xl p-6 w-full">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Update Profile</Text>
            <TouchableOpacity
              onPress={handleClose}
              className="h-8 w-8 rounded-full bg-[#17153A] justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Picture Section */}
          <View className="items-center mb-6">
            <View className="relative">
              {isUploading ? (
                <View className="w-24 h-24 rounded-full bg-[#1D4FD7]/30 justify-center items-center">
                  <ActivityIndicator size="large" color="#3563E9" />
                </View>
              ) : (
                <Image
                  source={{ uri: profilePicture }}
                  className="w-24 h-24 rounded-full bg-[#1D4FD7]/20"
                />
              )}
              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-0 right-0 bg-[#1D4FD7] w-8 h-8 rounded-full justify-center items-center"
              >
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text className="text-white/60 text-sm mt-2">Tap to change profile picture</Text>
          </View>

          {/* Form Fields */}
          <View className="mb-4">
            <Text className="text-white text-base mb-2">Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              className="bg-[#17153A] text-white px-4 py-3 rounded-lg mb-4"
              placeholderTextColor="#6B7280"
            />

            <Text className="text-white text-base mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-[#17153A] text-white px-4 py-3 rounded-lg"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#B8A70B] py-4 rounded-lg items-center mt-4"
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-white font-bold text-lg">Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileUpdateModal; 