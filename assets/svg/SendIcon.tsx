import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SendIcon = (props: any) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke={props.color || "#3563E9"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={props.filled ? props.color || "#3563E9" : "none"}
    />
  </Svg>
);

export default SendIcon;
