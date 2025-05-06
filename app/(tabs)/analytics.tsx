import BrainIcon from "@/components/BrainIcon";
import { getTestById } from "@/utils/mockData";
import axios from "axios";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Path,
  Polyline,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

// Define types for our data structure
type TimeSeriesDataPoint = {
  time: string;
  value: number;
};

type AnalyticsData = {
  attentionScore: number;
  cognitiveLoad: number;
  mentalFatigue: number;
  relaxationLevel: number;
  confidence: number;
  stateDistribution: {
    focused: number;
    relaxed: number;
    neutral: number;
    distracted: number;
  };
  recommendations: string[];
  timeSeriesData: TimeSeriesDataPoint[];
};

// Mock data in case API is unreachable
const MOCK_DATA: AnalyticsData = {
  attentionScore: 72,
  cognitiveLoad: 65,
  mentalFatigue: 28,
  relaxationLevel: 42,
  confidence: 85,
  stateDistribution: {
    focused: 45,
    relaxed: 25,
    neutral: 20,
    distracted: 10,
  },
  recommendations: [
    "Consider short breaks every 25 minutes to maintain optimal focus levels.",
    "The subject shows good attention patterns but may benefit from mindfulness exercises to reduce cognitive load.",
    "Hydration and proper posture could improve sustained attention duration.",
  ],
  timeSeriesData: [
    { time: "0 min", value: 30 },
    { time: "1 min", value: 45 },
    { time: "2 min", value: 65 },
    { time: "3 min", value: 55 },
    { time: "4 min", value: 70 },
    { time: "5 min", value: 85 },
  ],
};

const GaugeChart = ({ value, title }: { value: number; title: string }) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value / 100, { duration: 1000 });
  }, [value, animatedValue]);

  const needleStyle = useAnimatedStyle(() => {
    // For a semicircle gauge, the rotation is from -90 to 90 degrees (180 degree range)
    const rotation = -90 + 180 * animatedValue.value;
    return {
      transform: [
        { translateX: -6 },
        { rotate: `${rotation}deg` },
        { translateY: -5 },
      ],
    };
  });

  return (
    <View style={styles.gaugeContainer}>
      <Text style={styles.gaugeTitle}>{title}</Text>

      <View style={styles.gaugeOuter}>
        <Svg width="100%" height="100%" viewBox="0 0 200 100">
          {/* Semicircle background */}
          <Path
            d="M20,100 A80,80 0 0,1 180,100"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          {/* Colored gradient */}
          <SvgLinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#F87171" />
            <Stop offset="0.5" stopColor="#FACC15" />
            <Stop offset="1" stopColor="#4ADE80" />
          </SvgLinearGradient>

          <Path
            d="M20,100 A80,80 0 0,1 180,100"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center point for needle */}
          <Circle cx="100" cy="100" r="6.8" fill="#FFFFFF" />
        </Svg>

        {/* Needle */}
        <Animated.View style={[styles.needle, needleStyle]}>
          <View style={styles.needleTriangle} />
        </Animated.View>
      </View>

      <Text style={styles.gaugeValue}>{value}%</Text>
    </View>
  );
};

const TimeSeriesChart = ({ data }: { data: TimeSeriesDataPoint[] }) => {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartContent}>
        <Svg width="100%" height="100%" viewBox="0 0 500 200">
          {/* Background grid lines */}
          <Path
            d="M0,50 H500 M0,100 H500 M0,150 H500"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />

          {/* Line chart */}
          <Polyline
            points={data
              .map((point, index) => {
                const x = (index / (data.length - 1)) * 500;
                // Normalize the value to be between 0-200 for y-coordinate (inverted because SVG y-axis is top to bottom)
                const maxValue = Math.max(...data.map((item) => item.value));
                const minValue = Math.min(...data.map((item) => item.value));
                const range = maxValue - minValue;
                // Add a 20% padding to the top and bottom
                const normalizedValue =
                  200 - (((point.value - minValue) / range) * 160 + 20);

                return `${x},${normalizedValue}`;
              })
              .join(" ")}
            fill="none"
            stroke="#3563E9"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 500;
            const maxValue = Math.max(...data.map((item) => item.value));
            const minValue = Math.min(...data.map((item) => item.value));
            const range = maxValue - minValue;
            const normalizedValue =
              200 - (((point.value - minValue) / range) * 160 + 20);

            return (
              <Circle
                key={index}
                cx={x}
                cy={normalizedValue}
                r="4"
                fill="#3563E9"
              />
            );
          })}
        </Svg>
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {data.map((item, index) => (
          <Text key={index} style={styles.barLabel}>
            {item.time}
          </Text>
        ))}
      </View>
    </View>
  );
};

const RecommendationItem = ({
  text,
  index,
}: {
  text: string;
  index: number;
}) => (
  <View style={styles.recommendationItem}>
    <View style={styles.recommendationIcon}>
      <Text style={styles.recommendationIconText}>{index + 1}</Text>
    </View>
    <Text style={styles.recommendationText}>{text}</Text>
  </View>
);

