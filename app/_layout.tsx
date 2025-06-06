import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen as RouterSplashScreen, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import CustomSplashScreen from "@/screens/Splash/SplashScreen";

// Keep the splash screen visible while we fetch resources
// This ensures a smooth transition from native splash to custom splash
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

// Hide the router splash screen (different from the native splash screen)
RouterSplashScreen.hideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      // Once fonts are loaded, hide the native splash screen
      // This will reveal our custom splash screen component
      SplashScreen.hideAsync().catch(() => {
        /* reloading the app might trigger some race conditions, ignore them */
      });
    }
  }, [loaded]);

  const handleSplashComplete = () => {
    setShowCustomSplash(false);
  };

  // If fonts are not loaded, return null - the native splash screen will stay visible
  if (!loaded) {
    return null;
  }

  // If fonts are loaded but we're still in the splash phase, show the animated splash
  if (showCustomSplash) {
    return <CustomSplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Dark background that covers entire app */}
      <View style={styles.backgroundLayer} />

      <View style={styles.container}>
        <Stack initialRouteName="onboarding">
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#050628",
    zIndex: -1,
  },
});
