import React, { useRef, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import { ImageBackground } from "expo-image";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.6;
const SPACING = 10;

const data = ["violet", "indigo", "blue", "orange", "green"];

export default function CardCarousel() {
  const flatListRef = useRef<FlatList<string> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
    }
  }, []);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        renderItem={({}) => {
          return (
            <TouchableOpacity onPress={() => router.push("/search")}>
              <ImageBackground
                source={require("@/assets/images/hero-bg.png")}
                style={styles.backgroundImage}
              >
                <View style={styles.overlay}>
                  <Text style={styles.text}>
                    Find the best hair stylist for you
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: index,
          index,
        })}
        initialScrollIndex={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: 10,
    width: CARD_WIDTH,
    paddingHorizontal: SPACING / 2,
    maxHeight: 140,
  },
  overlay: {
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    height: "100%",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
