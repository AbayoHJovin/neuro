import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatItemProps {
  title: string;
  value: string | number;
  containerStyle?: any;
}

const StatItem: React.FC<StatItemProps> = ({ title, value, containerStyle }) => (
  <View style={[styles.statItem, containerStyle]}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

interface StatsSummaryProps {
  stats: Array<{
    title: string;
    value: string | number;
  }>;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <StatItem 
          key={index}
          title={stat.title}
          value={stat.value}
          containerStyle={index < stats.length - 1 ? { 
            borderRightWidth: 1, 
            borderRightColor: 'rgba(255, 255, 255, 0.1)' 
          } : undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.6,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3563E9',
  },
});

export default StatsSummary; 