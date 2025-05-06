import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import NeuroLabLogo from '@/assets/svg/Logo';
import ScreenContainer from '@/components/common/ScreenContainer';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  // Animation values
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Set timer to trigger completion callback
    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete, opacity, scale]);

  return (
    <ScreenContainer
      contentStyle={styles.contentContainer}
    >
      <Animated.View 
        style={[
          styles.logoContainer, 
          { opacity, transform: [{ scale }] }
        ]}
      >
        <NeuroLabLogo />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity }]}>
        NeuroLab
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity }]}>
        Healthy Minds, Strong society
      </Animated.Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.2 }],
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#B8A625',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default SplashScreen;
