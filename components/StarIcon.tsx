import React from "react";
import { View } from "react-native";

interface StarIconProps {
  size?: number;
  color?: string;
}

export default function StarIcon({
  size = 10,
  color = "#B8A625",
}: StarIconProps) {
  return (
    <View style={{ width: size, height: size }} className="relative">
      <View
        style={{ backgroundColor: color }}
        className="absolute w-[30%] h-[30%] rounded-full"
      />
      <View
        style={{ backgroundColor: color }}
        className="absolute w-[20%] h-[20%] rounded-full left-[60%]"
      />
      <View
        style={{ backgroundColor: color }}
        className="absolute w-[20%] h-[20%] rounded-full top-[60%]"
      />
      <View
        style={{ backgroundColor: color }}
        className="absolute w-[20%] h-[20%] rounded-full left-[60%] top-[60%]"
      />
    </View>
  );
}
