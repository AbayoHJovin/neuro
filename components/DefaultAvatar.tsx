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
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: "#1D1D41",
      ...style,
    }}
  >
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <Path
        fill="#3052bd"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
        strokeWidth={1.7}
        stroke="#3052bd"
      ></Path>
    </Svg>
  </View>
);

export default DefaultAvatar;
