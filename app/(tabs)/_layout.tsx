import { Redirect, Tabs, useRouter } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useIsFirstTime } from "@/constants/store-is-first-time";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";

const commonHeaderOptions = {
  headerShown: true,
  tabBarActiveTintColor: "#DB1471",
  headerRightContainerStyle: { paddingRight: 20 },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: "#F6F6F9",
  },
  headerLeftContainerStyle: { paddingLeft: 20 },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isFirstTime] = useIsFirstTime();
  const router = useRouter();

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  const backArrowHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );

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
          ...commonHeaderOptions,
          headerLeft: () => <Avatar />,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
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
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
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
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all-shops/[id]"
        options={{
          title: "",
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="business-profile/[id]"
        options={{
          title: "",
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          tabBarShowLabel: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="appointments/[id]"
        options={{
          title: "",
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="book-appointment/[id]"
        options={{
          title: "",
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          ...commonHeaderOptions,
          headerTitleStyle: { display: "none" },
          headerLeft: backArrowHeaderLeft,
          tabBarShowLabel: false,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
