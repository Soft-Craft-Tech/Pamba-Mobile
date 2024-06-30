import { Link } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import ServiceCard from "./servce-card";
import ServicesSkeleton from "./services-skeleton";

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

interface ServiceListProps {
  title?: string;
  linkText?: string;
}

const ServicesList: React.FC<ServiceListProps> = ({
  title = "Services",
  linkText = "See All",
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.leftTitle}>{title}</Text>
        <Link href="/search">
          <Text style={styles.leftTitle}>{linkText}</Text>
        </Link>
      </View>
      {isLoading ? (
        <ServicesSkeleton />
      ) : (
        <FlatList
          data={servicesData}
          renderItem={({ item }) => <ServiceCard {...item} />}
          keyExtractor={(item: any) => item.service_id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ServicesList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  leftTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F3F3F",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
