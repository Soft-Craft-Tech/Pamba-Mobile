import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  scrollTo,
  useAnimatedRef,
  interpolateColor,
} from "react-native-reanimated";
import StandardView from "@/components/StandardView";
import { Searchbar } from "react-native-paper";
import ServiceCard from "@/components/Appointments/servce-card";

const { width } = Dimensions.get("screen");

const tabs = ["About", "Review", "Gallery"];

const services = [
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

const BeautySquareSalon: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const headerWidths = tabs.reduce((acc, _, index) => {
    acc[index] = useSharedValue(0);
    return acc;
  }, {} as { [key: number]: Animated.SharedValue<number> });

  const scrollX = useSharedValue(0);
  const bottomScrollRef = useAnimatedRef<Animated.ScrollView>();
  const activeTab = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(bottomScrollRef, activeTab.value * width, 0, true);
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const barWidthStyle = useAnimatedStyle(() => {
    const barWidth = interpolate(
      scrollX.value,
      [0, width, width * 2],
      [headerWidths[0].value, headerWidths[1].value, headerWidths[2].value]
    );
    const moveValue = interpolate(
      scrollX.value,
      [0, width, width * 2],
      [0, headerWidths[0].value, headerWidths[0].value + headerWidths[1].value]
    );
    return {
      width: barWidth,
      transform: [{ translateX: moveValue }],
    };
  });

  const getTabStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const activeColor = "pink";
      const inactiveColor = "gray";
      const color = interpolateColor(
        scrollX.value,
        [width * (index - 1), width * index, width * (index + 1)],
        [inactiveColor, activeColor, inactiveColor]
      );
      return {
        color: color,
      };
    });
  };

  const onPressTab = (index: number) => {
    activeTab.value = index;
  };

  const renderTabContent = () => {
    return (
      <Animated.ScrollView
        ref={bottomScrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>Services</Text>
          <FlatList
            data={services}
            renderItem={({ item }) => <ServiceCard data={item as any} />}
            keyExtractor={(item) => item.service_id.toString()}
            numColumns={2}
            getItemLayout={(_, index) => ({
              length: 120,
              offset: 120 * index,
              index,
            })}
          />
        </View>
        <View style={styles.tabContent}>
          <Text>Review content goes here</Text>
        </View>
        <View style={styles.tabContent}>
          <Text>Gallery content goes here</Text>
        </View>
      </Animated.ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StandardView>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.salonImage}
        />
        <Text style={styles.title}>Beauty Square Salon</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => {
            console.log("Search submitted:", searchQuery);
          }}
        />
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <AntDesign name="star" size={12} color="#DB1471" />
            <Text>4.9</Text>
          </View>
          <Text style={styles.ratingText}>104 reviews</Text>
        </View>
        <Text style={styles.salonName}>Beauty Square Salon</Text>
        <Text style={styles.location}>
          <EvilIcons name="location" size={24} color="black" />
          Lavington area, Nairobi, Kenya
        </Text>
        <View style={styles.tabContainer}>
          {tabs.map((item, index) => (
            <View
              key={item}
              style={styles.tabWrapper}
              onLayout={(e: LayoutChangeEvent) =>
                (headerWidths[index].value = e.nativeEvent.layout.width)
              }
            >
              <TouchableOpacity
                style={styles.tab}
                onPress={() => onPressTab(index)}
              >
                <Animated.Text style={[styles.tabText, getTabStyle(index)]}>
                  {item}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Animated.View style={[styles.tabIndicator, barWidthStyle]} />
        {renderTabContent()}
      </StandardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F9",
  },
  salonImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#DB1471",
    padding: 10,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabWrapper: {
    flex: 1,
  },
  tabIndicator: {
    height: 2,
    backgroundColor: "pink",
  },
  tabContent: {
    width: width,
    paddingHorizontal: 10,
  },
  tabText: {
    color: "gray",
  },
  tab: {
    padding: 10,
  },
});

export default BeautySquareSalon;
