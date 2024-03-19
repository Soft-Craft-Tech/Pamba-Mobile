import { Link, Stack } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "@/components/Themed";
import CustomCheckbox from "@/components/CustomCheckbox";

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <>
      <View style={styles.bottomRow}>
        <Text style={styles.accountHeader}>CREATE</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome to Pamba</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log("Left icon pressed")}>
            <MaterialIcons name="person" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#d0d0d0"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log("Left icon pressed")}>
            <MaterialIcons name="phone" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="0712345678"
            placeholderTextColor="#d0d0d0"
            autoCapitalize="none"
          />
        </View>
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
        </View>
        <Link href="/otp" asChild>
          <Pressable style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.btnTxt}>REGISTER NOW</Text>
          </Pressable>
        </Link>
        <View style={styles.checkBoxContainer}>
          <CustomCheckbox label="Accept all the requirements that we have provided" />
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bottomItems}>
          <TouchableOpacity onPress={() => console.log("Terms of Use pressed")}>
            <Text style={styles.bottomLink}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Privacy Policy pressed")}
          >
            <Text style={styles.bottomLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Contact pressed")}>
            <Text style={styles.bottomLink}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "left",
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
    borderRadius: 10,
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
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  bottomRow: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  bottomItems: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  bottomLink: {
    fontSize: 16,
  },
  accountHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    color: "#DB1471",
  },
});
