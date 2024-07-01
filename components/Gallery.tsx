import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const imageUri =
  "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const images = [
  { id: "1", src: imageUri },
  { id: "2", src: imageUri },
  { id: "3", src: imageUri },
  { id: "4", src: imageUri },
  { id: "5", src: imageUri },
  { id: "1", src: imageUri },
  { id: "2", src: imageUri },
  { id: "3", src: imageUri },
  { id: "4", src: imageUri },
  { id: "5", src: imageUri },
];

const numColumns = 3;
const imageSize = width / numColumns;

const GalleryItem = ({ src }: any) => (
  <Image source={{ uri: src }} style={styles.image} />
);

const GalleryLayout = () => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => <GalleryItem src={item.src} />}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default GalleryLayout;
