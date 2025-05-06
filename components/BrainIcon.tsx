import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface BrainIconProps {
  size?: number;
  color?: string;
}

const BrainIcon: React.FC<BrainIconProps> = ({
  size = 24,
  color = "#3563E9",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.5 13v-3M12 21v-9M8.5 13v-3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M19.5 8.5a2.5 2.5 0 10-5 0v4a2.5 2.5 0 005 0M4.5 8.5a2.5 2.5 0 115 0v4a2.5 2.5 0 11-5 0M12 3a2.5 2.5 0 00-2.5 2.5v6a2.5 2.5 0 005 0v-6A2.5 2.5 0 0012 3z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BrainIcon;
