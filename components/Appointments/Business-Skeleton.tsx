import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

const Skeleton = ({ width, height, borderRadius }: { [key: string]: any }) => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={[styles.skeleton, { width, height, borderRadius }]}
  />
);

const BusinessCard = () => (
  <View style={styles.card}>
    <Skeleton width={150} height={100} borderRadius={8} />
    <Skeleton width={120} height={20} borderRadius={4} style={styles.mt10} />
    <Skeleton width={100} height={16} borderRadius={4} style={styles.mt5} />
    <Skeleton width={80} height={16} borderRadius={4} style={styles.mt5} />
    <View style={[styles.row, styles.mt5]}>
      <Skeleton width={50} height={16} borderRadius={4} />
      <Skeleton width={50} height={16} borderRadius={4} style={styles.ml10} />
    </View>
  </View>
);

const BusinessListSkeleton = () => (
  <View style={styles.container}>
    {[...Array(6)].map((_, index) => (
      <BusinessCard key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  skeleton: {
    backgroundColor: "#e0e0e0",
  },
  row: {
    flexDirection: "row",
  },
  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  ml10: { marginLeft: 10 },
});

export default BusinessListSkeleton;
