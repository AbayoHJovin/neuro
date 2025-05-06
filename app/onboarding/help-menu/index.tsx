import Bulb from "@/assets/svg/Bulb";
import Rectangle from "@/assets/svg/Rectangle";
import Touch from "@/assets/svg/Touch";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HelpMenu() {
  const router = useRouter();

  const handleContinue = async () => {
    try {
      // This is where we officially mark onboarding as completed
      // after the user has gone through signup → login → help menu
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error setting onboarding completion status:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View className="flex-row items-center justify-center">
          <Rectangle />
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>To get started follow the</Text>
            <Text style={styles.headerTitleHighlight}>
              <Text className="text-white">following</Text> Instructions
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          {/* Instruction 1 */}
          <View style={styles.instructionItem}>
            <View style={styles.iconContainer}>
              <Bulb />
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Wrap your muse headband very well on your head as shown above.
              </Text>
            </View>
          </View>

          {/* Instruction 2 */}
          <View style={styles.instructionItem}>
            <View style={styles.iconContainer}>
              <Touch />
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Turn on your device by pressing the power button.
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.continueButtonContainer}>
          <View style={styles.continueButton}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={handleContinue}
            >
              <MaterialIcons name="arrow-forward" size={28} color="#B8A625" />
            </TouchableOpacity>
            <Text style={styles.continueText}>
              Continue with further steps.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050628",
  },
  statusBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBarTime: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signalIcon: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 10,
    gap: 1,
  },
  signalBar: {
    width: 2,
    backgroundColor: "white",
    borderRadius: 1,
  },
  batteryIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryBody: {
    width: 22,
    height: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 2,
  },
  batteryTip: {
    width: 2,
    height: 6,
    backgroundColor: "white",
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  leftBar: {
    position: "absolute",
    left: 50,
    top: 80,
    width: 6,
    height: 80,
    backgroundColor: "#B8A625",
    borderRadius: 3,
  },
  headerContainer: {
    marginTop: 80,
    marginBottom: 40,
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFF",
    marginBottom: 5,
  },
  headerTitleHighlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#B8A625",
  },
  instructionsContainer: {
    marginBottom: 40,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 60,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionText: {
    color: "white",
    fontSize: 20,
    lineHeight: 28,
  },
  continueButtonContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#B8A625",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  continueText: {
    color: "#B8A625",
    fontSize: 20,
    fontWeight: "500",
  },
});
