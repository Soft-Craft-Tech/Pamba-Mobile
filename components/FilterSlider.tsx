import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const caregoryName = [
  { itemName: "Massage", id: 1 },
  { itemName: "Hairdressing", id: 2 },
  { itemName: "Barber shop", id: 3 },
  { itemName: "Spa", id: 4 },
  { itemName: "Nails", id: 5 },
];

const FilterSlider = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {caregoryName.map(({ itemName, id }) => (
          <TouchableOpacity
            onPress={() => router.push(`/all-shops/${itemName}`)}
            key={id}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{itemName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  scrollView: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default FilterSlider;
