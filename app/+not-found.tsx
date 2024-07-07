import { Link } from "expo-router";
import { StyleSheet, Image, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/empty-page.png")} />
      <Text style={styles.emptyText}>You have visited a wrong page</Text>
      <Link href="/">
        <Text> Go Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F9",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: { marginTop: 10, fontSize: 18, marginBottom: 10 },
});
