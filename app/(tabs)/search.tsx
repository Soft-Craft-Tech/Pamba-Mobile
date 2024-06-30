import ServiceCard from "@/components/Appointments/servce-card";
import ServicesSkeleton from "@/components/Appointments/services-skeleton";
import StandardView from "@/components/StandardView";
import React, { useEffect, useMemo } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Searchbar } from "react-native-paper";

const servicesData: any = [
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
    title: "Product Two",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 3,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1677098574666-8f97d913d9cd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product Three",
    ratingTime: "45 mins",
    price: "$100",
  },
  {
    service_id: 4,
    imageUri:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Product Four",
    ratingTime: "45 mins",
    price: "$100",
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    return servicesData.filter((item: { title: string }) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  const renderContent = () => {
    if (isLoading) {
      return <ServicesSkeleton />;
    }

    if (filteredData.length === 0) {
      return (
        <View style={styles.emptyContent}>
          <Text
            style={styles.emptySearch}
          >{`No Results for "${searchQuery}"`}</Text>
          <Text>Try Searching for something else</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ServiceCard {...item} />}
        keyExtractor={(item: any) => item.service_id.toString()}
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
          onSubmitEditing={() => {
            console.log("Search submitted:", searchQuery);
          }}
        />
        {renderContent()}
      </StandardView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  searchBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#DB1471",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    borderRadius: 32,
  },
  searchText: {
    color: "#fff",
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
