import CustomButton from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput as PaperInput, TextInput } from "react-native-paper";

const CustomInput = ({
  label,
  text,
  onChange,
  rightIcon,
}: {
  label: string;
  text: string;
  onChange: () => void;
  rightIcon?: React.ReactNode;
}) => {
  return (
    <PaperInput
      label={label}
      mode="outlined"
      textColor="black"
      activeOutlineColor="#DB1471"
      outlineStyle={{
        borderColor: "#D9D9D9",
      }}
      value={text}
      onChangeText={onChange}
      right={rightIcon}
    />
  );
};

const ProfileSettings = () => {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>
      <View style={styles.formContainer}>
        <CustomInput label="Name" text={text} onChange={() => setText(text)} />
        <CustomInput label="Email" text={text} onChange={() => setText(text)} />
        <CustomInput
          label="Birthday"
          text={text}
          onChange={() => setText(text)}
          rightIcon={<TextInput.Icon icon={"calendar"} color="#D9D9D9" />}
        />
        <CustomInput
          label="Phone number"
          text={text}
          onChange={() => setText(text)}
        />
        <CustomButton buttonText="Save Changes" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  formContainer: { gap: 20 },
});

export default ProfileSettings;
