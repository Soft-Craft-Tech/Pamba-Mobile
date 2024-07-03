import CustomButton from "@/components/Button";
import StandardView from "@/components/StandardView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { formatDate } from "@/hooks/dateUtility";

const SingleAppointment = () => {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();
  const date = "2024-05-01T08:30:00Z";
  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.salonImage}
        />
        <View style={styles.lowerContainer}>
          <Text style={styles.appointmentTitle}>Beauty square salon</Text>
          <Text style={styles.contactText}>View Shop</Text>
          <Text style={styles.serviceTitle}>Appointment</Text>
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
                <Text style={styles.cardTitle}>Basic Pedicure</Text>
                <Text style={styles.attendantName}>With Jane</Text>
                <Text style={styles.dayText}>
                  {formatDate(date).getDayNameAndTime()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <CustomButton buttonText="Cancel" width="46%" variant="outline" />
            <CustomButton
              onPress={() => {
                router.push(`/pick-date/${12}`);
              }}
              buttonText="Reschedule"
              width="46%"
            />
          </View>
        </View>
      </StandardView>
    </SafeAreaView>
  );
};

export default SingleAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
    textTransform: "capitalize",
  },
  salonImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  lowerContainer: {
    marginTop: 20,
    gap: 5,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DB1471",
  },
  contactBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  contactText: {
    fontSize: 12,
    fontWeight: "400",
  },
  locationLink: {
    fontSize: 12,
    fontWeight: "400",
    color: "#007B99",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F1C35",
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
