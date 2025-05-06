import { StatusBar } from "expo-status-bar";
import React from "react";
import {
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

  return (
    <Container style={[styles.container, style]}>
      <StatusBar style="light" />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050628",
    paddingTop: RNStatusBar.currentHeight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ScreenContainer;
