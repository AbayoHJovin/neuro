import React from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  RefreshControl,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import DefaultAvatar from "@/components/DefaultAvatar";
import LineChart from "@/components/charts/LineChart";
import BrainIcon from "@/components/BrainIcon";
import StatsSummary from "@/components/StatsSummary";
import MentalStateIndicator from "@/components/MentalStateIndicator";
import RecommendationCard from "@/components/RecommendationCard";
import useBrainData from "@/hooks/useBrainData";

export default function HomeScreen() {
  const { 
    loading, 
    refreshing, 
    homeData, 
    liveData, 
    error, 
    onRefresh 
  } = useBrainData();

  // Extract data for the chart
  const chartData = liveData.map(item => item.value);
  const chartLabels = Array.from({ length: 6 }, (_, i) => `${i} min`);

  // Show error if any
  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3563E9" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#3563E9"
            colors={["#3563E9"]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <BrainIcon size={32} color="#3563E9" filled={true}/>
            <Text style={styles.logoText}>NeurAi</Text>
          </View>
          <DefaultAvatar />
          {/* <Image source={require("@/assets/images/userAvatar.png")} width={20} height={20}/> */}
        </View>

        {/* Welcome */}
        <Text style={styles.welcomeText}>Welcome Back</Text>

        {/* Stats Summary */}
        <StatsSummary 
          stats={[
            { title: 'Total Analyses', value: homeData?.analyses.total || 0 },
            { title: 'Total Reports', value: homeData?.reports.total || 0 },
          ]}
        />

        {/* Live Data Chart */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Live Data</Text>
          <View style={styles.chartContainer}>
            <LineChart 
              data={chartData}
              height={200}
              showDots={true}
              showGrid={true}
              labels={chartLabels}
              lineColor="#3563E9"
            />
          </View>
        </View>

        {/* Mental State */}
        <MentalStateIndicator 
          state={homeData?.mentalState.state || "Neutral"}
          percentage={homeData?.mentalState.percentage || 0}
          message={homeData?.mentalState.message}
        />

        {/* AI Recommendations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Ai Recommendations</Text>
          
          {homeData?.recommendations.map((recommendation) => (
            <RecommendationCard 
              key={recommendation.id}
              recommendation={recommendation}
              onPress={() => console.log(`View recommendation: ${recommendation.title}`)}
            />
          ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: "#1D1D41",
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
});
