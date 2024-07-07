import { useAllBusinesses } from "@/api/use-appointments";
import ShopCard from "@/components/Appointments/shop-card";
import StandardView from "@/components/StandardView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";

const AllShops = () => {
  const local = useLocalSearchParams<{ id: string }>();
  const { data } = useAllBusinesses();
  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Text style={styles.title}>{local.id}</Text>
        <FlatList
          data={data?.businesses}
          renderItem={({ item }) => <ShopCard {...item} />}
          keyExtractor={(item: any) => item?.slug?.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </StandardView>
    </SafeAreaView>
  );
};

export default AllShops;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
    textTransform: "capitalize",
  },
});
