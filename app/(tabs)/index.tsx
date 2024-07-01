import ServicesList from "@/components/Appointments/services-flat-list";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ServicesList />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  greetingText: { fontWeight: "600", fontSize: 18, color: "rgba(0, 0, 0, 1)" },
});
