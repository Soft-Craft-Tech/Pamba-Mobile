import { StyleSheet, Text, ImageBackground, Image } from "react-native";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme.web";
import { router } from "expo-router";

const newLogo = require("../assets/images/bgImage.png");

const splashLogo = require("../assets/images/splashLogo.png");

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
        <ImageBackground source={newLogo} style={styles.image}>
          <Image source={splashLogo} style={styles.logo} />
          <Text style={styles.text}>Beta Version</Text>
        </ImageBackground>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: "10%",
  },
  logo: { marginTop: "30%" },
});
