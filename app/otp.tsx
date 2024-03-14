import React, { useState, useRef } from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

interface OTPInputProps {}

const OTPInput: React.FC<OTPInputProps> = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const navigation = useNavigation();

  const handleOTPChange = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (index < 3 && value !== "") {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#d0d0d0" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ENTER DIGIT VERIFICATION</Text>
        <Text></Text>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.confirmationTitle}>
          Enter 4-digit Verification code
        </Text>
        <Text style={styles.confirmationText}>
          Code sent to +254246****. This code will expire in 01:30
        </Text>
        <View style={styles.inputBoxes}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleOTPChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lowerContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    gap: 30,
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
    backgroundColor: "#1b2840",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 33,
    fontWeight: "700",
    color: "#928c8c",
    marginHorizontal: 5,
  },
  confirmationText: {
    fontSize: 14,
    color: "#c9c2c2",
    textAlign: "center",
    marginTop: 20,
    maxWidth: 229,
  },
  confirmationTitle: {
    fontSize: 30,
    color: "#828282",
    textAlign: "center",
    marginTop: 10,
    maxWidth: 229,
    fontWeight: "500",
  },
});

export default OTPInput;
