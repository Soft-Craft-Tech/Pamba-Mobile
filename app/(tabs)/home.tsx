import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const bagLogo = require("../../assets/images/bag.png");

export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.boxContainer}>
                <View style={styles.circleBox}>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={30}
                    color="#fff"
                  />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.textInBox}>Completed</Text>
                  <Text style={styles.subText}>234 Tasks</Text>
                </View>
              </View>
              <View style={styles.boxContainerTwo}>
                <View style={styles.circleBox}>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={30}
                    color="#fff"
                  />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.textInBox}>Cancelled</Text>
                  <Text style={styles.subText}>8 Tasks</Text>
                </View>
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.boxContainerTwo}>
                <View style={styles.circleBox}>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={30}
                    color="#fff"
                  />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.textInBox}>Upcoming Appointments</Text>
                  <Text style={styles.subText}>13 Tasks</Text>
                </View>
              </View>
              <View style={styles.boxContainer}>
                <View style={styles.circleBox}>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={30}
                    color="#fff"
                  />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.textInBox}>On Going</Text>
                  <Text style={styles.subText}>23 Tasks</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.appointMentHeader}>
            <Text style={styles.appointMentTitle}>Today's Appointments</Text>
            <Text style={styles.linkText}>View all</Text>
          </View>
          <View style={styles.lowerContainer}>
            {[
              { text: "Bridal Shave Weekend", deadline: "14/04/2024" },
              { text: "Appointment 2", deadline: "15/04/2024" },
              { text: "Appointment 3", deadline: "16/04/2024" },
              { text: "Appointment 4", deadline: "17/04/2024" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.optionContainer}>
                <Image source={bagLogo} />
                <View>
                  <Text style={styles.appointMentCardText}>{item.text}</Text>
                  <View style={styles.deadLine}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#959595"
                    />
                    <Text style={styles.appointMentCardDate}>
                      Deadline: {item.deadline}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
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
    marginTop: 20,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    maxWidth: "90%",
    marginTop: 10,
  },
  circleBox: {
    alignItems: "flex-end",
  },
  boxContainer: {
    backgroundColor: "#0f1c35",
    width: 156,
    height: 152,
    borderRadius: 16,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  boxContainerTwo: {
    backgroundColor: "#DB1471",
    width: 156,
    height: 115,
    borderRadius: 16,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  innerContainer: { flexDirection: "column", gap: 20 },
  textBox: {},
  textInBox: { color: "#fff", fontSize: 16, fontWeight: "500" },
  subText: { color: "#fff", fontSize: 14, fontWeight: "400" },
  appointMentTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  appointMentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  lowerContainer: {
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: 92,
    borderRadius: 10,
  },
  deadLine: { flexDirection: "row", alignItems: "center", gap: 10 },
  appointMentCardText: { fontSize: 16, fontWeight: "500" },
  appointMentCardDate: { fontSize: 14, fontWeight: "400" },
});
