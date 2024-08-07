import React from "react";
import { View } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";

export const CustomInput = ({
  label,
  text,
  onChange,
  rightIcon = <View />,
}: {
  label: string;
  text: string;
  onChange: (text: string) => void;
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
      onChangeText={(newText) => onChange(newText)}
      right={rightIcon}
    />
  );
};
