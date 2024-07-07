import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Avatar, PaperProvider } from "react-native-paper";
import CustomButton from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { useRouter } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import { format } from "date-fns";
import {
  CalendarDate,
  SingleChange,
} from "react-native-paper-dates/lib/typescript/Date/Calendar";

registerTranslation("en", en);

type TimeObj = {
  hours: number;
  minutes: number;
};

type DayInfo = {
  day: string;
  date: string;

  fullDate: Date;
};

type ProviderData = {
  label: string;
  value: string;
  avatar: string;
};

const providerData: ProviderData[] = [
  {
    label: "Olivia Rhae",
    value: "1",
    avatar: "https://i.pravatar.cc/150?img=27",
  },
  { label: "John Doe", value: "2", avatar: "https://i.pravatar.cc/150?img=28" },
];

const customTheme = {
  roundness: 2,
  colors: {
    primary: "#DB1471",
    background: "#fff",
    accent: "#fff",
    text: "#fff",
    surface: "#fff",
  },
};

const days: DayInfo[] = Array.from({ length: 7 }, (_, index) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + index);
  const day = currentDate.toLocaleString("en-US", { weekday: "short" });
  const date = currentDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
  });
  return { day, date, fullDate: currentDate };
});

const PickDate: React.FC = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<string>(days[0]?.day);

  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [date, setDate] = useState<string | undefined>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<TimeObj | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const onDismissTime = useCallback(() => setVisible(false), []);
  const onConfirmTime = useCallback(({ hours, minutes }: TimeObj) => {
    setVisible(false);
    setSelectedTime({ hours, minutes });
  }, []);

  const onDismissDate = useCallback(() => setOpen(false), []);
  const onConfirmDate = useCallback(({ date }: { date: string }) => {
    setOpen(false);
    setDate(date);
  }, []);

  const formatTime = (time: TimeObj | null): string => {
    if (!time) return "Select Time";
    const { hours, minutes } = time;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const disabledButton =
    (date === "" && selectedTime === null) ||
    date === "" ||
    selectedTime === null;

  const selectedSlot = {
    date,
    selectedTime: formatTime(selectedTime),
  };
  console.log(selectedSlot);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a day</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((item: DayInfo) => (
          <TouchableOpacity
            key={item.day}
            style={[
              styles.dayButton,
              selectedDay === item.day && styles.selectedDay,
            ]}
            onPress={() => {
              setDate("");
              setSelectedDay(item.day);
              setDate(item.fullDate.toDateString());
            }}
          >
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.slotsText}>Slots Available</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {date && (
        <Text style={styles.dateSelected}>
          Selected Date: {format(date, "do MMMM")}
        </Text>
      )}
      <Text style={styles.subHeader}>Choose a slot for your haircut</Text>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.timeInput}
      >
        <Text>{formatTime(selectedTime)} HRS</Text>
      </TouchableOpacity>

      <Text style={styles.subHeader}>Select service provider</Text>
      <Dropdown<ProviderData>
        style={[styles.dropdown, isFocus && { borderColor: "#DB1471" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={providerData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Provider (Optional)" : "..."}
        searchPlaceholder="Search..."
        value={selectedProvider}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedProvider(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={(item) => (
          <Avatar.Image
            size={30}
            source={{ uri: "https://i.pravatar.cc/150" }}
          />
        )}
      />

      <View style={styles.calendarSelect}>
        <Text style={styles.different}>Need a different day?</Text>
        <TouchableOpacity
          onPress={() => {
            setDate("");
            setOpen(true);
          }}
          style={styles.leftSection}
        >
          <FontAwesome5 name="calendar-check" size={24} color="#007B99" />
          <Text style={styles.selectText}>SELECT DATE</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        disabled={disabledButton}
        onPress={() => router.push(`/confirm-appointment/${23}`)}
        buttonText="Book Appointment"
      />

      <PaperProvider theme={customTheme}>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismissTime}
          onConfirm={onConfirmTime}
          hours={selectedTime?.hours || 12}
          minutes={selectedTime?.minutes || 0}
          animationType="fade"
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissDate}
          date={date as CalendarDate}
          onConfirm={onConfirmDate as unknown as SingleChange}
          presentationStyle="pageSheet"
        />
      </PaperProvider>
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
  placeholderStyle: { fontSize: 16, marginLeft: 20 },
  selectedTextStyle: { fontSize: 16, marginLeft: 20 },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 16 },
  calendarSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  selectText: { color: "#007B99" },
  different: { fontSize: 14, fontWeight: "600" },
  dateSelected: { marginTop: 20 },
});

export default PickDate;
