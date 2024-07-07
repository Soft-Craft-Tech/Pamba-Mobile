import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useGetSingleBusiness } from "@/api/use-appointments";
import BusinessListSkeleton from "@/components/Appointments/Business-Skeleton";
import ServiceCard from "@/components/Appointments/servce-card";
import Reviews from "@/components/review";
import GalleryLayout from "@/components/Gallery";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import StandardView from "@/components/StandardView";

const { width } = Dimensions.get("window");
const tabs = ["About", "Review", "Gallery"];

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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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

const TabBar = React.memo(
  ({
    currentTab,
    onTabPress,
  }: {
    currentTab: number;
    onTabPress: (index: number) => void;
  }) => (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          style={styles.tabItem}
          onPress={() => onTabPress(index)}
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
  )
);

const BusinessSquareSalon: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: businessData, isPending } = useGetSingleBusiness(id);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const tabIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentTab(tabIndex);
    },
    []
  );

  const handleTabPress = useCallback((index: number) => {
    setCurrentTab(index);
    scrollViewRef.current?.scrollTo({ x: width * index, animated: false });
  }, []);

  const renderServiceCard = useCallback(
    ({ item }: { item: any }) => <ServiceCard data={item} />,
    []
  );

  const memoizedServiceList = useMemo(
    () => (
      <FlatList
        data={businessData?.services}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    ),
    [businessData?.services, renderServiceCard]
  );

  if (isPending) {
    return (
      <SafeAreaView>
        <BusinessListSkeleton />
      </SafeAreaView>
    );
  }

  console.log(businessData.business);

  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Image
          source={{
            uri: businessData.business?.imageUrl,
          }}
          style={styles.salonImage}
        />
        <Text style={styles.title}>{businessData.business?.name}</Text>
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
        <TabBar currentTab={currentTab} onTabPress={handleTabPress} />
      </StandardView>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {tabs.map((_, index) => (
          <View key={index} style={[styles.scene, { width }]}>
            {index === 0 && (
              <View>
                <View style={styles.ratingContainer}>
                  <View style={styles.rating}>
                    <AntDesign name="star" size={12} color="#DB1471" />
                    <Text> {businessData.business?.rating}</Text>
                  </View>
                </View>
                <Text style={styles.salonName}>
                  {businessData.business?.city}
                </Text>
                <Text style={styles.location}>
                  <EvilIcons name="location" size={24} color="black" />
                  {businessData.business?.location}
                </Text>
                <Text style={styles.subTitle}>Services</Text>
                {memoizedServiceList}
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

export default React.memo(BusinessSquareSalon);
