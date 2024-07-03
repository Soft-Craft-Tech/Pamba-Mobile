import { StyleSheet, Text, View } from "react-native";

const Congratulations = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#333",
  },
});

export default Congratulations;
