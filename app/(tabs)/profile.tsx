import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <TouchableOpacity>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
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

      <View style={styles.ProfileOptions}>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Payment Method</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Linked Devices</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appOptions}>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Privacy & Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deactivateButton}>
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
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userInitials: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
  },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  appOptions: {
    marginBottom: 24,
  },
  deactivateButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 8,
  },
  deactivateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
