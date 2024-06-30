import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const categories = ["Massage", "Hairdressing", "Barber shop", "Spa", "Nails"];

const FilterSlider = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/all-shops/${category}`)}
            key={index}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{category}</Text>
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
