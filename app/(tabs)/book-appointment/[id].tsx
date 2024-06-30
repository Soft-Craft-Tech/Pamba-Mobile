import StandardView from "@/components/StandardView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const BookAppointment = () => {
  const local = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Text>Book Appointment</Text>
        <Text style={styles.title}>{local.id}</Text>
      </StandardView>
    </SafeAreaView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
    textTransform: "capitalize",
  },
});
