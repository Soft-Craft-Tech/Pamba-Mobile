import React, { useRef, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.6;
const SPACING = 10;

const imageData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroTitle: "Find the best hair stylist for you",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1629397685944-7073f5589754?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroTitle: "Browse thousands of salons",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroTitle: "Get that Facial Today",
  },
];

export default function CardCarousel() {
  const flatListRef = useRef<FlatList<(typeof imageData)[0]> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
    }
  }, []);

  const renderItem = ({ item }: { item: (typeof imageData)[0] }) => (
    <TouchableOpacity onPress={() => router.push("/search")}>
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{item.heroTitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={imageData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        renderItem={renderItem}
        keyExtractor={(item) => item.heroTitle}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: (CARD_WIDTH + SPACING) * index,
          index,
        })}
        initialScrollIndex={1}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: SPACING / 2,
    marginTop: 10,
  },
  backgroundImage: {
    width: CARD_WIDTH,
    height: 140,
    marginHorizontal: SPACING / 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
