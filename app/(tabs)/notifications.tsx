import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";

const notifications = [
  {
    id: "1",
    message: "Your appointment has been booked successfully",
    time: "10 minutes ago",
  },
  {
    id: "2",
    message: "Your appointment has been booked successfully",
    time: "10 minutes ago",
  },
  {
    id: "3",
    message: "Your appointment has been booked successfully",
    time: "10 minutes ago",
  },
  {
    id: "4",
    message: "Your appointment has been booked successfully",
    time: "10 minutes ago",
  },
  {
    id: "5",
    message: "Your appointment has been booked successfully",
    time: "10 minutes ago",
  },
];

const NotificationItem = ({ item }: any) => (
  <View style={styles.notificationContainer}>
    <Avatar.Image
      size={50}
      source={{ uri: "https://i.pravatar.cc/150?img=27" }}
    />
    <View style={styles.textContainer}>
      <Text style={styles.message}>{item.message}</Text>
      <Link href={`/appointments/${item.id}`} asChild>
        <TouchableOpacity>
          <Text style={styles.viewAppointment}>View appointment ➔</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={NotificationItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F6F9",
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#E4E8EE",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  message: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1C1C1C",
  },
  viewAppointment: {
    color: "#DB1471",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  time: {
    color: "#888",
    marginTop: 4,
  },
});

export default NotificationsScreen;
