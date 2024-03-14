import { StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme.web";
import { router } from "expo-router";

const newLogo = require("../assets/images/Splash.png");

export default function Page() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <View style={styles.splashContainer}>
        <Image style={styles.splashImage} source={newLogo} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});
