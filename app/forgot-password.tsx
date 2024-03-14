import { StyleSheet, TouchableOpacity, View as NormalView } from "react-native";
import { View, Text } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation();

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
          <View style={styles.optionContainer}>
            <MaterialIcons name="chat" size={24} color="#db1471" />
            <NormalView>
              <Text>Via sms:</Text>
              <PhoneNumberComponent />
            </NormalView>
          </View>
          <View style={styles.optionContainer}>
            <MaterialIcons name="email" size={24} color="#db1471" />
            <NormalView>
              <Text>Via email:</Text>
              <EmailComponent />
            </NormalView>
          </View>
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
});

export default ForgotPassword;
