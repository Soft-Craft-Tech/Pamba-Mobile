import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import * as Haptics from "expo-haptics";

type TimeObj = {
  hours: number;
  minutes: number;
  seconds: number;
};

const convertTo24HourFormat = (timeObj: TimeObj): string => {
  const { hours, minutes, seconds } = timeObj;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const PickDate = () => {
  const [selectedDay, setSelectedDay] = useState("Fri");
  const [showPicker, setShowPicker] = useState(false);

  const days = [
    { day: "Fri", date: "03 Feb", slots: 16 },
    { day: "Sun", date: "03 Feb", slots: 2 },
    { day: "Mon", date: "03 Feb", slots: 2 },
    { day: "Tue", date: "03 Feb", slots: 5 },
    { day: "Wed", date: "03 Feb", slots: 5 },
    { day: "Thur", date: "03 Feb", slots: 5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a day</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === item.day && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(item.day)}
          >
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.slotsText}>{item.slots} available slots</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TimerPickerModal
          visible={showPicker}
          use12HourPicker
          hourLabel=":"
          minuteLabel=""
          hideSeconds
          setIsVisible={setShowPicker}
          onConfirm={(pickedDuration) => {
            console.log(pickedDuration);
            console.log(convertTo24HourFormat(pickedDuration));
            setShowPicker(false);
          }}
          modalTitle="Select Time"
          onCancel={() => setShowPicker(false)}
          closeOnOverlayPress
          LinearGradient={LinearGradient}
          Haptics={Haptics}
          styles={{
            theme: "light",
          }}
          modalProps={{
            overlayOpacity: 0.2,
          }}
        />
        <Text style={styles.subHeader}>Choose a slot for your haircut</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Select service provider</Text>
      <View style={styles.providerContainer}>
        <Image
          source={{ uri: "https://example.com/provider-image.jpg" }}
          style={styles.providerImage}
        />
        <Text>Olivia Rhye (optional)</Text>
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book PickDateointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  dayButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    height: 104,
    width: 102,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedDay: { borderColor: "#DB1471", borderWidth: 2 },
  dayText: { fontWeight: "bold" },
  dateText: { fontSize: 12 },
  slotsText: { fontSize: 10, color: "green", textAlign: "center" },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  timeSlotContainer: { flexDirection: "row", flexWrap: "wrap" },
  timeSlot: { padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 },
  selectedTime: { backgroundColor: "lightblue" },
  providerContainer: { flexDirection: "row", alignItems: "center" },
  providerImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  bookButton: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: { color: "white", fontWeight: "bold" },
});

export default PickDate;
