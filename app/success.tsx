import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "expo-router";

export default function Success() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color="white" />
      </View>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.message}>
        Your appointment has been successfully booked.
      </Text>
      <Link href="/home" style={styles.button} asChild>
        <Pressable onPress={() => {}}>
          <Text style={styles.buttonText}>Done</Text>
        </Pressable>
      </Link>
      <Text style={styles.note}>
        If you need to make any changes or cancel your appointment, please do so
        at least 24 hours in advance.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB1471",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "#e91e63",
    borderRadius: 50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  message: {
    fontSize: 21,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
    color: "white",
  },
  button: {
    backgroundColor: "#212121",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
});
