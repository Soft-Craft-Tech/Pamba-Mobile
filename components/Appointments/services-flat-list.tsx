import { Link } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import ServiceCard from "./servce-card";
import StandardView from "../StandardView";
import StatusBanner from "../StatusBanner";
import HeroSlider from "../HeroSlider";
import FilterSlider from "../FilterSlider";
import UpcomingAppointments from "./upcoming-appointment";
import { useAllAppointments, useServicesQuery } from "@/api/use-appointments";
import { getItem } from "expo-secure-store";

interface ServiceListProps {
  title?: string;
  linkText?: string;
}

const ServicesList: React.FC<ServiceListProps> = ({
  title = "Services",
  linkText = "See All",
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { data: servicesData } = useServicesQuery();

  const { data: appointmentsData } = useAllAppointments();
  console.log("Appointments Data", appointmentsData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <StandardView>
        <Text style={styles.greetingText}>Welcome Back David</Text>
        {showBanner && (
          <StatusBanner
            onPress={() => setShowBanner(false)}
            isLoading={isLoading}
          />
        )}
      </StandardView>
      <HeroSlider />
      <FilterSlider />
      <StandardView>
        <UpcomingAppointments data={[]} title isLoading={isLoading} />
        <View style={styles.titleContainer}>
          <Text style={styles.leftTitle}>{title}</Text>
          <Link href="/search">
            <Text style={styles.leftTitle}>{linkText}</Text>
          </Link>
        </View>
      </StandardView>
    </View>
  );

  const renderServiceCard = useMemo(
    () =>
      ({ item }: { item: any }) =>
        <ServiceCard data={item.serviceInfo} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={servicesData?.services}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item?.serviceInfo.id?.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 0,
  },
  greetingText: {
    fontWeight: "600",
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F3F3F",
  },
});

export default ServicesList;
