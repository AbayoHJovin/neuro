import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path, G, Line, Text as SvgText, Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LineChartProps {
  data: number[];
  height?: number;
  width?: number;
  lineColor?: string;
  showDots?: boolean;
  showLabels?: boolean;
  showGrid?: boolean;
  labels?: string[];
  style?: any;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 150,
  width = Dimensions.get('window').width - 40,
  lineColor = '#3563E9',
  showDots = true,
  showLabels = true,
  showGrid = true,
  labels = [],
  style,
}) => {
  // Data validation
  const validData = data.filter(value => !isNaN(value));
  if (validData.length === 0) {
    return <View style={[styles.container, { height, width }, style]} />;
  }

  // Chart dimensions
  const padding = { left: 10, right: 10, top: 10, bottom: showLabels ? 30 : 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate min and max for the y-axis
  const minValue = Math.min(...validData);
  const maxValue = Math.max(...validData);
  const range = maxValue - minValue || 1;

  // Generate points for the line
  const points = validData.map((value, index) => {
    const x = padding.left + (index / (validData.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;
    return { x, y };
  });

  // Create path data for the line
  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  // Animation
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1000 });
  }, [data]);

  // Create time labels (0 min, 1 min, etc.)
  const timeLabels = labels.length > 0 ? labels : Array.from({ length: 6 }, (_, i) => `${i} min`);

  return (
    <View style={[styles.container, { height, width }, style]}>
      <Svg width={width} height={height}>
        {/* Grid lines (horizontal) */}
        {showGrid && (
          <G>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const y = padding.top + chartHeight * (1 - ratio);
              return (
                <Line
                  key={index}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#252547"
                  strokeWidth={1}
                />
              );
            })}
          </G>
        )}

        {/* Path */}
        <Path
          d={pathData}
          stroke={lineColor}
          strokeWidth={3}
          fill="none"
        />

        {/* Dots at each data point */}
        {showDots && points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={lineColor}
          />
        ))}

        {/* X-axis labels */}
        {showLabels && timeLabels.map((label, index) => {
          const x = padding.left + (index / (timeLabels.length - 1)) * chartWidth;
          return (
            <SvgText
              key={index}
              x={x}
              y={height - 5}
              fontSize={12}
              fill="#FFFFFF80"
              textAnchor="middle"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
});

export default LineChart;
