import { Stack } from 'expo-router';
import * as React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/ui';

const NOtifcations = () => {
  return (
    <View className="m-2 flex overflow-hidden rounded-xl bg-white p-5 shadow-xl">
      <View className="flex w-full flex-row justify-between">
        <Text>Oil Massage</Text>
        <Text>15 Mins</Text>
      </View>
      <Text className="mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </Text>
    </View>
  );
};

export default function Style() {
  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen
        options={{ title: 'Notifications', headerBackTitle: 'Feed' }}
      />
      <FocusAwareStatusBar />
      <Text className="text-xl font-bold text-[#000000]">
        All Notifications
      </Text>
      <NOtifcations />
    </View>
  );
}
