// components/CustomSVG.tsx
import React from "react";
import Svg, {
  Path,
  Ellipse,
  Defs,
  RadialGradient,
  Stop,
} from "react-native-svg";

const NeuroLabLogo = () => {
  return (
    <Svg
      width="65"
      height="74"
      viewBox="0 0 65 74"
      fill="none"
    >
      <Path
        d="M32.5 7V37M32.5 37L7.35028 51.3713M32.5 37L57.6497 51.3713"
        stroke="url(#grad1)"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <Ellipse
        cx="32.3204"
        cy="37"
        rx="2.15569"
        ry="2.33533"
        fill="white"
      />
      <Path
        d="M6.63171 51.1596V23.3453C6.63171 22.6316 7.40941 22.1896 8.02399 22.5524C23.1738 31.4949 32.5 47.7951 32.5 65.3873C32.5 66.1001 31.725 66.5425 31.1112 66.1802L7.12339 52.0208C6.81869 51.8409 6.63171 51.5134 6.63171 51.1596Z"
        stroke="white"
        strokeWidth="13"
      />
      <Path
        d="M58.3683 51.3099V23.2983C58.3683 22.6061 57.615 22.1769 57.0196 22.5298V22.5298C41.8202 31.5377 32.5 47.8954 32.5 65.5635V67"
        stroke="white"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <Path
        d="M6.81134 22.0898L7.84131 22.6876C23.0718 31.5277 41.8877 31.4586 57.0529 22.507V22.507C57.6387 22.1612 57.6321 21.3114 57.0409 20.9747L32.5 7"
        stroke="white"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <Defs>
        <RadialGradient
          id="grad1"
          cx="32.6796"
          cy="37"
          rx="22.1969"
          ry="19.5808"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#000000" />
          <Stop offset="0.292888" stopColor="#4B4B4B" />
          <Stop offset="0.54145" stopColor="#828282" />
          <Stop offset="1" stopColor="#FFFFFF" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default NeuroLabLogo;
