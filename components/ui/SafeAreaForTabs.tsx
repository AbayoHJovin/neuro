import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaForTabsProps extends ViewProps {
  children: React.ReactNode;
  additionalBottomPadding?: number;
  backgroundColor?: string;
}

/**
 * A component that adds appropriate padding to screens with tabs
 * to prevent content from being hidden by the tab bar.
 */
const SafeAreaForTabs: React.FC<SafeAreaForTabsProps> = ({
  children,
  additionalBottomPadding = 0,
  backgroundColor = "#050628",
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          // Add safe area insets + extra spacing for tab bar
          paddingBottom: insets.bottom + 80 + additionalBottomPadding,
          backgroundColor,
        },
        style,
      ]}
      {...props}
    >
      {/* Background View that extends beyond the tab bar */}
      <View style={[styles.backgroundExtension, { backgroundColor }]} />

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundExtension: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -100, // Extend below the tab bar
    height: 100,
    zIndex: 1, // Above content but below tab bar
  },
});

export default SafeAreaForTabs;
