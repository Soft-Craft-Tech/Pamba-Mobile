import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props: {
  onPress: any;
  title?: "Save" | string;
}) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 50,
    backgroundColor: "#0F1C35",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
