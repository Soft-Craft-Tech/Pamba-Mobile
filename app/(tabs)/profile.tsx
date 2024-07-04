import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../ctx";

const Profile = () => {
  const router = useRouter();
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/profile-settings");
          }}
          style={styles.itemWrapper}
        >
          <View style={styles.itemLeft}>
            <Feather name="user" size={24} color="#667085" />
            <Text>Profile Settings</Text>
          </View>
          <View>
            <FontAwesome5 name="chevron-right" size={20} color="#667085" />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            router.push("/password-security");
          }}
          style={styles.itemWrapper}
        >
          <View style={styles.itemLeft}>
            <Feather name="lock" size={20} color="#667085" />
            <Text>Password & Security</Text>
          </View>
          <View>
            <FontAwesome5 name="chevron-right" size={20} color="#667085" />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            router.push("/help-support");
          }}
          style={styles.itemWrapper}
        >
          <View style={styles.itemLeft}>
            <FontAwesome name="question-circle-o" size={20} color="#667085" />
            <Text>Help and Support</Text>
          </View>
          <View>
            <FontAwesome5 name="chevron-right" size={20} color="#667085" />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            router.push(`/privacy-policy/${"Privacy And Safety"}`);
          }}
          style={styles.itemWrapper}
        >
          <View style={styles.itemLeft}>
            <MaterialIcons name="privacy-tip" size={20} color="#667085" />
            <Text>Privacy and Safety</Text>
          </View>
          <View>
            <FontAwesome5 name="chevron-right" size={20} color="#667085" />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={styles.itemWrapper}
        >
          <View style={styles.itemLeft}>
            <AntDesign name="logout" size={24} color="#667085" />
            <Text>Logout of Account</Text>
          </View>
          <View>
            <FontAwesome5 name="chevron-right" size={20} color="#667085" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  profileContainer: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  itemWrapper: { flexDirection: "row", justifyContent: "space-between" },
  itemLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Profile;
