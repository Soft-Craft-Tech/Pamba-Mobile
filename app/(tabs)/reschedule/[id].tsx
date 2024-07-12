import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import CustomButton from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { useLocalSearchParams, useRouter } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import { format } from "date-fns";
import {
  CalendarDate,
  SingleChange,
} from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { useRescheduleAppointment } from "@/api/use-appointments";
import { showNotification } from "@/hooks/toastNotication";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

type RescheduleState = {
  selectedDay: string;
  selectedProvider: string;
  isFocus: boolean;
  date: string;
  open: boolean;
  selectedTime: any | null;
  visible: boolean;
};

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

const Reschedule: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleSubmit } = useForm();

  const { mutate: bookAppointment, isPending } = useRescheduleAppointment(id, {
    onSuccess: (data) => {
      showNotification("Success", data?.message);
      queryClient.invalidateQueries({
        queryKey: ["/appointments/my-appointments"],
      });
      router.push("/congratulations/123");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error?.response) {
        showNotification("Error", error?.response?.data?.message);
      } else {
        showNotification("Error", "An unexpected error occurred");
      }
    },
  });

  const [state, setState] = useState<RescheduleState>({
    selectedDay: "",
    selectedProvider: "",
    isFocus: false,
    date: "",
    open: false,
    selectedTime: null,
    visible: false,
  });

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

  const onDismissTime = () => setState((prev) => ({ ...prev, visible: false }));

  const onConfirmTime = ({ hours, minutes }: TimeObj) => {
    setState((prev) => ({
      ...prev,
      visible: false,
      selectedTime: { hours, minutes },
    }));
  };

  const onDismissDate = () => setState((prev) => ({ ...prev, open: false }));

  const onConfirmDate = ({ date }: { date: CalendarDate }) => {
    setState((prev) => ({
      ...prev,
      open: false,
      date: date?.toDateString() || "",
    }));
  };

  const formatTime = (time: TimeObj | null): string => {
    if (!time) return "Select Time";
    const { hours, minutes } = time;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const disabledButton = !state.date || !state.selectedTime;

  const selectedSlot = {
    date: format(new Date(state?.date || Date.now()), "dd-MM-yyyy"),
    time: formatTime(state?.selectedTime),
    appointment_id: parseFloat(id as string),
  };

  const onSubmit = () => {
    const transformedData = {
      ...selectedSlot,
    };
    bookAppointment({ ...transformedData });
  };

  const renderDayButton: ListRenderItem<DayInfo> = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dayButton,
        state.selectedDay === item.day && styles.selectedDay,
      ]}
      onPress={() => {
        setState((prev) => ({
          ...prev,
          selectedDay: item.day,
          date: item.fullDate.toDateString(),
        }));
      }}
    >
      <Text style={styles.dayText}>{item.day}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.slotsText}>Slots Available</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select a day</Text>
      <FlatList
        data={days}
        renderItem={renderDayButton}
        keyExtractor={(item) => item.day}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.subHeader}>Choose a slot for your haircut</Text>
      <TouchableOpacity
        onPress={() => setState((prev) => ({ ...prev, visible: true }))}
        style={styles.timeInput}
      >
        <Text>{formatTime(state.selectedTime)} HRS</Text>
      </TouchableOpacity>
      <View style={styles.calendarSelect}>
        <Text style={styles.different}>Need a different day?</Text>
        <TouchableOpacity
          onPress={() => {
            setState((prev) => ({ ...prev, date: "", open: true }));
          }}
          style={styles.leftSection}
        >
          <FontAwesome5 name="calendar-check" size={24} color="#007B99" />
          <Text style={styles.selectText}>SELECT DATE</Text>
        </TouchableOpacity>
      </View>
      <PaperProvider theme={customTheme}>
        <TimePickerModal
          visible={state.visible}
          onDismiss={onDismissTime}
          onConfirm={onConfirmTime}
          hours={state.selectedTime?.hours || 12}
          minutes={state.selectedTime?.minutes || 0}
          animationType="fade"
          use24HourClock={true}
          defaultInputType="keyboard"
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={state.open}
          onDismiss={onDismissDate}
          date={state.date ? new Date(state.date) : undefined}
          onConfirm={onConfirmDate as unknown as SingleChange}
          presentationStyle="pageSheet"
          // minimumDate={new Date(2020, 0, 1)}
          // maximumDate={new Date(2022, 10, 20)}
        />
      </PaperProvider>

      <CustomButton
        disabled={disabledButton}
        onPress={handleSubmit(onSubmit)}
        buttonText="Reschedule Appointment"
        loading={isPending}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9" },
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
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 60,
  },
  genderContainer: {
    gap: 4,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "rgba(140, 140, 140, 1)",
    borderRadius: 50,
  },
  activeRadio: {
    height: 20,
    width: 20,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "#007B99",
  },
  genderBox: {
    flexDirection: "row",
    gap: 5,
  },
  errorMessage: {
    color: "red",
    fontSize: 8,
    marginTop: 10,
  },
});
export default Reschedule;
