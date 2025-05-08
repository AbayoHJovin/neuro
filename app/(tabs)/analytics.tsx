import BrainIcon from "@/components/BrainIcon";
import { getTestById } from "@/utils/mockData";
import axios from "axios";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Line,
  Path,
  Polyline,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
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
    <View className="w-[48%] aspect-square items-center justify-center mb-5 border border-[#3563E9] rounded-2xl p-4">
      <Text className="text-white text-base font-bold mb-4 text-center">
        {title}
      </Text>

      <View className="w-full h-[100px] justify-center items-center relative my-2">
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
        <Animated.View
          style={[
            {
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
            needleStyle,
          ]}
        >
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 4,
              borderRightWidth: 4,
              borderTopWidth: 0,
              borderBottomWidth: 53,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#FFFFFF",
            }}
          />
        </Animated.View>
      </View>

      <Text className="text-white text-xl font-bold mt-3">{value}%</Text>
    </View>
  );
};

const TimeSeriesChart = ({ data }: { data: TimeSeriesDataPoint[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get("window").width;

  // Calculate total width based on number of data points
  const pointSpacing = 60; // Spacing between data points
  const chartPadding = 20; // Padding on each side
  const totalWidth = Math.max(
    screenWidth - 40,
    (data.length - 1) * pointSpacing + chartPadding * 2
  );

  // SVG viewBox width will be max(screenWidth, data points * spacing)
  const svgWidth = totalWidth;

  return (
    <View className="h-[260px] mx-5 bg-white/5 rounded-xl p-4 mb-5">
      <View className="mb-2">
        <Text className="text-white text-sm font-bold mb-1">
          Wave Intensity
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: totalWidth }}
        className="flex-1 w-full"
        bounces={false}
        scrollEventThrottle={16}
      >
        <View className="flex-1 h-[180px]" style={{ width: totalWidth }}>
          <Svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} 200`}>
            {/* Background grid lines */}
            <Path
              d={`M${chartPadding},50 H${
                svgWidth - chartPadding
              } M${chartPadding},100 H${
                svgWidth - chartPadding
              } M${chartPadding},150 H${svgWidth - chartPadding}`}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />

            {/* Vertical grid lines for each data point */}
            {data.map((_, index) => {
              const x = chartPadding + index * pointSpacing;
              return (
                <Line
                  key={`grid-${index}`}
                  x1={x}
                  y1="20"
                  x2={x}
                  y2="160"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Line chart */}
            <Polyline
              points={data
                .map((point, index) => {
                  const x = chartPadding + index * pointSpacing;
                  // Normalize the value to be between 0-200 for y-coordinate (inverted because SVG y-axis is top to bottom)
                  const maxValue = Math.max(...data.map((item) => item.value));
                  const minValue = Math.min(...data.map((item) => item.value));
                  const range = maxValue - minValue || 1; // Avoid division by zero
                  // Add a 20% padding to the top and bottom
                  const normalizedValue =
                    160 - ((point.value - minValue) / range) * 120 + 20;

                  return `${x},${normalizedValue}`;
                })
                .join(" ")}
              fill="none"
              stroke="#3563E9"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Data points with values */}
            {data.map((point, index) => {
              const x = chartPadding + index * pointSpacing;
              const maxValue = Math.max(...data.map((item) => item.value));
              const minValue = Math.min(...data.map((item) => item.value));
              const range = maxValue - minValue || 1; // Avoid division by zero
              const normalizedValue =
                160 - ((point.value - minValue) / range) * 120 + 20;

              return (
                <React.Fragment key={index}>
                  {/* Data point circle */}
                  <Circle cx={x} cy={normalizedValue} r="4" fill="#3563E9" />

                  {/* Data value label */}
                  <SvgText
                    x={x}
                    y={normalizedValue - 12}
                    fontSize="10"
                    fill="#FFFFFF"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {point.value}
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* Y-axis labels */}
            <SvgText
              x="10"
              y="50"
              fontSize="10"
              fill="rgba(255,255,255,0.7)"
              textAnchor="start"
            >
              High
            </SvgText>
            <SvgText
              x="10"
              y="100"
              fontSize="10"
              fill="rgba(255,255,255,0.7)"
              textAnchor="start"
            >
              Med
            </SvgText>
            <SvgText
              x="10"
              y="150"
              fontSize="10"
              fill="rgba(255,255,255,0.7)"
              textAnchor="start"
            >
              Low
            </SvgText>
          </Svg>
        </View>
      </ScrollView>

      {/* X-axis labels */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: totalWidth }}
        className="h-5 w-full"
        scrollEnabled={false} // Disabled to sync with main chart
        ref={(ref) => {
          // Sync this ScrollView with the main one
          if (ref && scrollViewRef.current) {
            // @ts-ignore - scrollView has these properties
            ref.scrollTo = scrollViewRef.current.scrollTo;
          }
        }}
      >
        <View className="h-5 relative" style={{ width: totalWidth }}>
          {data.map((item, index) => (
            <View
              key={index}
              className="items-center absolute"
              style={{
                left: chartPadding + index * pointSpacing,
                width: pointSpacing,
                transform: [{ translateX: -pointSpacing / 2 }],
              }}
            >
              <Text className="text-white text-xs opacity-70 text-center">
                {item.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Scroll indicator dots */}
      <View className="flex-row justify-center mt-2">
        <View className="w-1 h-1 rounded-full bg-white/50 mx-0.5" />
        <View className="w-1 h-1 rounded-full bg-white/50 mx-0.5" />
        <View className="w-1 h-1 rounded-full bg-white/50 mx-0.5" />
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
  <View className="flex-row items-start mb-3">
    <View className="w-6 h-6 rounded-full bg-[#4ADE80] justify-center items-center mr-3">
      <Text className="text-[#050628] text-xs font-bold">{index + 1}</Text>
    </View>
    <Text className="text-white text-sm flex-1 leading-5">{text}</Text>
  </View>
);

export default function AnalyticsScreen() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHistoricalData, setIsHistoricalData] = useState(false);
  const { testId } = useLocalSearchParams<{ testId: string }>();

  const fetchData = async (testIdParam?: string) => {
    try {
      setLoading(true);

      // If we have a testId parameter, fetch specific test data
      if (testIdParam) {
        console.log("Loading test with ID:", testIdParam);
        // Get the test result from mock data
        const testResult = getTestById(testIdParam);

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
          setIsHistoricalData(true);
        } else {
          console.log("Test not found, using mock data");
          setData(MOCK_DATA);
          setIsHistoricalData(false);
        }
      } else {
        // New analysis flow - fetch from API or use mock data for a new test
        try {
          const response = await axios.get("http:10.0.2.2:5000/api/analytics");
          setData(response.data);
          setIsHistoricalData(false);
        } catch (error) {
          console.log("Error fetching data, using mock data instead:", error);
          setData(MOCK_DATA);
          setIsHistoricalData(false);
        }
      }
    } catch (error) {
      console.log("General error, using mock data:", error);
      setData(MOCK_DATA);
      setIsHistoricalData(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch when component mounts
  useEffect(() => {
    fetchData(testId);
  }, [testId]);

  const handleTakeNewAnalysis = () => {
    // Clear any test ID from the route
    if (testId) {
      router.setParams({});
    }

    // Fetch new data (without testId)
    fetchData();
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#050628]">
        <StatusBar style="light" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3563E9" />
          <Text className="text-white mt-2.5 text-base">
            Loading analytics data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#050628]">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="flex-row justify-between items-center px-5 pt-2.5 pb-5">
          <View className="flex-row items-center">
            <BrainIcon size={32} color="#3563E9" filled={true} />
            <Text className="text-white text-lg font-bold ml-2">NeurAi</Text>
          </View>
          <View className="w-9 h-9 rounded-full overflow-hidden">
            <Image
              source={require("../../assets/images/userAvatar.png")}
              className="w-full h-full"
              contentFit="cover"
            />
          </View>
        </View>

        {/* Section header with title and possibly a button */}
        <View className="flex-row justify-between items-center px-5 mt-4 mb-2">
          <Text className="text-white text-lg font-bold">
            {isHistoricalData ? "Historical Data" : "Your Live Data"}
          </Text>

          <TouchableOpacity
            className="bg-[#3563E9] px-3.5 py-2 rounded-lg shadow-sm"
            onPress={handleTakeNewAnalysis}
          >
            <Text className="text-white text-sm font-semibold">
              Take New Analysis
            </Text>
          </TouchableOpacity>
        </View>

        {data && <TimeSeriesChart data={data.timeSeriesData} />}

        <View className="flex-row flex-wrap justify-between px-5 mb-5">
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

        <Text className="text-white text-lg font-bold my-4 px-5">
          AI Analysis
        </Text>

        <View className="mx-5 bg-white/5 rounded-xl p-5 mb-5">
          <Text className="text-white text-base font-bold mb-4">
            Mental State
          </Text>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[#FACC15] text-sm font-bold">Confidence</Text>
            <Text className="text-[#FACC15] text-sm font-bold">
              {data?.confidence ?? 0}%
            </Text>
          </View>

          <Text className="text-white text-sm mb-3">
            {isHistoricalData
              ? "This is an analysis from a previous session"
              : "You seem to be focused"}
          </Text>

          <View className="h-1.5 bg-white/10 rounded-sm mb-6 overflow-hidden">
            <LinearGradient
              colors={["#FACC15", "#FACC15"]}
              className="h-full rounded"
              style={{
                width: `${data?.confidence ?? 0}%`,
              }}
            />
          </View>

          <View className="flex-row justify-between">
            <View className="w-[48%]">
              <Text className="text-white text-sm font-bold mb-3">
                State Distribution
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Focused: {data?.stateDistribution.focused ?? 0}%
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Relaxed: {data?.stateDistribution.relaxed ?? 0}%
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Neutral: {data?.stateDistribution.neutral ?? 0}%
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Distracted: {data?.stateDistribution.distracted ?? 0}%
              </Text>
            </View>
            <View className="w-[48%]">
              <Text className="text-white text-sm font-bold mb-3">
                Cognitive Metrics
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Attention Score: {data?.attentionScore ?? 0}% (Range: 0 - 100)
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Cognitive Load: {data?.cognitiveLoad ?? 0}% (Range: 0 - 100)
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Mental Fatigue: {data?.mentalFatigue ?? 0}% (Range: 0 - 100)
              </Text>
              <Text className="text-white text-xs opacity-80 mb-1.5">
                Relaxation Level: {data?.relaxationLevel ?? 0}% (Range: 0 - 100)
              </Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mb-5">
          <Text className="text-white text-base font-bold mb-4">
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
