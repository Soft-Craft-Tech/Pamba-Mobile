import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const NotificationsScreen = () => {
  const offers = [
    { title: "Oil Massage", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Relaxing Massage", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Refreshing Massage", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Skin Care", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Aromatherapy", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Thai Massage", description: "Lorem ipsum.Lom", price: 50 },
    { title: "Sport Massage", description: "Lorem ipsum.Lom", price: 50 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Offers</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {offers.map((offer, index) => (
          <View key={index} style={styles.offerContainer}>
            <View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
              <Text style={styles.offerPrice}>${offer.price}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDFD",
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  offerContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#DB1471",
  },
  bookButton: {
    backgroundColor: "#DB1471",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 13,
    alignSelf: "flex-end",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NotificationsScreen;