export default function AnalyticsScreen() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useLocalSearchParams<{ testId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // If we have a testId, fetch specific test data
        if (testId) {
          console.log("Loading test with ID:", testId);
          // Get the test result from mock data
          const testResult = getTestById(testId);

          if (testResult) {
            // Transform the test result to match AnalyticsData format
            const analyticsData: AnalyticsData = {
              attentionScore: testResult.attentionScore,
              cognitiveLoad: 100 - testResult.relaxationLevel, // Inverse of relaxation
              mentalFatigue: testResult.mentalFatigue,
              relaxationLevel: testResult.relaxationLevel,
              confidence: 85, // Default confidence level
              stateDistribution: {
                focused: 45,
                relaxed: 25,
                neutral: 20,
                distracted: 10,
              },
              recommendations: testResult.recommendations || [],
              timeSeriesData: testResult.waveData
                ? testResult.waveData.map((value, index) => ({
                    time: `${index} min`,
                    value,
                  }))
                : MOCK_DATA.timeSeriesData,
            };
            setData(analyticsData);
          } else {
            console.log("Test not found, using mock data");
            setData(MOCK_DATA);
          }
        } else {
          // Normal flow - fetch from API or use mock data for a new test
          try {
            const response = await axios.get(
              "http://localhost:5000/api/analytics"
            );
            setData(response.data);
          } catch (error) {
            console.log("Error fetching data, using mock data instead:", error);
            setData(MOCK_DATA);
          }
        }
      } catch (error) {
        console.log("General error, using mock data:", error);
        setData(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3563E9" />
          <Text style={styles.loadingText}>Loading analytics data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          {/* <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.brainIcon}
              contentFit="contain"
            />
            <Text style={styles.headerTitle}>NeurAi</Text>
          </View> */}
          <View style={styles.header}>
            <BrainIcon size={32} color="#3563E9" filled={true} />
            <Text style={styles.headerTitle}>NeurAi</Text>
          </View>
          <View style={styles.profileIconContainer}>
            <Image
              source={require("../../assets/images/userAvatar.png")}
              style={styles.profileIcon}
              contentFit="cover"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Live Data</Text>

        {data && <TimeSeriesChart data={data.timeSeriesData} />}

        <View style={styles.metricsGrid}>
          {data && (
            <GaugeChart value={data.attentionScore} title="Attention Score" />
          )}
          {data && (
            <GaugeChart value={data.cognitiveLoad} title="Cognitive Load" />
          )}
          {data && (
            <GaugeChart value={data.mentalFatigue} title="Mental Fatigue" />
          )}
          {data && (
            <GaugeChart value={data.relaxationLevel} title="Relaxation Level" />
          )}
        </View>

        <Text style={styles.sectionTitle}>Ai analysis</Text>

        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Mental State</Text>

          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>Confidence</Text>
            <Text style={styles.confidenceValue}>{data?.confidence ?? 0}%</Text>
          </View>

          <Text style={styles.analysisText}>You seem to be focused</Text>

          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#FACC15", "#FACC15"]}
              style={[
                styles.progressBarFill,
                { width: `${data?.confidence ?? 0}%` },
              ]}
            />
          </View>

          <View style={styles.analysisColumns}>
            <View style={styles.analysisColumn}>
              <Text style={styles.analysisColumnTitle}>State Distribution</Text>
              <Text style={styles.statItem}>
                Focused: {data?.stateDistribution.focused ?? 0}%
              </Text>
              <Text style={styles.statItem}>
                Relaxed: {data?.stateDistribution.relaxed ?? 0}%
              </Text>
              <Text style={styles.statItem}>
                Neutral: {data?.stateDistribution.neutral ?? 0}%
              </Text>
              <Text style={styles.statItem}>
                Distracted: {data?.stateDistribution.distracted ?? 0}%
              </Text>
            </View>
            <View style={styles.analysisColumn}>
              <Text style={styles.analysisColumnTitle}>Cognitive Metrics</Text>
              <Text style={styles.statItem}>
                Attention Score: {data?.attentionScore ?? 0}% (Range: 0 - 100)
              </Text>
              <Text style={styles.statItem}>
                Cognitive Load: {data?.cognitiveLoad ?? 0}% (Range: 0 - 100)
              </Text>
              <Text style={styles.statItem}>
                Mental Fatigue: {data?.mentalFatigue ?? 0}% (Range: 0 - 100)
              </Text>
              <Text style={styles.statItem}>
                Relaxation Level: {data?.relaxationLevel ?? 0}% (Range: 0 - 100)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>
            Clinical Recommendations
          </Text>
          {data?.recommendations.map((recommendation, index) => (
            <RecommendationItem
              key={index}
              text={recommendation}
              index={index}
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  brainIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  profileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  chartContainer: {
    height: 200,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  chartContent: {
    flex: 1,
    position: "relative",
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  barLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
    flex: 1,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gaugeContainer: {
    width: "48%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: "#3563E9",
    borderWidth: 1,
    // backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
  },
  gaugeOuter: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginVertical: 8,
  },
  needle: {
    position: "absolute",
    bottom: 6,
    left: "50%",
    height: "50%",
    width: 12,
    alignItems: "center",
    justifyContent: "flex-end",
    transformOrigin: "center bottom",
    zIndex: 10,
  },
  needleTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 0,
    borderBottomWidth: 53,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
  },
  gaugeValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  gaugeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  analysisContainer: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  analysisTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  confidenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  confidenceLabel: {
    color: "#FACC15",
    fontSize: 14,
    fontWeight: "bold",
  },
  confidenceValue: {
    color: "#FACC15",
    fontSize: 14,
    fontWeight: "bold",
  },
  analysisText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  analysisColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  analysisColumn: {
    width: "48%",
  },
  analysisColumnTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statItem: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 6,
  },
  recommendationsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  recommendationsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recommendationIconText: {
    color: "#050628",
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
