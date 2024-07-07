import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";

export interface ShopCardProps {
  slug: string;
  profile_img: string;
  title: string;
  location: string;
  city: string;
  rating: number;
  reviews: number;
}

const ShopCard: React.FC<ShopCardProps> = ({
  slug,
  profile_img,
  title,
  location,
  city,
  rating,
  reviews,
}) => {
  return (
    <Link href={`/business-profile/${slug}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri: profile_img,
            }}
            style={styles.image}
          />
          <View style={styles.lowerSection}>
            <Text style={styles.title}>{title?.slice(0, 19)}</Text>
            <Text style={styles.location}>City: {city}</Text>
            <Text style={styles.location}>{location}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <AntDesign name="star" size={12} color="#DB1471" />
                <Text>{rating}</Text>
              </View>
              <Text style={styles.ratingText}>{reviews} reviews</Text>
            </View>
          </View>
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
    justifyContent: "space-between",
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
  location: {
    fontSize: 10,
    fontWeight: "400",
    color: "#8C8C8C",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB147114",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 40,
    gap: 10,
  },
  lowerSection: {
    gap: 10,
  },
});

export default ShopCard;
