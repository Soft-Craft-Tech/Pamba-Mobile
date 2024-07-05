import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { ServiceInfo } from "@/api/query-types";

export interface ServiceCardProps {
  data: ServiceInfo;
}

const MAX_TITLE_LENGTH = 19;

const ServiceCard: React.FC<ServiceCardProps> = ({ data }) => {
  const truncatedTitle =
    data?.service?.length > MAX_TITLE_LENGTH
      ? `${data?.service?.slice(0, MAX_TITLE_LENGTH)}...`
      : data?.service;

  return (
    <Link href={`/book-appointment/${data?.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri:
                data?.service_image === ""
                  ? "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : data?.service_image,
            }}
            style={styles.image}
            contentFit="cover"
          />
          <Text style={styles.title} numberOfLines={1}>
            {truncatedTitle}
          </Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="clockcircleo" size={14} color="#8C8C8C" />
            <Text style={styles.ratingText}>
              {data?.estimated_service_time} HRS
            </Text>
          </View>
          <Text style={styles.price}>KES {data?.price}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 96,
    width: "100%",
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#3F3F3F",
  },
  price: {
    fontSize: 14,
    color: "#3F3F3F",
    fontWeight: "700",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "raleway",
    color: "#8C8C8C",
  },
});

export default ServiceCard;
