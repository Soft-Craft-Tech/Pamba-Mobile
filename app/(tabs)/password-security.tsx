import CustomButton from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

const PasswordAndSecurity = () => {
  const [text, setText] = React.useState("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password and Security</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Current Password"
          text={text}
          onChange={() => setText(text)}
          rightIcon={<TextInput.Icon icon={"eye"} color="#D9D9D9" />}
        />
        <CustomInput
          label="New Password"
          text={text}
          onChange={() => setText(text)}
          rightIcon={<TextInput.Icon icon={"eye"} color="#D9D9D9" />}
        />
        <CustomInput
          label="Confirm Password"
          text={text}
          onChange={() => setText(text)}
          rightIcon={<TextInput.Icon icon={"eye"} color="#D9D9D9" />}
        />
        <CustomButton buttonText="Save Changes" />
        <TouchableOpacity
          onPress={() => {
            router.replace("/");
          }}
        >
          <Text>Deactivate account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  formContainer: { gap: 20 },
});

export default PasswordAndSecurity;
