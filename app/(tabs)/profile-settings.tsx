import CustomButton from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, TextInput as PaperInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ProfileSettings = () => {
  const [text, setText] = React.useState("");
  const [inputDate, setInputDate] = React.useState(new Date());

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Profile Settings</Text>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={{ uri: "https://i.pravatar.cc/150?img=63" }}
          />
        </View>
        <View style={styles.formContainer}>
          <CustomInput
            label="Name"
            text={text}
            onChange={() => setText(text)}
          />
          <CustomInput
            label="Email"
            text={text}
            onChange={() => setText(text)}
          />
          <View style={styles.dateInput}>
            <DatePickerInput
              locale="en"
              label="Birthdate"
              value={inputDate}
              activeOutlineColor="#DB1471"
              outlineStyle={{
                borderColor: "#D9D9D9",
              }}
              onChange={(d) => setInputDate(d as any)}
              inputMode="start"
              style={{ width: 200, marginTop: 10 }}
              mode="outlined"
            />
          </View>
          <CustomInput
            label="Phone number"
            text={text}
            onChange={() => setText(text)}
          />
          <CustomButton buttonText="Save Changes" />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  formContainer: { gap: 20 },
  dateInput: { marginTop: 30, marginBottom: 30 },
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileSettings;
