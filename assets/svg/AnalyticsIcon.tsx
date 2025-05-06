import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AnalyticsIcon = (props: any) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M17.5 17.5H8.33333C5.58333 17.5 4.20833 17.5 3.35417 16.6458C2.5 15.7917 2.5 14.4167 2.5 11.6667V2.5M5.83333 3.33333H6.66667M5.83333 5.83333H9.16667"
      stroke={props.color || "#1D4FD7"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.16675 16.6667C5.05841 15.0442 6.26925 10.8492 8.58841 10.8492C10.1917 10.8492 10.6067 12.8934 12.1784 12.8934C14.8809 12.8934 14.4892 8.33337 17.5001 8.33337"
      stroke={props.color || "#1D4FD7"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AnalyticsIcon;
