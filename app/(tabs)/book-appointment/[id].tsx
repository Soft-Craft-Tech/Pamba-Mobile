import React, { useEffect, useMemo, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import StandardView from "@/components/StandardView";
import CustomButton from "@/components/Button";
import ServiceCard from "@/components/Appointments/servce-card";
import { useSingleServiceQuery } from "@/api/use-appointments";

interface ServiceData {
  service_id: number;
  imageUri: string;
  title: string;
  ratingTime: string;
  price: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    service_id: 1,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 2,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1677098574666-8f97d913d9cd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 3,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1677098574666-8f97d913d9cd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 4,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
];

const SALON_IMAGE_URI =
  "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HeaderComponent: React.FC<{ id: string | undefined }> = ({ id }) => {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: serviceData } = useSingleServiceQuery(local?.id);
  console.log(serviceData?.service);
  return (
    <StandardView>
      <Image
        source={{ uri: serviceData?.service?.service_image }}
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
          <Text style={styles.contactText}>0700123456</Text>
        </View>
        <View style={styles.contactBox}>
          <EvilIcons name="location" size={16} color="black" />
          <Text style={styles.contactText}>Lavington area, Nairobi. Kenya</Text>
        </View>
        <View style={styles.contactBox}>
          <EvilIcons name="location" size={16} color="black" />
          <Link href={"https/maps/lavington/shop"}>
            <Text style={styles.locationLink}>https/maps/lavington/shop</Text>
          </Link>
        </View>
        <Text style={styles.serviceTitle}>Stylish Haircut</Text>
        <Text style={styles.durationText}>
          1 hour 15 minutes - 1 hour 40 mins
        </Text>
        <Text style={styles.amountText}>Ksh 1000</Text>
        <Text style={styles.serviceDescription}>
          Feel the thrill of a fresh start as our talented stylists bring your
          vision to life with our signature stylish haircut. We're not just
          cutting hair; we're sculpting confidence, one snip at a time.
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

  const renderItem = useMemo(
    () =>
      ({ item }: { item: ServiceData }) =>
        <ServiceCard data={item as any} />,
    []
  );

  const keyExtractor = (item: ServiceData) => item?.service_id?.toString();

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
        data={SERVICES_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
