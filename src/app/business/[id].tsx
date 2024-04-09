/* eslint-disable max-lines-per-function */
import type { Tabs } from 'expo-router';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useUpcoming } from '@/api';
import { BookAppointment } from '@/components/bookappointment';
import { GalleryTab } from '@/components/gallery-tab';
import { ReviewTab } from '@/components/reviewtab';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Image,
  Pressable,
  Text,
  View,
} from '@/ui';
import { LocationIcon } from '@/ui/icons/location';
import { Rating } from '@/ui/icons/rating';

type Tab = {
  content: React.ReactElement;
  isActive: boolean;
};

type Tabs = {
  About: Tab;
  Reviews: Tab;
  Gallery: Tab;
};

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState<keyof Tabs>('About');

  const tabs: Tabs = {
    About: {
      content: <BookAppointment />,
      isActive: activeTab === 'About',
    },
    Reviews: {
      content: <ReviewTab />,
      isActive: activeTab === 'Reviews',
    },
    Gallery: {
      content: <GalleryTab />,
      isActive: activeTab === 'Gallery',
    },
  };

  const handleTabClick = (tab: keyof Tabs) => {
    setActiveTab(tab);
  };

  console.log(local.id);

  const { data, isLoading, isError } = useUpcoming();
  console.log(data);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading Appointment Details</Text>
      </View>
    );
  }
  const stars = Array.from({ length: Math.floor(4.5) }, (_, index) => (
    <Rating key={index} color="#DB1471" />
  ));
  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <View className="m-2 overflow-hidden rounded-xl  bg-white px-5 py-4 shadow-xl">
        <View className="flex  flex-row items-center">
          <Image
            className="inline-flex h-20 w-20 items-center justify-center rounded-full"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
          <View className="flex flex-col px-2">
            <Text className=" text-2xl  text-[#000000]">Deevabits</Text>
            <View className="mt-3 flex flex-row gap-x-3">{stars}</View>
            <View className="flex w-full flex-row items-center justify-between pr-10">
              <View className="flex flex-row items-center gap-x-2">
                <LocationIcon />
                <Text className="text-lg">Nairobi</Text>
              </View>
              <Pressable className="mr-10 flex items-center justify-center rounded-lg border border-charcoal-300 px-4 shadow-lg">
                <Text className="text-center align-middle">Directions</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="m-4 flex flex-row justify-between gap-x-1 overflow-hidden rounded-xl bg-[#0F1C35] p-2">
          {Object.keys(tabs).map((tab) => (
            <Button
              key={tab}
              label={tab}
              className={`w-[100px]`}
              variant={
                tabs[tab as keyof Tabs].isActive ? 'default' : 'inactiveBtn'
              }
              onPress={() => handleTabClick(tab as keyof Tabs)}
            />
          ))}
        </View>
      </View>
      {tabs[activeTab].content}
    </View>
  );
}
