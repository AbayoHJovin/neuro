import BrainIcon from "@/components/BrainIcon";
import ProfileUpdateModal from "@/components/ProfileUpdateModal";
import SafeAreaForTabs from "@/components/ui/SafeAreaForTabs";
import apiService, { UserProfile } from "@/services/api";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const userProfile = await apiService.getUserProfile();
      if (userProfile) {
        setProfile(userProfile);
      } else {
        Alert.alert(
          "Error",
          "Failed to load profile information. Please try again."
        );
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  if (isLoading) {
    return (
      <SafeAreaForTabs className="bg-[#050628] px-4 flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3563E9" />
        <Text className="text-white mt-4">Loading profile...</Text>
      </SafeAreaForTabs>
    );
  }

  if (!profile) {
    return (
      <SafeAreaForTabs className="bg-[#050628] px-4 flex-1 justify-center items-center">
        <Text className="text-white text-center">
          Could not load profile information. Please try again later.
        </Text>
        <TouchableOpacity
          className="mt-4 bg-[#3563E9] px-6 py-3 rounded-lg"
          onPress={fetchUserProfile}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </SafeAreaForTabs>
    );
  }

  return (
    <SafeAreaForTabs className="bg-[#050628] px-4 pt-4">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row justify-between items-center pt-4 px-4 mb-6">
        <View className="flex-row items-center">
          <BrainIcon size={32} color="#3563E9" filled={true} />
          <Text className="text-white text-xl font-bold ml-2">NeurAi</Text>
        </View>
        <View className="w-10 h-10 rounded-full overflow-hidden bg-[#25294A]">
          <Image
            source={{ uri: profile.profilePicture }}
            className="w-full h-full"
          />
        </View>
      </View>

      {/* Profile Title */}
      <View className="px-4 mb-10">
        <Text className="text-white text-3xl font-bold">Profile</Text>
      </View>

      {/* Profile Content */}
      <View className="px-4 items-center">
        {/* Profile Image */}
        <View className="mb-10">
          <Image
            source={{ uri: profile.profilePicture }}
            className="w-32 h-32 rounded-full"
          />
        </View>

        {/* Form Fields */}
        <View className="w-full mb-4">
          <Text className="text-white text-base mb-2">Full Names</Text>
          <View className="bg-[#17153A] px-4 py-4 rounded-lg mb-6">
            <Text className="text-white">{profile.fullName}</Text>
          </View>

          <Text className="text-white text-base mb-2">Email</Text>
          <View className="bg-[#17153A] px-4 py-4 rounded-lg">
            <Text className="text-white">{profile.email}</Text>
          </View>
        </View>
      </View>

      {/* Update Profile Button */}
      <View className="px-4 flex-1 justify-end pb-10">
        <TouchableOpacity
          className="bg-[#B8A70B] py-4 rounded-lg items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-bold text-lg">Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Update Modal */}
      {profile && (
        <ProfileUpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          currentProfile={profile}
          onProfileUpdated={handleProfileUpdate}
        />
      )}
    </SafeAreaForTabs>
  );
}
