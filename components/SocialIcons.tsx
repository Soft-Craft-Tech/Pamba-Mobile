import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SocialIcons = () => {
  return (
    <View style={styles.socialIconsContainer}>
      <TouchableOpacity>
        <Ionicons size={24} name="logo-google" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons size={24} name="logo-twitter" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons size={24} name="logo-linkedin" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons size={24} name="logo-github" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  socialIcon: {
    fontSize: 24,
  },
});

export default SocialIcons;
