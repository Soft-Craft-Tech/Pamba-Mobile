import { useGetAllServiceCategories } from "@/api/use-appointments";
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
  const { data } = useGetAllServiceCategories();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data?.categories?.map(
          ({ category, id }: { category: string; id: number }) => (
            <TouchableOpacity
              onPress={() => router.push(`/all-shops/${category}`)}
              key={id}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          )
        )}
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
