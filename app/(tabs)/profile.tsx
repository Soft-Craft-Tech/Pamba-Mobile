import CancelButton from "@/components/CancelButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <CancelButton onPress={() => navigation.goBack()} />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>DM</Text>
          </View>
          <View>
            <Text style={styles.userName}>Diana Mugo</Text>
            <Text style={styles.userEmail}>dianamugo@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editProfileButton}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          color: "#667085",
          marginTop: 10,
          paddingHorizontal: 10,
        }}
      >
        ACCOUNT
      </Text>
      <View style={styles.ProfileOptions}>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="notifications" size={20} />
            <Text style={styles.optionText}>Notification</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="shopping-bag" size={20} />
            <Text style={styles.optionText}>Payment Method</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="lock" size={20} />
            <Text style={styles.optionText}>Security</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="dataset-linked" size={20} />
            <Text style={styles.optionText}>Linked Devices</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          color: "#667085",
          paddingHorizontal: 10,
        }}
      >
        APPS
      </Text>
      <View style={styles.ProfileOptions}>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="notifications" size={20} />
            <Text style={styles.optionText}>Privacy & Policy</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="shopping-bag" size={20} />
            <Text style={styles.optionText}>Terms & Conditions</Text>
          </View>
          <MaterialIcons name="chevron-right" size={23} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deactivateButton}>
        <MaterialIcons name="delete-outline" size={20} color="#DB1471" />
        <Text style={styles.deactivateButtonText}>Deactivate Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "#888",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userInitials: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DB1471",
  },
  editButton: {
    padding: 5,
    borderRadius: 100,
    borderColor: "#DB1471",
    borderWidth: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#888",
  },
  editProfileButton: {
    fontSize: 12,
  },
  ProfileOptions: {
    marginBottom: 24,
    marginTop: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  appOptions: {
    marginBottom: 24,
  },
  deactivateButton: {
    backgroundColor: "#FDEBEB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
  },
  deactivateButtonText: {
    color: "#DB1471",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
