import DateSlider from "@/components/DateSlider";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";

const avatarPng = require("../../assets/images/avatar.png");
export default function TabThreeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.field}>
          <View style={styles.greetingsBox}>
            <View>
              <Text>Welcome back</Text>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Diana Mugo
              </Text>
            </View>
            <Image source={avatarPng} />
          </View>
          <View style={styles.bookingsBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                }}
              >
                Bookings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 5,
                }}
              >
                <MaterialIcons
                  name="calendar-today"
                  size={16}
                  color="#959595"
                />
                <Text>March 2024</Text>
              </View>
            </View>
          </View>
          <DateSlider
            startDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <View style={styles.bookingsBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "#e3e8f1",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#10275a",
                }}
              >
                Today
              </Text>
              <Text>12h 45m</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  field: {
    width: "80%",
    paddingTop: 30,
  },
  greetingsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingsBox: {
    marginTop: "5%",
  },
});
