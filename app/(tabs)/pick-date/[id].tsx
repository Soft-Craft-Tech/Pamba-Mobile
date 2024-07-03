import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import * as Haptics from "expo-haptics";
import { Dropdown } from "react-native-element-dropdown";
import { Avatar } from "react-native-paper";
import CustomButton from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";
import { useRouter } from "expo-router";
type TimeObj = {
  hours: number;
  minutes: number;
  seconds: number;
};

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const convertTo24HourFormat = (timeObj: TimeObj): string => {
  const { hours, minutes } = timeObj;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

const PickDate = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Fri");
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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
      {selectedDate !== "" && (
        <View style={styles.selectedDate}>
          <Text>Selected Date: {selectedDate}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TimerPickerModal
          visible={showPicker}
          hourLabel=":"
          minuteLabel=""
          hideSeconds
          setIsVisible={setShowPicker}
          onConfirm={(pickedDuration) => {
            setSelectedTime(convertTo24HourFormat(pickedDuration));
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

        <View style={styles.timeInput}>
          <Text>
            {`${selectedTime} ${selectedTime !== "Select Time" ? "HRS" : ""}`}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Select service provider</Text>
      <View style={styles.providerContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#DB1471" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Olivia Rhae (Optional)" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value as any);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Avatar.Image
              size={30}
              source={{ uri: "https://i.pravatar.cc/150?img=27" }}
            />
          )}
        />
      </View>
      <View style={styles.calendarSelect}>
        <Text style={styles.different}>Need a different day?</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenCalendar(true);
          }}
          style={styles.leftSection}
        >
          <FontAwesome5 name="calendar-check" size={24} color="#007B99" />
          <Text style={styles.selectText}>SELECT DATE</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={openCalendar}>
        <View style={styles.centerdView}>
          <View style={styles.modalView}>
            <DatePicker
              options={{
                backgroundColor: "#FFFFFF",
                textHeaderColor: "#1C1C1C",
                textDefaultColor: "#1C1C1C",
                selectedTextColor: "#DB1471",
                mainColor: "#1C1C1C",
                textSecondaryColor: "#DB1471",
                borderColor: "#1C1C1C",
              }}
              mode="datepicker"
              style={{ borderRadius: 10, borderWidth: 0 }}
              onDateChange={(selectedDate) => {
                setSelectedDate(selectedDate);
                setOpenCalendar(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <CustomButton
        onPress={() => {
          router.push(`/confirm-appointment/${23}`);
        }}
        buttonText="Book Appointment"
      />
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
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  providerImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  bookButton: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: { color: "white", fontWeight: "bold" },
  timeInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  calendarSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  selectText: {
    color: "#007B99",
  },
  different: {
    fontSize: 14,
    fontWeight: "600",
  },
  centerdView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  selectedDate: {
    marginTop: 10,
  },
});

export default PickDate;
