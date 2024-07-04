import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";

const LaunchPad = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/launchpad.jpeg")}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.bottomSection}>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/create-account");
              }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSection: {
    flex: 0.6,
    padding: 20,
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    backgroundColor: "#DB1471",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#DB1471",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "#DB1471",
    fontSize: 16,
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
});

export default LaunchPad;
