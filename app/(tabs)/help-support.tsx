import CustomButton from "@/components/Button";
import { StyleSheet, Text, TextInput, View } from "react-native";

const HelpandSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help and Support</Text>
      <View style={styles.formContainer}>
        <Text>Report a problem</Text>
        <Text>
          Did you encounter a problem? Please tell us where the problem is so
          that we can fix the issue fast
        </Text>
        <TextInput style={styles.input} placeholder="Notes" multiline />
        <CustomButton buttonText="Save Changes" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  formContainer: { gap: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
});

export default HelpandSupport;
