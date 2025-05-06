import HomeIcon from "@/assets/svg/HomeIcon";
import DefaultAvatar from "@/components/DefaultAvatar";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.usernameText}>User</Text>
          </View>
          <DefaultAvatar />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Brain Activity</Text>
            <Text style={styles.infoCardValue}>78%</Text>
            <Text style={styles.infoCardSubtitle}>
              Last session: 2 hours ago
            </Text>
          </View>

          <View style={styles.recentSessionsContainer}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            <View style={styles.sessionCard}>
              <View style={styles.sessionIconContainer}>
                <HomeIcon color="#3563E9" filled />
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>Meditation Session</Text>
                <Text style={styles.sessionDuration}>Duration: 25 minutes</Text>
              </View>
              <Text style={styles.sessionTime}>Today</Text>
            </View>

            <View style={styles.sessionCard}>
              <View style={styles.sessionIconContainer}>
                <HomeIcon color="#3563E9" filled />
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>Focus Training</Text>
                <Text style={styles.sessionDuration}>Duration: 15 minutes</Text>
              </View>
              <Text style={styles.sessionTime}>Yesterday</Text>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.8,
  },
  usernameText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: "#1D1D41",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  infoCardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  infoCardValue: {
    color: "#3563E9",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoCardSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.6,
  },
  recentSessionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sessionCard: {
    backgroundColor: "#1D1D41",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sessionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(53, 99, 233, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  sessionDuration: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.6,
  },
  sessionTime: {
    color: "#3563E9",
    fontSize: 14,
  },
});
