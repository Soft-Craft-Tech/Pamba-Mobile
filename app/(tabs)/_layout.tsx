import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useIsFirstTime } from "@/constants/store-is-first-time";
import { Feather } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";

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
          title: "",
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
        name="explore"
        options={{
          title: "Explore",
          tabBarActiveTintColor: "#DB1471",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
