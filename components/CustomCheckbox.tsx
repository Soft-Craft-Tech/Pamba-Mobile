import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // You may need to import this icon library if not already imported

interface Props {
  label: string;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

const CustomCheckbox: React.FC<Props> = ({
  label,
  initialValue = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialValue);

  const toggleCheckbox = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      <View style={styles.checkbox}>
        {checked && <MaterialIcons name="check" size={24} color="#000" />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default CustomCheckbox;
