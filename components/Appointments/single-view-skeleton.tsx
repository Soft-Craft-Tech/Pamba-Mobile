import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const SingleViewSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.padded]}
    >
      <Skeleton colorMode="light" width="100%" height={243} />
    </MotiView>
  );
};

export default SingleViewSkeleton;

const styles = StyleSheet.create({
  padded: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 8,
  },
});
