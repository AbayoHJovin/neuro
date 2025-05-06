import * as React from "react";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface DefaultAvatarProps {
  size?: number;
  style?: any;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ size = 50, style }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: "hidden",
      backgroundColor: "#1D1D41",
      ...style,
    }}
  >
    <Svg width="100%" height="100%" viewBox="0 0 50 50" fill="none">
      <Circle cx={25} cy={25} r={25} fill="#1D1D41" />
      <Circle cx={25} cy={18} r={8} fill="#6D7FFF" />
      <Path
        d="M10 42C10 34.268 16.268 28 24 28H26C33.732 28 40 34.268 40 42V45H10V42Z"
        fill="#6D7FFF"
      />
    </Svg>
  </View>
);

export default DefaultAvatar;
