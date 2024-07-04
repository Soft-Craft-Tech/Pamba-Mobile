import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getEmail } from "@/api/utils";
import { useResendOtp, useVerificationMutation } from "@/api/use-auth";
import CustomButton from "@/components/Button";

const { width } = Dimensions.get("window");

export default function OTPVerification() {
  const emailAdress = getEmail();
  const [otp, setOtp] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [otpSize, setOtpSize] = useState(40);
  const router = useRouter();
  const { mutate: verify, isPending, isSuccess } = useVerificationMutation();
  const { mutate: resendOtp, isPending: isPendingOtp } = useResendOtp();

  useEffect(() => {
    setFontSize(Math.min(24, width * 0.06));
    setOtpSize(Math.min(40, width * 0.1));
  }, []);

  const handleOtpChange = (value: string) => {
    if (otp.length < 6) {
      setOtp(otp + value);
    }
  };

  const clearLastInput = () => {
    setOtp(otp.slice(0, -1));
  };

  const handleSubmit = () => {
    verify({ otp, email: emailAdress });
  };

  if (isSuccess) {
    router.push("/login");
  }

  const renderOtpInputs = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <View
        key={i}
        style={[
          styles.otpCircle,
          { width: otpSize, height: otpSize, borderRadius: otpSize / 2 },
        ]}
      >
        <Text style={[styles.otpText, { fontSize: fontSize * 0.8 }]}>
          {otp[i] || ""}
        </Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { fontSize: fontSize * 1.2 }]}>
          OTP Verification
        </Text>
        <Text style={[styles.subtitle, { fontSize: fontSize * 0.6 }]}>
          Please check your email{" "}
          <Text style={{ color: "#DB1471" }}>{emailAdress}</Text> to see the
          verification code
        </Text>
        <Text style={[styles.subtitle, { fontSize: fontSize * 0.6 }]}>
          Input Pin Code (6-digit)
        </Text>
        <View style={styles.otpContainer}>{renderOtpInputs()}</View>
        <View style={styles.keypadContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.keypadButton,
                { width: width * 0.23, height: width * 0.23 },
              ]}
              onPress={() => handleOtpChange(num.toString())}
            >
              <Text style={[styles.keypadButtonText, { fontSize: fontSize }]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.keypadButton,
              { width: width * 0.25, height: width * 0.25 },
            ]}
            onPress={() => handleOtpChange("0")}
          >
            <Text style={[styles.keypadButtonText, { fontSize: fontSize }]}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.keypadButton,
              styles.clearButton,
              { width: width * 0.25, height: width * 0.25 },
            ]}
            onPress={clearLastInput}
          >
            <MaterialIcons name="backspace" size={fontSize} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[{ width: width * 0.8 }]}>
          <CustomButton
            loading={isPending || isPendingOtp}
            onPress={handleSubmit}
            buttonText="Submit"
          />
        </View>
        <TouchableOpacity
          onPress={() => resendOtp({ email: emailAdress })}
          style={styles.resendContainer}
        >
          <Text style={{ fontSize: fontSize * 0.6 }}>
            Didn't get a code?
            <Text style={styles.resendText}>{` Resend`}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  otpCircle: {
    borderWidth: 1,
    borderColor: "#DB1471",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  otpText: {
    color: "#DB1471",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  keypadButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 1000,
    margin: "1%",
  },
  keypadButtonText: {
    color: "#000",
  },
  clearButton: {
    backgroundColor: "#DB1471",
  },
  submitButton: {
    backgroundColor: "#DB1471",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  resendContainer: {
    marginTop: 10,
  },
  resendText: {
    color: "#007B99",
  },
});
