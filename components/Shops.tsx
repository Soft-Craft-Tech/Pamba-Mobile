import { Href, Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface ViewShopsProps {
  items: { imageSrc: any; subTitle: string; bgColor: string; shopId: string }[];
  title: string;
}

const ViewShops: React.FC<ViewShopsProps> = ({ title, items }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerText}>View All</Text>
      </View>
      <View style={styles.container}>
        {items.map(({ imageSrc, subTitle, bgColor, shopId }, index) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: bgColor }]}
            key={index}
          >
            <Link
              href={
                {
                  pathname: "shop/[id]",
                  params: { id: shopId },
                } as Href<any>
              }
              style={styles.imageContainer}
            >
              <Image source={imageSrc} />
            </Link>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  headerText: {
    fontSize: 11,
    fontWeight: "600",
  },
  container: {
    flexDirection: "row",
    gap: 15,
  },
  itemContainer: {
    marginTop: 10,
    height: 80,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 9,
    color: "#fff",
    textAlign: "center",
  },
});

export default ViewShops;
