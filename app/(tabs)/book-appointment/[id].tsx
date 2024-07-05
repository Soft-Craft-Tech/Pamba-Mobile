import React, { useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import StandardView from "@/components/StandardView";
import CustomButton from "@/components/Button";
import ServiceCard from "@/components/Appointments/servce-card";
import {
  useServicesQuery,
  useSingleServiceQuery,
} from "@/api/use-appointments";
import SingleViewSkeleton from "@/components/Appointments/single-view-skeleton";

const SALON_IMAGE_URI =
  "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HeaderComponent: React.FC<{ id: string | undefined }> = ({ id }) => {
  const router = useRouter();
  const { data: serviceData, isPending } = useSingleServiceQuery(id);
  console.log(serviceData);
  if (isPending) {
    return (
      <StandardView>
        <SingleViewSkeleton />
      </StandardView>
    );
  }
  return (
    <StandardView>
      <Image
        source={{
          uri:
            serviceData?.service?.service_image === ""
              ? SALON_IMAGE_URI
              : serviceData?.service?.service_image,
        }}
        style={styles.salonImage}
        accessible={true}
        accessibilityLabel="Salon image"
      />
      <View style={styles.lowerContainer}>
        <Text style={styles.appointmentTitle}>
          {serviceData?.service?.business_name}
        </Text>
        <View style={styles.contactBox}>
          <Ionicons name="call-outline" size={12} color="black" />
          <Text
            style={styles.contactText}
            onPress={() =>
              Linking.openURL(`tel:${serviceData?.service?.phone}`)
            }
          >
            {serviceData?.service?.phone}
          </Text>
        </View>
        <View style={styles.contactBox}>
          <EvilIcons name="location" size={16} color="black" />
          <Text style={styles.contactText}>
            {serviceData?.service?.location}
          </Text>
        </View>
        <View style={styles.contactBox}>
          <EvilIcons name="location" size={16} color="black" />
          <Link href={serviceData?.service?.directions}>
            <Text style={styles.locationLink}>
              {serviceData?.service?.directions.slice(0, 50) + "..."}
            </Text>
          </Link>
        </View>
        <Text style={styles.serviceTitle}>{serviceData?.service?.service}</Text>
        <Text style={styles.serviceTitle}></Text>
        <Text style={styles.durationText}>
          Duration: {serviceData?.service?.estimated_time_string}
        </Text>
        <Text style={styles.amountText}>KES {serviceData?.service?.price}</Text>
        <Text style={styles.serviceDescription}>
          Description: {serviceData?.service?.description}
        </Text>
        <CustomButton
          onPress={() => {
            router.push(`/pick-date/${id}`);
          }}
          buttonText="Book Appointment"
        />
        <Text style={styles.leftTitle}>Other Services</Text>
      </View>
    </StandardView>
  );
};

const BookAppointment: React.FC = () => {
  const local = useLocalSearchParams<{ id: string }>();
  const flatListRef = useRef<FlatList>(null);

  const { data: servicesData } = useServicesQuery();

  const renderServiceCard = useMemo(
    () =>
      ({ item }: { item: any }) =>
        <ServiceCard data={item.serviceInfo} />,
    []
  );

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [local.id]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<HeaderComponent id={local?.id} />}
        ref={flatListRef}
        data={servicesData?.services}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item?.serviceInfo.id?.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

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
  leftTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F3F3F",
  },
});

export default BookAppointment;
