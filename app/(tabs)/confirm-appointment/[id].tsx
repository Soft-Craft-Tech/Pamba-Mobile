import { FormType } from "@/app/create-account";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TO DO STORE DATA IN URL STATE INSTEAD OF ASYNC STORAGE, THIS WAS SOME DIRTY WORK

const schema = z.object({
  gender: z.string({
    required_error: "Gender is required",
  }),
});

const ConfirmAppointment = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });
  const [selectedSlot, setSelectedSlot] = useState<{} | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  const getSelectedSlotFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("selectedSlot");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error reading value from AsyncStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSlot = async () => {
      const slot = await getSelectedSlotFromStorage();
      if (slot) {
        console.log("Retrieved slot:", slot);
        setSelectedSlot(slot);
      } else {
        console.log("No slot found in storage");
      }
    };

    fetchSlot();
  }, []);

  console.log("loaded", selectedSlot);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Additional Information</Text>
      <Text style={styles.different}>Haircut appointment</Text>
      <View style={styles.calendarSelect}>
        <View style={styles.leftSection}>
          <Feather name="calendar" size={24} color="black" />
          <Text>Fir, Mar 3</Text>
        </View>
        <View style={styles.leftSection}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text>2:00PM EAT</Text>
        </View>
      </View>
      <TextInput style={styles.input} placeholder="Notes" multiline />
      <View style={styles.genderContainer}>
        <Text>How do you want to be notified?</Text>
        <View style={styles.genderBox}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
      <CustomButton
        onPress={() => {
          router.push(`/congratulations/${23}`);
        }}
        buttonText="Book Appointment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  calendarSelect: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },

  different: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  genderContainer: {
    gap: 4,
    marginBottom: 4,
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
});

export default ConfirmAppointment;
