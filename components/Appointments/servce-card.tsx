import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";

export interface ServiceCardProps {
  service_id: string;
  imageUri: string;
  title: string;
  ratingTime: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service_id,
  imageUri,
  title,
  ratingTime,
  price,
}) => {
  return (
    <Link href={`/feed/${service_id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{title?.slice(0, 19)}</Text>

          <View style={styles.ratingContainer}>
            <AntDesign name="clockcircleo" size={14} color="#8C8C8C" />
            <Text style={styles.ratingText}>{ratingTime}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 8,
    height: 190,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  image: {
    height: 96,
    width: "100%",
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
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "raleway",
    color: "#8C8C8C",
  },
  reviewsText: {
    fontSize: 12,
    color: "#808080",
    marginLeft: 4,
  },
});

export default ServiceCard;
