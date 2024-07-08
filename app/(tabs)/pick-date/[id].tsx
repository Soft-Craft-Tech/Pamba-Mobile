import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Avatar, PaperProvider } from "react-native-paper";
import CustomButton from "@/components/Button";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { useLocalSearchParams, useRouter } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import { format } from "date-fns";
import {
  CalendarDate,
  SingleChange,
} from "react-native-paper-dates/lib/typescript/Date/Calendar";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { useBookAppointment } from "@/api/use-appointments";

const schema = z.object({
  gender: z.string({
    required_error: "Gender is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

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

type PickDateState = {
  selectedDay: string;
  selectedProvider: string;
  isFocus: boolean;
  date: string;
  open: boolean;
  selectedTime: any | null;
  visible: boolean;
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

export type FormType = z.infer<typeof schema>;

const PickDate: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });
  const {
    mutate: bookAppointment,
    isPending,
    isSuccess,
  } = useBookAppointment();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log("service id", id);

  console.log("Type of this", typeof parseFloat(id as string));
  const [state, setState] = useState<PickDateState>({
    selectedDay: "",
    selectedProvider: "",
    isFocus: false,
    date: "",
    open: false,
    selectedTime: null,
    visible: false,
  });

  const days: DayInfo[] = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + index);
      const day = currentDate.toLocaleString("en-US", { weekday: "short" });
      const date = currentDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
      });
      return { day, date, fullDate: currentDate };
    });
  }, []);

  const onDismissTime = useCallback(
    () => setState((prev) => ({ ...prev, visible: false })),
    []
  );

  const onConfirmTime = useCallback(({ hours, minutes }: TimeObj) => {
    setState((prev) => ({
      ...prev,
      visible: false,
      selectedTime: { hours, minutes },
    }));
  }, []);

  const onDismissDate = useCallback(
    () => setState((prev) => ({ ...prev, open: false })),
    []
  );

  const onConfirmDate = useCallback(({ date }: { date: CalendarDate }) => {
    setState((prev) => ({
      ...prev,
      open: false,
      date: date?.toDateString() || "",
    }));
  }, []);

  const formatTime = useCallback((time: TimeObj | null): string => {
    if (!time) return "Select Time";
    const { hours, minutes } = time;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }, []);

  const disabledButton = !state.date || !state.selectedTime;

  const selectedSlot = useMemo(
    () => ({
      // date: format(new Date(selectedDate), "dd-MM-yyyy"),
      date: "07-09-2024",
      time: formatTime(state?.selectedTime),
      provider: state?.selectedProvider,
      service: parseFloat(id as string),
    }),
    [state.date, state?.selectedTime, state.selectedProvider, id, formatTime]
  );

  const onSubmit = (data: any) => {
    const transformedData = {
      ...data,
      ...selectedSlot,
    };
    console.log("transformedData", transformedData);
    bookAppointment({ ...transformedData });
  };

  const renderDayButton: ListRenderItem<DayInfo> = useCallback(
    ({ item }) => (
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
    ),
    [state.selectedDay]
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
      <Text style={styles.subHeader}>Select service provider</Text>
      <Dropdown<ProviderData>
        style={[styles.dropdown, state.isFocus && { borderColor: "#DB1471" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={providerData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!state.isFocus ? "Select Provider (Optional)" : "..."}
        searchPlaceholder="Search..."
        value={state.selectedProvider}
        onFocus={() => setState((prev) => ({ ...prev, isFocus: true }))}
        onBlur={() => setState((prev) => ({ ...prev, isFocus: false }))}
        onChange={(item) => {
          setState((prev) => ({
            ...prev,
            selectedProvider: item.value,
            isFocus: false,
          }));
        }}
        renderLeftIcon={() => (
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
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={state.open}
          onDismiss={onDismissDate}
          date={state.date ? new Date(state.date) : undefined}
          onConfirm={onConfirmDate as unknown as SingleChange}
          presentationStyle="pageSheet"
        />
      </PaperProvider>
      {!disabledButton && (
        <View>
          <Text style={styles.header}>Additional Information</Text>
          <Text style={styles.different}>Haircut appointment</Text>
          <View style={styles.calendarSelect}>
            <View style={styles.leftSection}>
              <Feather name="calendar" size={24} color="black" />
              {/* <Text> {format(new Date(state.date), "iii, MMMM d")}</Text> */}
            </View>
            <View style={styles.leftSection}>
              <AntDesign name="clockcircleo" size={24} color="black" />
              <Text>{formatTime(state.selectedTime)} HRS</Text>
            </View>
          </View>
          <Controller
            name="comment"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Notes"
                  multiline
                />
                {errors.comment && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
          />

          <View style={styles.genderContainer}>
            <Text>How do you want to be notified?</Text>
            <View style={styles.genderBox}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <View style={styles.radioContainer}>
                      <TouchableOpacity onPress={() => onChange("male")}>
                        <View
                          style={
                            value === "male"
                              ? styles.activeRadio
                              : styles.radioButton
                          }
                        />
                      </TouchableOpacity>
                      <Text>Sms</Text>
                    </View>
                    <View style={styles.radioContainer}>
                      <TouchableOpacity onPress={() => onChange("female")}>
                        <View
                          style={
                            value === "female"
                              ? styles.activeRadio
                              : styles.radioButton
                          }
                        />
                      </TouchableOpacity>
                      <Text>Whatsapp</Text>
                    </View>
                  </>
                )}
              />
            </View>
          </View>
        </View>
      )}

      <CustomButton
        disabled={disabledButton}
        onPress={handleSubmit(onSubmit)}
        buttonText="Book Appointment"
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
    marginTop: -10,
  },
});

export default React.memo(PickDate);
