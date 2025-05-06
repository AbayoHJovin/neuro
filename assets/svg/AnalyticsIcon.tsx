import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AnalyticsIcon = (props: any) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M20 21V5M4 21V9M12 21V3"
      stroke={props.color || "#6D6D6D"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 14L8 10L12 14L20 6"
      stroke={props.color || "#6D6D6D"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AnalyticsIcon;
