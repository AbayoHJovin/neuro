import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import BrainIcon from "@/components/BrainIcon";
import TestCard from "@/components/History/TestCard";
import SearchBar from "@/components/SearchBar";
import { getAllTests, TestResult } from "@/utils/mockData";

// Group test results by date
type GroupedTests = {
  [key: string]: TestResult[];
};

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tests, setTests] = useState<TestResult[]>([]);
  const [filteredTests, setFilteredTests] = useState<TestResult[]>([]);
  const [groupedTests, setGroupedTests] = useState<GroupedTests>({});

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getAllTests();
        setTests(data);
        setFilteredTests(data);

        // Group tests by time (for this demo we'll just use simple groups)
        const today: TestResult[] = [];
        const yesterday: TestResult[] = [];

        // In a real app, we would parse actual dates
        // For demo purposes, we'll split them by timestamp
        data.forEach((test) => {
          const hour = parseInt(test.timestamp.split(":")[0]);
          if (hour >= 12) {
            today.push(test);
          } else {
            yesterday.push(test);
          }
        });

        const grouped: GroupedTests = {};
        if (today.length > 0) grouped["Today"] = today;
        if (yesterday.length > 0) grouped["Yesterday"] = yesterday;

        setGroupedTests(grouped);
      } catch (error) {
        console.error("Error fetching test history:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTests(tests);

      // Regroup tests when search is cleared
      const today: TestResult[] = [];
      const yesterday: TestResult[] = [];

      tests.forEach((test) => {
        const hour = parseInt(test.timestamp.split(":")[0]);
        if (hour >= 12) {
          today.push(test);
        } else {
          yesterday.push(test);
        }
      });

      const grouped: GroupedTests = {};
      if (today.length > 0) grouped["Today"] = today;
      if (yesterday.length > 0) grouped["Yesterday"] = yesterday;

      setGroupedTests(grouped);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tests.filter(
        (test) =>
          test.label.toLowerCase().includes(query) ||
          test.description.toLowerCase().includes(query)
      );
      setFilteredTests(filtered);

      // When searching, put all results in one group
      setGroupedTests({ Results: filtered });
    }
  }, [searchQuery, tests]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <BrainIcon size={32} color="#3563E9" filled={true} />
            <Text style={styles.headerTitle}>NeurAi</Text>
          </View>
          <View style={styles.profileIconContainer}>
            <Image
              source={require("../../assets/images/userAvatar.png")}
              style={styles.profileIcon}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Session History</Text>

        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search Session"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={clearSearch}
          />
        </View>

        {filteredTests.length > 0 ? (
          <>
            {Object.keys(groupedTests).map((dateGroup) => (
              <View key={dateGroup}>
                <View style={styles.dateHeaderContainer}>
                  <Text style={styles.dateHeader}>{dateGroup}</Text>
                </View>

                {groupedTests[dateGroup].map((test) => (
                  <TestCard
                    key={test.id}
                    id={test.id}
                    label={test.label}
                    description={test.description}
                    timestamp={test.timestamp}
                  />
                ))}
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={60} color="#3563E9" />
            </View>
            <Text style={styles.emptyTitle}>No Sessions Found</Text>
            <Text style={styles.emptySubtitle}>
              Your session history will appear here after you complete your
              first brain analysis
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050628",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#25294A",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  dateHeaderContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  dateHeader: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(53, 99, 233, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    maxWidth: "80%",
  },
});
