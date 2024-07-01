import ServiceCard from "@/components/Appointments/servce-card";
import GalleryLayout from "@/components/Gallery";
import StandardView from "@/components/StandardView";
import Reviews from "@/components/review";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { Searchbar } from "react-native-paper";

const { width } = Dimensions.get("window");

const tabs: string[] = ["About", "Review", "Gallery"];

const servicesData = [
  {
    service_id: 1,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 2,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1677098574666-8f97d913d9cd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 3,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1677098574666-8f97d913d9cd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 4,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
];

const BusinessSquareSalon: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const tabIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentTab(tabIndex);
  };

  const handleTabPress = (index: number) => {
    setCurrentTab(index);
    scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
  };

  const renderServiceCard = ({ item }: { item: (typeof servicesData)[0] }) => (
    <ServiceCard data={item as any} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.salonImage}
        />
        <Text style={styles.title}>Beauty Square Salon</Text>
        {currentTab === 0 && (
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={() => {
              console.log("Search submitted:", searchQuery);
            }}
          />
        )}
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              disabled
              style={styles.tabItem}
              onPress={() => handleTabPress(index)}
            >
              <View
                style={[
                  styles.tabText,
                  currentTab === index && styles.activeTabText,
                ]}
              >
                <Text
                  style={[
                    styles.blackText,
                    currentTab === index && styles.activeText,
                  ]}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </StandardView>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {tabs.map((tab, index) => (
          <View key={index} style={[styles.scene, { width }]}>
            {index === 0 && (
              <View>
                <StandardView>
                  <View style={styles.ratingContainer}>
                    <View style={styles.rating}>
                      <AntDesign name="star" size={12} color="#DB1471" />
                      <Text>4.9</Text>
                    </View>
                    <View />
                  </View>
                  <Text style={styles.salonName}>Beauty Square Salon</Text>
                  <Text style={styles.location}>
                    <EvilIcons name="location" size={24} color="black" />
                    Lavington area, Nairobi, Kenya
                  </Text>
                  <Text style={styles.subTitle}>Services</Text>
                </StandardView>
                <FlatList
                  data={servicesData}
                  renderItem={renderServiceCard}
                  keyExtractor={(item) => item.service_id.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
            {index === 1 && <Reviews />}
            {index === 2 && <GalleryLayout />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#DB1471",
    padding: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
    textTransform: "capitalize",
    marginTop: 5,
  },
  salonImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabText: {
    paddingHorizontal: 23,
    paddingVertical: 10,
    borderRadius: 32,
  },
  activeText: { color: "#fff", fontSize: 12 },
  blackText: { color: "#828188", fontSize: 12 },
  activeTabText: {
    paddingHorizontal: 23,
    paddingVertical: 10,
    backgroundColor: "#DB1471",
    borderRadius: 32,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "raleway",
    color: "#8C8C8C",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB147114",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 40,
  },
  salonName: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  location: {
    fontSize: 14,
    color: "gray",
    paddingHorizontal: 10,
  },
});

export default BusinessSquareSalon;
