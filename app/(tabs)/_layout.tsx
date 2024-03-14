import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CircleButton from "@/components/circleButton";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={40} color="#d0d0d0" />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-month" size={40} color="#d0d0d0" />
          ),
        }}
      />
      <Tabs.Screen
        name="modal"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CircleButton
              onPress={() => {
                console.log("Here");
              }}
            />
            // <MaterialIcons name="task" size={40} color="#d0d0d0" />
          ),
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="task" size={40} color="#d0d0d0" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={40} color="#d0d0d0" />
          ),
        }}
      />
    </Tabs>
  );
}
