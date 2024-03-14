import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { View, Text } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#d0d0d0" />
        </TouchableOpacity>
        <Text style={styles.headerText}>RESET PASSWORD</Text>
        <Text></Text>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.confirmationTitle}>Reset your password here</Text>
        <Text style={styles.confirmationText}>Enter new password here</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
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
        <Pressable style={styles.buttonStyle} onPress={() => {}}>
          <Text style={styles.btnTxt}>RESET MY PASSWORD</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerContainer: {
    marginTop: 100,
    alignItems: "center",
    gap: 30,
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
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    paddingLeft: 10,
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

  confirmationText: {
    fontSize: 18,
    color: "#828282",
    textAlign: "center",
    marginTop: 20,
    maxWidth: "80%",
  },
  confirmationTitle: {
    fontSize: 30,
    color: "#888d8d",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
    maxWidth: 229,
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
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ResetPassword;
