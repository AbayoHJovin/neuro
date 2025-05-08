import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ScrollToBottomIcon = (props: any) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#3563E9" opacity={0.9} />
    <Path
      d="M20 28L13 21M20 28L27 21M20 28L20 12"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ScrollToBottomIcon;
