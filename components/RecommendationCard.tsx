import { Recommendation } from "@/services/api";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onPress?: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: recommendation.color }]}>
          {recommendation.title}
        </Text>
        <Text style={styles.description}>{recommendation.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D1D41",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    padding: 16,
  },
  contentContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    lineHeight: 20,
  },
  readMoreButton: {
    alignSelf: "flex-end",
  },
  readMoreText: {
    color: "#B8A625",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default RecommendationCard;
