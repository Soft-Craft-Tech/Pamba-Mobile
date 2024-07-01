import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Searchbar } from "react-native-paper";

import ServiceCard from "@/components/Appointments/servce-card";
import ServicesSkeleton from "@/components/Appointments/services-skeleton";
import StandardView from "@/components/StandardView";

interface Service {
  service_id: number;
  imageUri: string;
  title: string;
  ratingTime: string;
  price: string;
}

const servicesData: Service[] = [
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
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product One",
    ratingTime: "45 mins",
    price: "$100",
  },
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(
    () =>
      servicesData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const handleSearchSubmit = useCallback(() => {
    console.log("Search submitted:", searchQuery);
  }, [searchQuery]);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => <ServiceCard data={item as any} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Service) => item.service_id.toString(),
    []
  );

  const renderContent = () => {
    if (isLoading) return <ServicesSkeleton />;

    if (filteredData.length === 0) {
      return (
        <View style={styles.emptyContent}>
          <Text style={styles.emptySearch}>No Results for "{searchQuery}"</Text>
          <Text>Try Searching for something else</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearchSubmit}
        />
        {renderContent()}
      </StandardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  emptyContent: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  emptySearch: {
    fontSize: 18,
  },
});

export default SearchScreen;
