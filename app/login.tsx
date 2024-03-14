import { Link } from "expo-router";
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import CustomCheckbox from "@/components/CustomCheckbox";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme.web";

const logoImage = require("../assets/images/Logo.png");

export default function Page() {
  const colorScheme = useColorScheme();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Image style={styles.image} source={logoImage} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.signInText}>Sign in to continue</Text>

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
          <Link href="/forgot-password">
            <Text style={styles.linkText}>Forgot password?</Text>
          </Link>
        </View>
        <Pressable style={styles.buttonStyle} onPress={() => {}}>
          <Text style={styles.btnTxt}>Sign In</Text>
        </Pressable>
        <View style={styles.thirdPartyAuth}>
          <Text>Don't have an Account?</Text>
          <Link href="/signup" asChild>
            <Pressable>
              <Text style={styles.linkText}>Signup</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    backgroundColor: "#1b2840",
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
  },
  signInText: {
    fontSize: 16,
    color: "#393f45",
  },
  link: {
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
    gap: 10,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 40,
    backgroundColor: "#DB1471",
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
  betaText: {
    marginTop: 100,
  },
});
