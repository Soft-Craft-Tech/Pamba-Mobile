import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface CustomButtonProps {
  loading?: boolean;
  onPress?: () => void;
  buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  onPress,
  buttonText,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DB1471",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CustomButton;
