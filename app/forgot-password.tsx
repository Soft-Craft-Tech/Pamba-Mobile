// import ForgotPassword from "@/components/ForgotPassword";
// import ResetPassword from "@/components/ResetPassword";
// import ResetSuccess from "@/components/ResetSuccess";
import {
  StyleSheet,
  TouchableOpacity,
  View as NormalView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { View, Text } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface PasswordPageProps {}

const checkIcom = require("../assets/images/checkIcon.png");

type Step = "forgot" | "reset" | "success";

const PasswordPage: React.FC<PasswordPageProps> = () => {
  const [step, setStep] = useState<Step>("forgot");

  const goToResetPassword = () => {
    setStep("reset");
  };

  const goToResetSuccess = () => {
    setStep("success");
  };

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const PhoneNumberComponent = () => {
    const phoneNumber = "1234567890";
    const hiddenDigits = phoneNumber
      .substring(0, phoneNumber.length - 4)
      .replace(/\d/g, "●");
    const visibleDigits = phoneNumber.substring(phoneNumber.length - 4);
    return (
      <NormalView
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Text>{hiddenDigits}</Text>
        <Text>{visibleDigits}</Text>
      </NormalView>
    );
  };
  const EmailComponent = () => {
    const email = "example@gmail.com";
    const hiddenName = email
      .substring(0, email.indexOf("@"))
      .replace(/./g, "●");
    const emailExtension = email.substring(email.indexOf("@"));
    return (
      <NormalView style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>{hiddenName}</Text>
        <Text>{emailExtension}</Text>
      </NormalView>
    );
  };
  return (
    <View style={styles.container}>
      {/* Forgot Password */}
      {step === "forgot" && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#d0d0d0" />
            </TouchableOpacity>
            <Text style={styles.headerText}>FORGOT PASSWORD</Text>
            <Text></Text>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.confirmationTitle}>Forgot password?</Text>
            <Text style={styles.confirmationText}>
              Select which contact details should we use to reset your password
            </Text>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={goToResetPassword}
            >
              <MaterialIcons name="chat" size={24} color="#db1471" />
              <NormalView>
                <Text>Via sms:</Text>
                <PhoneNumberComponent />
              </NormalView>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={goToResetPassword}
            >
              <MaterialIcons name="email" size={24} color="#db1471" />
              <NormalView>
                <Text>Via email:</Text>
                <EmailComponent />
              </NormalView>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Reset Password */}
      {step === "reset" && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#d0d0d0" />
            </TouchableOpacity>
            <Text style={styles.headerText}>RESET PASSWORD</Text>
            <Text></Text>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.confirmationTitle}>
              Reset your password here
            </Text>
            <Text style={styles.confirmationText}>Enter new password here</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.newInput}
                placeholder="New Password"
                placeholderTextColor="#d0d0d0"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <MaterialIcons
                  name={passwordVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <Pressable style={styles.buttonStyle} onPress={goToResetSuccess}>
              <Text style={styles.btnTxt}>RESET MY PASSWORD</Text>
            </Pressable>
          </View>
        </View>
      )}
      {/* <ResetSuccess /> */}
      {step === "success" && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#d0d0d0" />
            </TouchableOpacity>
            <Text style={styles.headerText}>PASSWORD RESET SUCCESFUL</Text>
            <Text></Text>
          </View>
          <View style={styles.lowerContainer}>
            <Image source={checkIcom} />
            <Text style={styles.confirmationTitle}>
              Password reset succesful
            </Text>
            <Text style={styles.confirmationText}>
              You have successfully reset your password. Please use your new
              password when you're loggin in
            </Text>
            <Link href="/login" asChild>
              <Pressable style={styles.buttonStyle} onPress={() => {}}>
                <Text style={styles.btnTxt}>CONTINUE</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lowerContainer: {
    marginTop: 100,
    alignItems: "center",
    gap: 30,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#1b2840",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    height: 92,
    borderRadius: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#db1471",
  },
  inputBoxes: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    height: 92,
    width: 70,
    borderWidth: 1,
    backgroundColor: "#adadad",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 33,
    fontWeight: "700",
    color: "#928c8c",
    marginHorizontal: 5,
  },
  confirmationText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    maxWidth: "80%",
  },
  confirmationTitle: {
    fontSize: 35,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
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
  newInput: {
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
});

export default PasswordPage;
