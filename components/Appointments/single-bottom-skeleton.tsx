import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const BottonViewOnSingleView = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.padded]}
    >
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.padded]}
      >
        <View style={{ flexDirection: "row" }}>
          <Skeleton colorMode="light" width="50%" height={72} />
          <Skeleton colorMode="light" width="50%" height={72} />
        </View>
      </MotiView>
    </MotiView>
  );
};

export default BottonViewOnSingleView;

const styles = StyleSheet.create({
  padded: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 8,
  },
});
