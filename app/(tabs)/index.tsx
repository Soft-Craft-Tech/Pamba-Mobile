import StatusBanner from "@/components/StatusBanner";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greetingText}>Welcome Back David</Text>
      <StatusBanner />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  greetingText: { fontWeight: "600", fontSize: 18, color: "rgba(0, 0, 0, 1)" },
});
