import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Verification = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>OTP Verification</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Verification;
