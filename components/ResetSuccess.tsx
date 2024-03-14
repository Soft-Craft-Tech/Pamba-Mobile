import { StyleSheet, TouchableOpacity, Pressable, Image } from "react-native";
import { View, Text } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

interface ResetSuccessProps {}

const checkIcom = require("../assets/images/checkIcon.png");

const ResetSuccess: React.FC<ResetSuccessProps> = () => {
  const navigation = useNavigation();

  return (
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
        <Text style={styles.confirmationTitle}>Password reset succesful</Text>
        <Text style={styles.confirmationText}>
          You have successfully reset your password. Please use your new
          password when you're loggin in
        </Text>
        <Pressable style={styles.buttonStyle} onPress={() => {}}>
          <Text style={styles.btnTxt}>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerContainer: {
    marginTop: 80,
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
  confirmationText: {
    fontSize: 18,
    color: "#828282",
    textAlign: "center",
    marginTop: 20,
    maxWidth: "87%",
  },
  confirmationTitle: {
    fontSize: 30,
    color: "#888d8d",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
    maxWidth: 229,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ResetSuccess;
