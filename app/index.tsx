import { Link } from "expo-router";
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import CustomCheckbox from "@/components/CustomCheckbox";

const logoImage = require("../assets/images/Logo.png");

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={logoImage} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.signInText}>Sign in for continue</Text>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log("Left icon pressed")}>
            <MaterialIcons name="email" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#d0d0d0"
            autoCapitalize="none"
          />
        </View>
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => console.log("Left password icon pressed")}
          >
            <MaterialIcons name="lock" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#d0d0d0"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#d0d0d0"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkBoxContainer}>
          <CustomCheckbox label="Remember me" />
          <Link href="/">
            <Text style={styles.linkText}>Forgot password?</Text>
          </Link>
        </View>
        <Pressable style={styles.buttonStyle} onPress={() => {}}>
          <Text style={styles.btnTxt}>Sign In</Text>
        </Pressable>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.dividerText}>Or Continue with</Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.thirdPartyAuth}>
          <Text>Don't have an Account?</Text>
          <Link href="/">
            <Text style={styles.linkText}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    height: 55,
    borderColor: "#d0d0d0",
    borderWidth: 1,
    width: "80%",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  checkbox: {
    height: "auto",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    paddingLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
  },
  signInText: {
    fontSize: 16,
    color: "#393f45",
    marginTop: 30,
    marginBottom: 70,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  image: {},
  signInBtn: {
    width: "80%",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
    gap: 10,
  },
  divider: {
    borderBottomColor: "#d0d0d0",
    borderBottomWidth: 1,
    flex: 1,
  },
  dividerText: {
    fontSize: 16,
    color: "#393f45",
  },
  thirdPartyAuth: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 50,
    backgroundColor: "#0F1C35",
    width: "80%",
  },
  btn2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 50,
    backgroundColor: "#0F1C35",
    width: "45%",
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
