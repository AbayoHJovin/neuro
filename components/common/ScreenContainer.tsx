import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  disableSafeArea?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  contentStyle,
  disableSafeArea = false,
}) => {
  const Container = disableSafeArea ? View : SafeAreaView;

  // Calculate paddingTop for Android
  const statusBarHeight =
    Platform.OS === "android" ? RNStatusBar.currentHeight || 0 : 0;

  return (
    <Container
      style={[
        styles.container,
        { paddingTop: disableSafeArea ? statusBarHeight : 0 },
        style,
      ]}
    >
      <StatusBar style="light" />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050628",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ScreenContainer;
