import React, { useMemo, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAllBusinesses } from "@/api/use-appointments";
import BusinessListSkeleton from "@/components/Appointments/Business-Skeleton";
import ShopCard from "@/components/Appointments/shop-card";
import StandardView from "@/components/StandardView";

const AllShops = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending } = useAllBusinesses();

  const memoizedData = useMemo(() => data?.businesses, [data]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ShopCard {...item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: any) => item?.slug?.toString() || "",
    []
  );

  if (isPending) {
    return (
      <SafeAreaView>
        <BusinessListSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Text style={styles.title}>Results filtered by {id}</Text>
        <FlatList
          data={memoizedData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </StandardView>
    </SafeAreaView>
  );
};

export default React.memo(AllShops);

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
  },
});
