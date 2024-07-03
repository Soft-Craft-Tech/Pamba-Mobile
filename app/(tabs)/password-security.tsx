import { StyleSheet, Text, View } from "react-native";

const PasswordAndSecurity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password and Security</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default PasswordAndSecurity;
