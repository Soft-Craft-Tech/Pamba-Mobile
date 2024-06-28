import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function CreateAccountScreen() {
  const [username, setUsername] = useState("");
  const [activeRadio, setActiveRadio] = React.useState("");
  const [isChecked, setChecked] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("@/assets/images/black-logo.png")} />
        </View>
        <Text style={styles.welcomeText}>Create Account</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.countryCode}>
            <View style={styles.dialCode}>
              <Text style={styles.textCode}>+254</Text>
            </View>
            <TextInput
              style={styles.inputCode}
              placeholder="Phone Number"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.helperContainer}>
            <Text style={styles.helperText}>
              We collect your phone number for notification purposes
            </Text>
          </View>
          <View style={styles.genderContainer}>
            <Text>Gender</Text>
            <View style={styles.genderBox}>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setActiveRadio("male");
                  }}
                >
                  <View
                    style={
                      activeRadio === "male"
                        ? styles.activeRadio
                        : styles.radioButton
                    }
                  />
                </TouchableOpacity>
                <Text>Male</Text>
              </View>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setActiveRadio("female");
                  }}
                >
                  <View
                    style={
                      activeRadio === "female"
                        ? styles.activeRadio
                        : styles.radioButton
                    }
                  />
                </TouchableOpacity>
                <Text>Female</Text>
              </View>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={username}
            onChangeText={setUsername}
          />
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
          <View style={styles.rememberContainer}>
            <Checkbox
              color={isChecked ? "#007B99" : undefined}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Link href="/forgot-password">
              <Text>{`Accept `}</Text>
              <Text style={styles.forgotText}>Terms and conditions</Text>
              <Text>{` and `}</Text>
              <Text style={styles.forgotText}>Privacy Policy</Text>
            </Link>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-google" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-twitter" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-linkedin" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-github" />
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <Link href="/login">
              <Text style={styles.signupLink}>Sign In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    color: "#333",
  },
  countryCode: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialCode: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    color: "#007B99",
  },
  formContainer: { padding: 20, width: "100%", gap: 3 },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputCode: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  textCode: {
    color: "#8C8C8C",
  },
  helperText: {
    color: "#8C8C8C",
    fontSize: 8,
  },
  helperContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  genderContainer: {
    gap: 4,
    marginBottom: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "rgba(140, 140, 140, 1)",
    borderRadius: 50,
  },
  activeRadio: {
    height: 20,
    width: 20,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "rgba(219, 20, 113, 1)",
  },
  genderBox: {
    flexDirection: "row",
    gap: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    width: "100%",
    marginBottom: 30,
  },
  rememberText: {
    color: "#333",
  },
  forgotText: {
    color: "#007B99",
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
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  socialIcon: {
    fontSize: 24,
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
