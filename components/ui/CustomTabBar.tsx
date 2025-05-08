import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Get screen width for proper distribution
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  // Calculate tab width based on screen width and number of tabs
  const tabWidth = SCREEN_WIDTH / state.routes.length;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.solidBackground} />

      <LinearGradient
        colors={["rgba(29, 79, 215, 0.2)", "rgba(64, 134, 244, 0.02)"]}
        locations={[-0.152, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      >
        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={[styles.tabButton, { width: tabWidth }]}
                onPress={onPress}
                onLongPress={onLongPress}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
              >
                <View style={styles.tabContent}>
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: isFocused ? "#3563E9" : "#6D6D6D",
                      size: 24,
                    })}
                  {options.tabBarLabel &&
                    typeof options.tabBarLabel === "function" &&
                    options.tabBarLabel({
                      focused: isFocused,
                      color: isFocused ? "#3563E9" : "#6D6D6D",
                      position: "below-icon",
                      children: route.name,
                    })}
                  {options.tabBarLabel &&
                    typeof options.tabBarLabel === "string" && (
                      <Text
                        style={{
                          color: isFocused ? "#3563E9" : "#6D6D6D",
                          fontSize: 12,
                          fontWeight: isFocused ? "600" : "400",
                          marginTop: 4,
                        }}
                      >
                        {options.tabBarLabel}
                      </Text>
                    )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 9999,
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  solidBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#040429",
  },
  background: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomTabBar;
