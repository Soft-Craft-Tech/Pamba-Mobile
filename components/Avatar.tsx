import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";

const Avatar: React.FC = ({}) => {
  return (
    <View style={styles.avatarContainer}>
      {/* <Image source="https://bit.ly/dan-abramov" contentFit="cover" />
       */}
      <Text style={styles.profileText}>DC</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DB1471",
  },
  profileText: {
    color: "#fff",
  },
});

export default Avatar;
