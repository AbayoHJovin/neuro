import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChatIcon = (props: any) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
      stroke={props.color || "#6D6D6D"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={props.filled ? props.color || "#6D6D6D" : "none"}
    />
  </Svg>
);

export default ChatIcon;
