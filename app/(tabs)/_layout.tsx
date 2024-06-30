import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useIsFirstTime } from "@/constants/store-is-first-time";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isFirstTime] = useIsFirstTime();

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#DB1471",
          headerShown: true,
          headerRight: () => <Feather name="bell" size={24} color="black" />,
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: "#F6F6F9",
          },
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerLeft: () => <Avatar />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="all-appointments"
        options={{
          title: "Appointments",
          tabBarActiveTintColor: "#DB1471",
          headerShown: true,
          headerRight: () => <Feather name="bell" size={24} color="black" />,
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: "#F6F6F9",
          },
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerLeft: () => (
            <Ionicons name="arrow-back" size={24} color="black" />
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarActiveTintColor: "#DB1471",
          headerShown: true,
          headerRight: () => <Feather name="bell" size={24} color="black" />,
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: "#F6F6F9",
          },
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerLeft: () => (
            <Ionicons name="arrow-back" size={24} color="black" />
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
