import NeuroLabLogo from "@/assets/svg/Logo";
import ScreenContainer from "@/components/common/ScreenContainer";
import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  // Animation values
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Add a small delay to ensure the component is properly mounted
    const animationTimeout = setTimeout(() => {
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
    }, 100);

    // Only set the completion timer if we have a callback to execute
    let completionTimer: ReturnType<typeof setTimeout> | null = null;
    if (onAnimationComplete) {
      completionTimer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);
    }

    return () => {
      clearTimeout(animationTimeout);
      if (completionTimer) clearTimeout(completionTimer);
    };
  }, [onAnimationComplete, opacity, scale]);

  return (
    <ScreenContainer
      contentStyle={styles.contentContainer}
      disableSafeArea={true}
    >
      <Animated.View
        style={[styles.logoContainer, { opacity, transform: [{ scale }] }]}
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
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1.2 }],
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#B8A625",
    fontSize: 20,
    textAlign: "center",
    opacity: 0.9,
  },
});

export default SplashScreen;
 