import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { Skeleton } from "moti/skeleton";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value: string) => {
    if (otp.length < 5) {
      setOtp(otp + value);
    }
  };

  const clearLastInput = () => {
    setOtp(otp.slice(0, -1));
  };

  const renderOtpInputs = () => {
    const inputs = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <View key={i} style={styles.otpCircle}>
          <Text style={styles.otpText}>{otp[i] || ""}</Text>
        </View>
      );
    }
    return inputs;
  };

  // const viewArray = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Please check your email abc@gmail.com to see the verification code
      </Text>
      <Text style={styles.subtitle}>Input Pin Code (5-digit)</Text>
      {/* <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.padded]}
        animate={{ backgroundColor: "#ffffff" }}
      >
        {viewArray.map((item) => (
          <Skeleton
            key={item}
            colorMode="light"
            radius="round"
            height={36}
            width={36}
          />
        ))}
      </MotiView> */}
      <View style={styles.otpContainer}>{renderOtpInputs()}</View>
      <View style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.keypadButton}
            onPress={() => handleOtpChange(num.toString())}
          >
            <Text style={styles.keypadButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={() => handleOtpChange("0")}
        >
          <Text style={styles.keypadButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.keypadButton, styles.clearButton]}
          onPress={clearLastInput}
        >
          <MaterialIcons name="cancel" size={24} color="white" />
        </TouchableOpacity>
        <View />
        <TouchableOpacity style={[styles.keypadButton, styles.clearButton]}>
          <Text style={styles.clearButtonText}>SUBMIT</Text>
        </TouchableOpacity>
        <View />
      </View>

      <TouchableOpacity onPress={() => console.log("Resend OTP")}>
        <Text>
          Didn't get a code?
          <Text style={styles.resendText}>{` Resend`}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  otpCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF1493",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  otpText: {
    fontSize: 20,
    color: "#FF1493",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "80%",
  },
  keypadButton: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 1000,
    margin: 5,
  },
  keypadButtonText: {
    fontSize: 24,
  },
  clearButton: {
    backgroundColor: "#FF1493",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendText: {
    color: "#007B99",
    marginTop: 20,
  },
  padded: {
    padding: 16,
    flexDirection: "row",
    gap: 5,
  },
});
