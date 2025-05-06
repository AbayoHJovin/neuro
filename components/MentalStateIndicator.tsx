import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

interface MentalStateIndicatorProps {
  state: string;
  percentage: number;
  message?: string;
}

const MentalStateIndicator: React.FC<MentalStateIndicatorProps> = ({
  state,
  percentage,
  message,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage / 100, { duration: 1500 });
  }, [percentage]);

  const progressStyle = useAnimatedStyle(() => {
    const width = `${progress.value * 100}%`;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.3, 0.6, 1],
      ['#FF6B6B', '#FFAB76', '#B8A625', '#1AD598']
    );

    return {
      width,
      backgroundColor,
    };
  });

  // Determine the color based on the percentage
  const getStateColor = () => {
    if (percentage >= 80) return '#1AD598';
    if (percentage >= 60) return '#B8A625';
    if (percentage >= 40) return '#FFAB76';
    return '#FF6B6B';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mental State</Text>
        <Text style={[styles.percentage, { color: getStateColor() }]}>
          {percentage}%
        </Text>
      </View>

      <View style={styles.stateContainer}>
        <Text style={[styles.state, { color: getStateColor() }]}>{state}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D41',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stateContainer: {
    marginBottom: 16,
  },
  state: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#252547',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default MentalStateIndicator; 