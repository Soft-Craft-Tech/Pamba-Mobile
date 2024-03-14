import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              console.log("Here");
            }}
          >
            <MaterialIcons name="menu" size={30} color="#303535" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search</Text>
          <Text style={styles.hiddenElement}>Here</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search your services or treatments"
            placeholderTextColor="#d0d0d0"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => console.log("Left password icon pressed")}
          >
            <MaterialIcons name="search" size={35} color="#d0d0d0" />
          </TouchableOpacity>
        </View>
        <Text style={styles.pageTitle}>My Appointments</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  hiddenElement: {
    opacity: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 2,
    borderColor: "#cbcbcb",
    width: "90%",
    borderRadius: 120,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    paddingLeft: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
});
