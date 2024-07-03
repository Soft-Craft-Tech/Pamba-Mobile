import StandardView from "@/components/StandardView";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function CongratulationsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/check-icon.png")} />
      </View>
      <Text style={styles.welcomeText}>
        Congratulations! Your appointment has been successfully booked.
      </Text>
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push(`/appointments/${2}`);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Appointment Details</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>
        If you need to make any changes or cancel your appointment, please do so
        at least 24 hours in advance.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F6F9",
    justifyContent: "center",
    gap: 15,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 21,
    fontWeight: "700",
    color: "rgba(79, 82, 83, 1)",
    textAlign: "center",
  },
  formContainer: { padding: 20, width: "100%" },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#DB1471",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bottomText: {
    textAlign: "center",
    maxWidth: 319,
    fontSize: 14,
    fontWeight: "400",
    color: "#0F1C35",
  },
});
