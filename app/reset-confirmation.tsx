import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function ResetConfirmation() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/check-icon.png")} />
      </View>
      <Text style={styles.welcomeText}>Check your email Inbox</Text>
      <Text style={styles.welcomeText}>Password Request Sent Successfully</Text>
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/login");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F6F9",
    justifyContent: "center",
    gap: 15,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    color: "rgba(79, 82, 83, 1)",
  },
  formContainer: { padding: 20, width: "100%" },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#DB1471",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
