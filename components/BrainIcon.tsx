// import * as React from "react";
// import Svg, { Path } from "react-native-svg";

// interface BrainIconProps {
//   size?: number;
//   color?: string;
// }

// const BrainIcon: React.FC<BrainIconProps> = ({
//   size = 24,
//   color = "#3563E9",
// }) => {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//       <Path
//         d="M15.5 13v-3M12 21v-9M8.5 13v-3"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//       />
//       <Path
//         d="M19.5 8.5a2.5 2.5 0 10-5 0v4a2.5 2.5 0 005 0M4.5 8.5a2.5 2.5 0 115 0v4a2.5 2.5 0 11-5 0M12 3a2.5 2.5 0 00-2.5 2.5v6a2.5 2.5 0 005 0v-6A2.5 2.5 0 0012 3z"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//       />
//     </Svg>
//   );
// };

// export default BrainIcon;


import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface BrainIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

const BrainIcon: React.FC<BrainIconProps> = ({
  size = 24,
  color = "#3563E9",
  filled = false,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 20"
      fill="none"
    >
      <Path
        d="M9.02778 0C7.73004 0 6.65365 0.800781 6.34549 1.88281C6.31076 1.88281 6.28472 1.875 6.25 1.875C4.71788 1.875 3.47222 2.99609 3.47222 4.375C3.47222 4.5625 3.49826 4.74609 3.54601 4.92188C2.27865 5.39062 1.38889 6.50781 1.38889 7.8125C1.38889 8.30469 1.52778 8.76172 1.74913 9.17578C0.707465 9.71484 0 10.7148 0 11.875C0 13.1758 0.885417 14.293 2.1441 14.7617C2.10503 14.9414 2.08333 15.125 2.08333 15.3125C2.08333 16.8672 3.4809 18.125 5.20833 18.125C5.38628 18.125 5.5599 18.1055 5.72917 18.0781C6.14583 19.1914 7.30035 20 8.68056 20C10.408 20 11.8056 18.7422 11.8056 17.1875V2.5C11.8056 1.12109 10.5599 0 9.02778 0ZM25 11.875C25 10.7148 24.2925 9.71484 23.2509 9.17578C23.4766 8.76172 23.6111 8.30469 23.6111 7.8125C23.6111 6.50781 22.7214 5.39062 21.454 4.92188C21.4974 4.74609 21.5278 4.5625 21.5278 4.375C21.5278 2.99609 20.2821 1.875 18.75 1.875C18.7153 1.875 18.6849 1.88281 18.6545 1.88281C18.3464 0.800781 17.27 0 15.9722 0C14.4401 0 13.1944 1.11719 13.1944 2.5V17.1875C13.1944 18.7422 14.592 20 16.3194 20C17.6997 20 18.8542 19.1914 19.2708 18.0781C19.4401 18.1055 19.6137 18.125 19.7917 18.125C21.5191 18.125 22.9167 16.8672 22.9167 15.3125C22.9167 15.125 22.895 14.9414 22.8559 14.7617C24.1146 14.293 25 13.1758 25 11.875Z"
        fill={filled? color:""}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BrainIcon;
