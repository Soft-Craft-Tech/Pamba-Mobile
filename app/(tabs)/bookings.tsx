import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

const salon = require("../../assets/images/salon.png");
const salon1 = require("../../assets/images/salon2.png");
const salon2 = require("../../assets/images/salon3.png");
const salon3 = require("../../assets/images/salon4.png");

const timeSlots: string[] = [
  "06:00 am",
  "07:00 am",
  "08:00 am",
  "09:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "01:00 pm",
  "02:00 pm",
  "03:00 pm",
  "04:00 pm",
  "05:00 pm",
  "06:00 pm",
  "07:00 pm",
  "08:00 pm",
  "09:00 pm",
  "10:00 pm",
  "11:00 pm",
];

interface Service {
  id: number;
  name: string;
  icon: ImageSourcePropType;
}

const services: Service[] = [
  { id: 1, name: "Trim", icon: salon },
  { id: 2, name: "Styling", icon: salon1 },
  { id: 3, name: "Hairdrty", icon: salon2 },
  { id: 4, name: "Shamp", icon: salon3 },
];

const categories: string[] = ["Care", "Pedicure", "Straig", "Make"];

const getCurrentMonthAndYear = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return `${months[monthIndex]}, ${year}`;
};

const getDaysOfWeek = () => {
  const today = new Date();
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    weekDays.push({ day: dayName, date: ` ${dayNumber}` });
  }

  return weekDays;
};

export default function TabThreeScreen() {
  const [selectedTime, setSelectedTime] = React.useState<string>("11:00 am");
  const [selectedService, setSelectedService] = React.useState<any>(
    services[1]
  );

  const renderTimeSlot = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        item === selectedTime && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(item)}
    >
      <Text style={styles.timeSlotText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[
        styles.serviceIcon,
        item.id === selectedService.id && styles.selectedServiceIcon,
      ]}
      onPress={() => setSelectedService(item)}
    >
      <Image source={item.icon} style={styles.icon} />
    </TouchableOpacity>
  );
  const renderWeekDay = ({ item }: { item: { day: string; date: string } }) => {
    const currentDate = new Date().getDate();
    const itemDate = parseInt(item.date.trim());

    return (
      <View style={styles.weekDayContainer}>
        <Text
          style={[
            styles.weekDayText,
            itemDate === currentDate && styles.currentDayText,
          ]}
        >
          {item.day}
        </Text>
        <View
          style={[
            styles.weekDateContainer,
            itemDate === currentDate && styles.currentDateContainer,
          ]}
        >
          <Text
            style={
              (styles.weekDateText,
              itemDate === currentDate && styles.currentDayDate)
            }
          >
            {item.date}
          </Text>
        </View>
      </View>
    );
  };
  const weekDays = getDaysOfWeek();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Appointment</Text>
        <Text></Text>
      </View>
      <Text style={styles.monthText}>{getCurrentMonthAndYear()}</Text>
      <View style={styles.weekContainer}>
        <FlatList
          data={weekDays}
          renderItem={renderWeekDay}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={styles.heading}>Choose Appropriate Time</Text>
      <FlatList
        data={timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item}
        numColumns={3}
      />
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Text key={category} style={styles.category}>
            {category}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  monthText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  timeSlot: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: "#F5F5F5",
  },
  selectedTimeSlot: {
    backgroundColor: "#FF69B4",
  },
  timeSlotText: {
    fontSize: 16,
    color: "#333",
  },
  serviceIcon: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#F5F5F5",
  },
  weekContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  weekDateContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    width: 33,
    height: 33,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weekDateText: {
    fontSize: 14,
  },
  currentDayText: {
    color: "#E41A4C",
  },
  currentDayDate: { color: "#fff" },
  currentDateContainer: {
    backgroundColor: "#E41A4C",
  },
  weekDayContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 4,
  },
  weekDayText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  selectedServiceIcon: {
    backgroundColor: "#FF69B4",
  },
  icon: {
    width: 24,
    height: 24,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  category: {
    fontSize: 16,
    color: "#FF69B4",
  },
  bookButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
