import React from "react";
import { View, StyleSheet } from "react-native";

const StandardView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View style={styles.container}>{children}</View>;
};

export default StandardView;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
