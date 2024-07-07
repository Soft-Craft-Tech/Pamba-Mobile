import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";

interface CustomButtonProps {
  loading?: boolean;
  onPress?: () => void;
  buttonText: string;
  variant?: "filled" | "outline";
  width?: DimensionValue;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  onPress,
  buttonText,
  variant = "filled",
  width,
  disabled = false,
}) => {
  const buttonStyle: ViewStyle = {
    ...styles.button,
    ...(variant === "outline" ? styles.outlineButton : styles.filledButton),
    ...(width ? { width } : {}),
    ...(disabled ? styles.disabledButton : {}),
  };

  const textStyle: TextStyle = {
    ...styles.buttonText,
    ...(variant === "outline"
      ? styles.outlineButtonText
      : styles.filledButtonText),
    ...(disabled ? styles.disabledButtonText : {}),
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#DB1471" : "#fff"} />
      ) : (
        <Text style={textStyle}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filledButton: {
    backgroundColor: "#DB1471",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#DB1471",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  filledButtonText: {
    color: "#fff",
  },
  outlineButtonText: {
    color: "#DB1471",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.5,
  },
});

export default CustomButton;
