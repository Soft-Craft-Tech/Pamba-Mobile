import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const ServicesSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.padded]}
      //   animate={{ backgroundColor: "#ffffff" }}
    >
      <Skeleton colorMode="light" width={157} height={180} />
      <Skeleton colorMode="light" width={157} height={180} />
    </MotiView>
  );
};

export default ServicesSkeleton;

const styles = StyleSheet.create({
  padded: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 8,
  },
});
