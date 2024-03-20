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
import ViewShops from "@/components/Shops";

const bagLogo = require("../../assets/images/bag.png");
const connectSpa = require("../../assets/images/connectSpa.png");
const spa3 = require("../../assets/images/spa3.png");
const spa4 = require("../../assets/images/spa4.png");
const spa5 = require("../../assets/images/spa5.png");

const salon = require("../../assets/images/salon.png");
const salon1 = require("../../assets/images/salon2.png");
const salon2 = require("../../assets/images/salon3.png");
const salon3 = require("../../assets/images/salon4.png");

const barber = require("../../assets/images/barber.png");
const barber1 = require("../../assets/images/barber1.png");
const barber2 = require("../../assets/images/barber2.png");
const barber3 = require("../../assets/images/barber3.png");

interface InitialsAvatarProps {
  name: string;
  size: number;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size }) => {
  const initials = name
    .split(" ")
    .map((part: string) => part.charAt(0).toUpperCase())
    .join("");
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};

const spaData = [
  { imageSrc: connectSpa, subTitle: "Connect Spa", bgColor: "#DB1471" },
  { imageSrc: spa3, subTitle: "Flexi Spa", bgColor: "#0F1C35" },
  { imageSrc: spa4, subTitle: "Spa & Relax", bgColor: "#DB1471" },
  { imageSrc: spa5, subTitle: "Gogo Spa", bgColor: "#0F1C35" },
];
const salonData = [
  { imageSrc: salon, subTitle: "Gurl Salon", bgColor: "#DB1471" },
  { imageSrc: salon1, subTitle: "Relax salon", bgColor: "#0F1C35" },
  { imageSrc: salon2, subTitle: "Halton senior", bgColor: "#DB1471" },
  { imageSrc: salon3, subTitle: "Pham salon", bgColor: "#0F1C35" },
];
const barberData = [
  { imageSrc: barber, subTitle: "Barbershop", bgColor: "#DB1471" },
  { imageSrc: barber1, subTitle: "Flex barber", bgColor: "#0F1C35" },
  { imageSrc: barber2, subTitle: "Halma barber", bgColor: "#DB1471" },
  { imageSrc: barber3, subTitle: "BarberKIng", bgColor: "#0F1C35" },
];

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, marginTop: 36, alignItems: "center" }}>
      <View
        style={{
          flex: 0.18,
        }}
      >
        <View style={styles.header}>
          <View style={styles.greetingsContainer}>
            <InitialsAvatar name="John Doe" size={40} />
            <View>
              <Text>Welcome back</Text>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Diana Mugo
              </Text>
            </View>
          </View>
          <MaterialIcons name="notifications-none" size={30} color="#DB1471" />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Search
        </Text>
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
      </View>
      <View style={{ flex: 0.82, padding: 16, marginTop: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewShops title="Top SPAs" items={spaData} />
          <ViewShops title="Top Salons" items={salonData} />
          <ViewShops title="Top Barbershops" items={barberData} />
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
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => {}}
              >
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
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
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
  avatarContainer: {
    backgroundColor: "#0f1c35",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  greetingsContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
});
