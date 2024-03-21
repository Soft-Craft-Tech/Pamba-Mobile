import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CancelButtonProps {
  onPress: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.CancelButtonContainer}>
      <Pressable style={styles.CancelButton} onPress={onPress}>
        <MaterialIcons name="cancel" size={38} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  CancelButtonContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 23,
  },
  CancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#db1471",
  },
});

export default CancelButton;
