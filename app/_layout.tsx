import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./ctx";
import { FontAwesome } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "onboarding",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <ThemeProvider value={DefaultTheme}>
          <GestureHandlerRootView>
            <NotifierWrapper>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="verification"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="launchpad"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="create-account"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                  name="forgot-password"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="reset-password/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="password-success"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="terms/[id]"
                  options={{
                    title: "",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="+not-found"
                  options={{
                    title: "Opps!",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="reset-confirmation"
                  options={{
                    title: "",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
              </Stack>
            </NotifierWrapper>
          </GestureHandlerRootView>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
