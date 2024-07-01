// import { Ionicons } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox";
// import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/black-logo.png")} />
      </View>
      <Text style={styles.welcomeText}>Forgot Password?</Text>
      <Text style={styles.welcomeText}>Create a secure Password</Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons size={24} name="eye-off" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons size={24} name="eye-off" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/password-success");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Remember your password?</Text>
          <Link href="/login">
            <Text style={styles.signupLink}>Login</Text>
          </Link>
        </View>
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
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
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  signupText: {
    color: "#333",
  },
  signupLink: {
    color: "#007B99",
  },
});
