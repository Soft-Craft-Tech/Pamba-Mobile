import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "@/components/Themed";
import { useColorScheme } from "./useColorScheme.web";

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
  const colorScheme = useColorScheme();

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
        {checked && (
          <MaterialIcons
            name="check"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#000000"}
          />
        )}
      </View>
      <Text style={styles.labelText}>{label}</Text>
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
  labelText: {
    maxWidth: 280,
  },
});

export default CustomCheckbox;
