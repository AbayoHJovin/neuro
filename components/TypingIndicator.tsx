import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import BrainIcon from "./BrainIcon";

const TypingIndicator = () => {
  // Animation values for the three dots
  const dot1Animation = useRef(new Animated.Value(0)).current;
  const dot2Animation = useRef(new Animated.Value(0)).current;
  const dot3Animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence with staggered timing
    const animateDots = () => {
      Animated.sequence([
        // Reset all dots
        Animated.parallel([
          Animated.timing(dot1Animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        // Animate dot 1
        Animated.timing(dot1Animation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Animate dot 2
        Animated.timing(dot2Animation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Animate dot 3
        Animated.timing(dot3Animation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Hold for a moment
        Animated.delay(300),
      ]).start(() => {
        // Repeat the animation
        animateDots();
      });
    };

    animateDots();

    // Clean up animations when component unmounts
    return () => {
      dot1Animation.stopAnimation();
      dot2Animation.stopAnimation();
      dot3Animation.stopAnimation();
    };
  }, []);

  return (
    <View className="flex-row mx-4 my-2 justify-start">
      <View className="mr-2 self-start bg-[rgba(53,99,233,0.1)] rounded-2xl p-2">
        <BrainIcon size={24} color="#3563E9" filled />
      </View>
      <View className="p-4 rounded-2xl max-w-[40%] bg-[#022266] rounded-bl-sm flex-row items-center">
        <Animated.View
          className="w-2 h-2 rounded-full bg-white mx-1"
          style={{
            opacity: dot1Animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
            transform: [
              {
                translateY: dot1Animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -4],
                }),
              },
            ],
          }}
        />
        <Animated.View
          className="w-2 h-2 rounded-full bg-white mx-1"
          style={{
            opacity: dot2Animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
            transform: [
              {
                translateY: dot2Animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -4],
                }),
              },
            ],
          }}
        />
        <Animated.View
          className="w-2 h-2 rounded-full bg-white mx-1"
          style={{
            opacity: dot3Animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
            transform: [
              {
                translateY: dot3Animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -4],
                }),
              },
            ],
          }}
        />
      </View>
    </View>
  );
};

export default TypingIndicator;
