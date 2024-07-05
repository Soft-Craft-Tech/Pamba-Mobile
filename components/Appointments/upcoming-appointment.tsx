import { formatDate } from "@/hooks/dateUtility";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UpcomingSkeleton from "./upcoming-skeleton";
import { Appointment } from "@/api/query-types";

interface AppointmentProp {
  data: Appointment[];
  title?: boolean;
  isLoading?: boolean;
}

const UpcomingAppointments: React.FC<AppointmentProp> = ({
  data,
  title,
  isLoading,
}) => {
  const router = useRouter();

  if (isLoading) {
    return <UpcomingSkeleton />;
  }
  return (
    <View style={styles.container}>
      {title && <Text style={styles.greetingsText}>Upcoming Appointments</Text>}
      {data?.map(({ date, name, id }) => (
        <TouchableOpacity
          key={id}
          onPress={() => {
            router.replace(`/appointments/${id}`);
          }}
        >
          <View style={styles.appointmentCard}>
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
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.attendantName}>John Doe</Text>
                <Text style={styles.dayText}>
                  {formatDate(date).getDayNameAndTime()}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
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
