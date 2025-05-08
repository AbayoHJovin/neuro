import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import BrainIcon from "@/components/BrainIcon";
import DateSelector from "@/components/DateSelector";
import TestCard from "@/components/History/TestCard";
import SearchBar from "@/components/SearchBar";
import SafeAreaForTabs from "@/components/ui/SafeAreaForTabs";
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
    <SafeAreaForTabs className="bg-[#050628] px-4 pt-4">
      <StatusBar style="light" />
      <View className="flex-row justify-between items-center pt-4 px-4 mb-6">
        <View className="flex-row items-center">
          <BrainIcon size={32} color="#3563E9" filled={true} />
          <Text className="text-white text-xl font-bold ml-2">NeurAi</Text>
        </View>
        <View className="w-10 h-10 rounded-full overflow-hidden bg-[#25294A]">
          <Image
            source={require("../../assets/images/userAvatar.png")}
            className="w-full h-full rounded-full"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">Session History</Text>
          <DateSelector
            onDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </View>

        <View className="mb-6">
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
                <View className="mb-4 mt-2">
                  <Text className="text-white text-base font-semibold">
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
          <View className="flex-1 justify-center items-center py-20">
            <View className="w-30 h-30 rounded-full bg-[rgba(53,99,233,0.1)] justify-center items-center mb-8">
              <Ionicons name="calendar-outline" size={60} color="#3563E9" />
            </View>
            <Text className="text-white text-2xl font-bold mb-2">
              No Sessions Found
            </Text>
            <Text className="text-white text-base opacity-70 text-center max-w-[80%]">
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
                className="bg-[#3563E9] px-6 py-3 rounded-lg mt-5"
                onPress={resetFilters}
              >
                <Text className="text-white text-base font-semibold">
                  Reset Filters
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaForTabs>
  );
}
