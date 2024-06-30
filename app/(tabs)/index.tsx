import ServicesList from "@/components/Appointments/services-flat-list";
import UpcomingAppointments from "@/components/Appointments/upcoming-appointment";
import UpcomingSkeleton from "@/components/Appointments/upcoming-skeleton";
import FilterSlider from "@/components/FilterSlider";
import HeroSlider from "@/components/HeroSlider";
import StandardView from "@/components/StandardView";
import StatusBanner from "@/components/StatusBanner";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
const appointmentsData = [
  {
    date: "2024-05-01T08:30:00Z",
    title: "Basic Pedicure",
    attendant: "Jane",
    id: 1,
  },
  {
    date: "2024-07-12T18:30:00Z",
    title: "Braiding",
    attendant: "Jane",
    id: 2,
  },
];

const HomeScreen = () => {
  const [showBanner, setIsShowBanner] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Text style={styles.greetingText}>Welcome Back David</Text>
        {showBanner && (
          <StatusBanner
            onPress={() => {
              setIsShowBanner(false);
            }}
          />
        )}
      </StandardView>
      <HeroSlider />
      <FilterSlider />
      <StandardView>
        {isLoading ? (
          <UpcomingSkeleton />
        ) : (
          <UpcomingAppointments data={appointmentsData} />
        )}
        <ServicesList />
      </StandardView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  greetingText: { fontWeight: "600", fontSize: 18, color: "rgba(0, 0, 0, 1)" },
});
