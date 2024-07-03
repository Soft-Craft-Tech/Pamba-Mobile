import React from "react";
import { TextInput as PaperInput } from "react-native-paper";

export const CustomInput = ({
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
