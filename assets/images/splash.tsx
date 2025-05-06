import NeuroLabLogo from "@/assets/svg/Logo";
import React from "react";
import Svg, { G, Rect, Text } from "react-native-svg";

const SplashImage = () => {
  return (
    <Svg width="1024" height="1024" viewBox="0 0 1024 1024">
      <Rect width="1024" height="1024" fill="#050628" />
      <G transform="translate(512, 400)">
        <NeuroLabLogo />
      </G>
      <Text
        x="512"
        y="550"
        fontSize="80"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        NeuroLab
      </Text>
      <Text x="512" y="630" fontSize="40" fill="#B8A625" textAnchor="middle">
        Healthy Minds, Strong society
      </Text>
    </Svg>
  );
};

export default SplashImage;
