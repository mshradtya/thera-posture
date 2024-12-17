import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="questionnaire/question1"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="questionnaire/question2"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="questionnaire/question3"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="questionnaire/question4"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
