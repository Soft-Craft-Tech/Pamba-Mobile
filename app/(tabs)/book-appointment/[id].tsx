import StandardView from "@/components/StandardView";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";
import ServicesList from "@/components/Appointments/services-flat-list";

const BookAppointment = () => {
  const local = useLocalSearchParams<{ id: string }>();
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
          <View style={styles.contactBox}>
            <Ionicons name="call-outline" size={12} color="black" />
            <Text style={styles.contactText}>0700123456</Text>
          </View>
          <View style={styles.contactBox}>
            <EvilIcons name="location" size={16} color="black" />
            <Text style={styles.contactText}>
              Lavington area, Nairobi. Kenya
            </Text>
          </View>
          <View style={styles.contactBox}>
            <EvilIcons name="location" size={16} color="black" />
            <Link href={"https/maps/lavington/shop"}>
              <Text style={styles.locationLink}>https/maps/lavington/shop</Text>
            </Link>
          </View>
          <Text style={styles.serviceTitle}>Stylish Haircut</Text>
          <Text style={styles.durationText}>
            1 hours 15 minutes - 1 hour 40 mins
          </Text>
          <Text style={styles.amountText}>Ksh 1000</Text>
          <Text style={styles.serviceDescription}>
            Feel the thrill of a fresh start as our talented stylists bring your
            vision to life with our signature stylish haircut. We're not just
            cutting hair; we're sculpting confidence, one snip at a time.{" "}
          </Text>
          <CustomButton buttonText="Book Appointment" />
          <ServicesList title="Other Services" linkText="" />
        </View>
      </StandardView>
    </SafeAreaView>
  );
};

export default BookAppointment;

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
  durationText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#323232",
  },
  amountText: {
    fontWeight: "400",
    fontSize: 20,
    color: "#323232",
  },
  serviceDescription: {
    fontSize: 14,
    fontWeight: "400",
  },
});
