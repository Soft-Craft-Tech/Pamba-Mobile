import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ViewShopsProps {
  items: { imageSrc: any; subTitle: string; bgColor: string }[];
  title: string;
}

const ViewShops: React.FC<ViewShopsProps> = ({ title, items }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 11, fontWeight: "600" }}>View All</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 15 }}>
        {items.map(({ imageSrc, subTitle, bgColor }, index) => (
          <View
            key={index}
            style={{
              marginTop: 10,
              height: 80,
              width: 75,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                backgroundColor: bgColor,
                height: 50,
                width: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={imageSrc} />
            </View>
            <Text style={{ fontSize: 9 }}>{subTitle}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewShops;
