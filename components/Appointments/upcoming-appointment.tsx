import { formatDate } from "@/hooks/dateUtility";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const appointmentsData = [
  {
    date: "2024-05-01T08:30:00Z",
    title: "Basic Pedicure",
    attendant: "Jane",
    id: 1,
  },
];

interface UpcomingAppointmentsProps {
  date: string;
  title: string;
  attendant: string;
  id: number;
}

interface AppointmentProp {
  data: UpcomingAppointmentsProps[];
  title?: boolean;
}

const UpcomingAppointments: React.FC<AppointmentProp> = ({ data, title }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.greetingsText}>Upcoming Appointments</Text>}
      {data?.map(({ date, title, attendant, id }) => (
        <View key={id} style={styles.appointmentCard}>
          <View style={styles.dateSection}>
            <View style={styles.calendarCard}>
              <Text style={styles.calendarText}>
                {formatDate(date).getDayNumber()}
              </Text>
              <Text style={styles.calendarText}>
                {formatDate(date).getMonthName()}
              </Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.attendantName}>{attendant}</Text>
              <Text style={styles.dayText}>
                {formatDate(date).getDayNameAndTime()}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  greetingsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
  },
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  calendarCard: {
    backgroundColor: "#DB1471",
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    width: 72,
    borderRadius: 10,
  },
  calendarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3F3F3F",
  },
  attendantName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#001C33",
  },
  editText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3F3F3F",
    marginRight: 20,
  },
});
