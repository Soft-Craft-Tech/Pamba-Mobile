import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface BottomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  //   children: React.ReactNode;
}

const plus = require("../assets/images/plus.png");
const emptyImage = require("../assets/images/emptyImage.png");

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isVisible,
  //   children,
  onClose,
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={[styles.bottomSheet, { height: windowHeight * 0.72 }]}>
        <View
          style={{
            flex: 0,
            width: "90%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              paddingLeft: "20%",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Create Appointment
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} />
            </Pressable>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "3%",
              marginBottom: "3%",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Name
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type Here"
              placeholderTextColor="#d0d0d0"
              autoCapitalize="none"
            />
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "5%",
              marginBottom: "5%",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Add Member
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image source={emptyImage} />
            <Image source={plus} />
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "5%",
              marginBottom: "5%",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Calendar
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#eef4ff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                }}
              >
                <MaterialIcons name="calendar-month" size={22} />
              </View>
              <Text>April 1 2024</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#fff0ee",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                }}
              >
                <MaterialIcons name="calendar-month" size={22} />
              </View>
              <Text>May 1 2024</Text>
            </View>
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "3%",
              marginBottom: "5%",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Description
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type Here"
              placeholderTextColor="#d0d0d0"
              autoCapitalize="none"
            />
          </View>
          <Pressable style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.btnTxt}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 2,
    borderColor: "#cbcbcb",
    width: "90%",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 20,
    backgroundColor: "#DB1471",
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default BottomDrawer;
