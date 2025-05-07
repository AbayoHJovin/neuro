import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BrainIcon from "@/components/BrainIcon";
import DateSelector from "@/components/DateSelector";
import TestCard from "@/components/History/TestCard";
import SearchBar from "@/components/SearchBar";
import { getAllTests, TestResult } from "@/utils/mockData";

// Helper to check if dates are on the same day
function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// Helper to format timestamps to date objects - expects formats like "5:20 PM"
function parseTimeToDate(timeString: string, referenceDate?: Date): Date {
  const date = referenceDate ? new Date(referenceDate) : new Date();

  // Parse hours and minutes from the time string
  const isPM = timeString.includes("PM");
  const timeParts = timeString.replace(/ (AM|PM)/, "").split(":");
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  // Convert to 24-hour format if needed
  if (isPM && hours < 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Group test results by date
type GroupedTests = {
  [key: string]: TestResult[];
};

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tests, setTests] = useState<TestResult[]>([]);
  const [filteredTests, setFilteredTests] = useState<TestResult[]>([]);
  const [groupedTests, setGroupedTests] = useState<GroupedTests>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const data = getAllTests();

        // Enrich data with actual Date objects
        const enrichedData = data.map((test) => ({
          ...test,
          dateObject: parseTimeToDate(test.timestamp),
        }));

        setTests(enrichedData);
        applyFilters(enrichedData, searchQuery, selectedDate);
      } catch (error) {
        console.error("Error fetching test history:", error);
      }
    };

    fetchData();
  }, []);

  // Filter and group tests based on search query and selected date
  const applyFilters = (
    testData: (TestResult & { dateObject?: Date })[],
    query: string,
    date: Date
  ) => {
    // First filter by search query if present
    let filtered = testData;
    if (query.trim() !== "") {
      const lowercaseQuery = query.toLowerCase();
      filtered = testData.filter(
        (test) =>
          test.label.toLowerCase().includes(lowercaseQuery) ||
          test.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Then filter by selected date
    filtered = filtered.filter(
      (test) => test.dateObject && isSameDay(test.dateObject, date)
    );

    setFilteredTests(filtered);

    // Group by date (in a real app with multiple dates)
    const grouped: GroupedTests = {};
    const dateStr = date.toLocaleDateString();
    grouped[dateStr] = filtered;
    setGroupedTests(grouped);
  };

  useEffect(() => {
    applyFilters(tests, searchQuery, selectedDate);
  }, [searchQuery, selectedDate, tests]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSelectedDate(new Date());
    setSearchQuery("");
    setIsFiltered(false);
    setFilteredTests(tests);

    // Regroup all tests
    const grouped: GroupedTests = {};
    tests.forEach((test) => {
      const dateStr =
        test.dateObject?.toLocaleDateString() ||
        new Date().toLocaleDateString();
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(test);
    });
    setGroupedTests(grouped);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsFiltered(true);
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

        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Session History</Text>
          <DateSelector
            onDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </View>

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
                  <Text style={styles.dateHeader}>
                    {new Date(dateGroup).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
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
              {isFiltered
                ? `No brain analysis sessions found for ${selectedDate.toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}`
                : "No brain analysis sessions available"}
            </Text>
            {isFiltered && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            )}
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
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
  resetButton: {
    backgroundColor: "#3563E9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
