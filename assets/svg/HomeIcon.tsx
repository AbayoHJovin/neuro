import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = (props: any) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke={props.color || "#3563E9"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={props.filled ? props.color || "#3563E9" : "none"}
    />
  </Svg>
);

export default HomeIcon;
