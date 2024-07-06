import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Searchbar } from "react-native-paper";

import ServiceCard from "@/components/Appointments/servce-card";
import ServicesSkeleton from "@/components/Appointments/services-skeleton";
import StandardView from "@/components/StandardView";
import { useGetAllServices } from "@/api/use-appointments";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: servicesData, isPending } = useGetAllServices();

  const filteredData = useMemo(() => {
    if (!servicesData?.services || searchQuery.trim() === "") {
      return servicesData?.services;
    }
    return servicesData?.services?.filter((service: any) =>
      service?.serviceInfo?.service
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
    );
  }, [servicesData?.services, searchQuery]);

  const handleSearchSubmit = useCallback(() => {
    console.log("Search submitted:", searchQuery);
  }, [searchQuery]);

  const renderServiceCard = useMemo(
    () =>
      ({ item }: { item: any }) =>
        <ServiceCard data={item?.serviceInfo} />,
    []
  );

  const renderContent = () => {
    if (isPending) return <ServicesSkeleton />;

    if (filteredData?.length === 0) {
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
        renderItem={renderServiceCard}
        keyExtractor={(item) => item?.serviceInfo.id?.toString()}
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
