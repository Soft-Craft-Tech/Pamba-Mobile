import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import StandardView from "./StandardView";
import CustomButton from "./Button";
import { Avatar } from "react-native-paper";

const reviews = [
  {
    id: 1,
    name: "Gathoni",
    daysAgo: 2,
    rating: 5,
    reviewText:
      "Aliqua officia duis occaecat consectetur fugiat nostrud anim dolor commado officia proident. Voluptate nisi reprehenderit.",
    likes: 24,
  },
  {
    id: 2,
    name: "Gathoni",
    daysAgo: 2,
    rating: 5,
    reviewText:
      "Aliqua officia duis occaecat consectetur fugiat nostrud anim dolor commado officia proident. Voluptate nisi reprehenderit.",
    likes: 24,
  },
];

export default function Reviews() {
  return (
    <ScrollView style={styles.container}>
      <StandardView>
        <View style={styles.reviewContainer}>
          <View style={styles.header}>
            <View style={styles.raterCard}>
              <Text style={styles.ratingText}>4.5</Text>
              <FontAwesome name="star" size={24} color="#FF9F0A" />
            </View>
            <Text style={styles.reviewCount}>6 reviews</Text>
          </View>
          <View>
            {[5, 4, 3, 2, 1].map((stars) => (
              <View key={stars} style={styles.ratingRow}>
                <Text style={styles.starText}>{stars}</Text>
                <FontAwesome name="star" size={16} color="#FF9F0A" />
                <View
                  style={[styles.progressBarFill, { width: `${stars * 10}%` }]}
                />
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.rateText}>Rate the services offered</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index}>
                <EvilIcons name="star" size={30} color="#8C8C8C" />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.rateText}>Write a review</Text>
          <TextInput style={styles.input} placeholder="Review" multiline />
          <CustomButton buttonText="Submit" />
        </View>
        {reviews.map((review) => (
          <View key={review.id} style={styles.review}>
            <View style={styles.reviewHeader}>
              <View style={styles.headerAvatr}>
                <Avatar.Image
                  size={24}
                  source={{ uri: "https://i.pravatar.cc/150?img=27" }}
                />
                <Text style={styles.reviewerName}>{review.name}</Text>
              </View>

              <Text style={styles.daysAgo}>{review.daysAgo} Days ago</Text>
            </View>
            <View style={styles.stars}>
              {[...Array(review.rating)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={16}
                  color="#DB1471"
                />
              ))}
            </View>
            <Text style={styles.reviewText}>{review.reviewText}</Text>
            <View style={styles.reviewFooter}>
              <FontAwesome name="heart" size={16} color="#DB1471" />
              <Text style={styles.likeCount}>{review.likes} Like</Text>
              <TouchableOpacity style={styles.headerAvatr}>
                <Entypo name="reply" size={12} color="#646260" />
                <Text style={styles.replyText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </StandardView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerAvatr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  raterCard: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  reviewCount: {
    fontSize: 16,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  starText: {
    width: 16,
    textAlign: "center",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#FF9F0A",
  },
  rateText: {
    fontSize: 16,
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: "#ff1493",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
  },
  review: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  daysAgo: {
    fontSize: 12,
    color: "#aaa",
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 8,
  },
  reviewFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 8,
    marginRight: 16,
    color: "#646260",
  },
  replyText: {
    color: "#646260",
  },
});
