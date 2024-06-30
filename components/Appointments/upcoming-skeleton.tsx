import React from "react";
import { StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const UpcomingSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.padded]}
    >
      <Skeleton colorMode="light" width="100%" height={72} />
      <Skeleton colorMode="light" width="100%" height={72} />
    </MotiView>
  );
};

export default UpcomingSkeleton;

const styles = StyleSheet.create({
  padded: {
    marginTop: 10,
    gap: 8,
    paddingHorizontal: 20,
  },
});
