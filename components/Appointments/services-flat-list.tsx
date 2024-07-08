import { Link } from "expo-router";
import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import ServiceCard from "./servce-card";
import StandardView from "../StandardView";
import StatusBanner from "../StatusBanner";
import HeroSlider from "../HeroSlider";
import FilterSlider from "../FilterSlider";
import UpcomingAppointments from "./upcoming-appointment";
import {
  useGetAllAppointments,
  useGetAllServices,
} from "@/api/use-appointments";

interface ServiceListProps {
  title?: string;
  linkText?: string;
}

const ServicesList: React.FC<ServiceListProps> = ({
  title = "Services",
  linkText = "See All",
}) => {
  const [showBanner, setShowBanner] = useState(true);

  const { data: servicesData } = useGetAllServices();

  const { data: appointmentsData, isPending } = useGetAllAppointments();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <StandardView>
        <Text style={styles.greetingText}>Welcome Back David</Text>
        {showBanner && (
          <StatusBanner
            onPress={() => setShowBanner(false)}
            isLoading={isPending}
          />
        )}
      </StandardView>
      <HeroSlider />
      <FilterSlider />
      <StandardView>
        <UpcomingAppointments
          data={appointmentsData?.upcoming.slice(0, 2)}
          title
          isLoading={isPending}
        />
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
        initialNumToRender={6}
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
