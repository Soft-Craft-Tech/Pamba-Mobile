import { router, Stack } from 'expo-router';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Button, FocusAwareStatusBar, Text, View } from '@/ui';

const MySvg = ({ color = '#fff' }) => {
  return (
    <Svg viewBox="0 0 512 512" width="48" height="48">
      <Path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
        fill={color}
      />
    </Svg>
  );
};

export default function Success() {
  return (
    <View className="flex-1 items-center justify-evenly bg-[#DB1471] px-8 pt-12">
      <Stack.Screen options={{ headerShown: false }} />
      <FocusAwareStatusBar />
      <View className="flex w-full items-center">
        <MySvg />
        <Text className="mt-8 text-3xl font-bold text-white">
          Congratulations!
        </Text>
        <Text className="mt-4 text-center text-xl font-semibold text-white">
          Your appointment has been successfully booked.
        </Text>
      </View>
      <Button
        label="Done"
        onPress={() => router.push('/')}
        className="w-full bg-[#0F1C35]"
      />
      <Text className="mt-8 text-center text-base text-white">
        If you need to make any changes or cancel your appointment, please do so
        at least 24 hours in advance.
      </Text>
    </View>
  );
}
