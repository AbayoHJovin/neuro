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
      <View className={`absolute w-[30%] h-[30%] bg-[${color}] rounded-full`} />
      <View
        className={`absolute w-[20%] h-[20%] bg-[${color}] rounded-full left-[60%]`}
      />
      <View
        className={`absolute w-[20%] h-[20%] bg-[${color}] rounded-full top-[60%]`}
      />
      <View
        className={`absolute w-[20%] h-[20%] bg-[${color}] rounded-full left-[60%] top-[60%]`}
      />
    </View>
  );
}
