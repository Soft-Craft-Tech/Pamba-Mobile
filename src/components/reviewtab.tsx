import React from 'react';
import { TextInput } from 'react-native';

import { Button, Image, Text, View } from '@/ui';
import { Rating } from '@/ui/icons/rating';

export const ReviewTab = () => {
  const [value, onChangeText] = React.useState('Write a review');
  const stars = Array.from({ length: Math.floor(4.5) }, (_, index) => (
    <Rating height={18} width={18} key={index} color="#DB1471" />
  ));
  return (
    <View className="m-2 flex gap-y-4 overflow-hidden  rounded-xl bg-white p-5 ">
      <Text className="text-lg">Rate the services offered</Text>
      <View>
        <Rating width={24} height={24} color="#838FA0" />
      </View>
      <TextInput
        editable
        className="h-[86px] rounded-lg border border-slate-500  p-4 align-top"
        multiline
        maxLength={40}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button label="Submit Review" />
      <View className="flex   pb-3">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-2">
            <Image
              className="inline-flex h-20 w-20 items-center justify-center rounded-full"
              contentFit="cover"
              source={{
                uri: '',
              }}
            />
            <View>
              <Text className="text-lg">Gathoni</Text>
              <View className="flex flex-row">{stars}</View>
            </View>
          </View>
          <Text className="text-lg">2 Days ago</Text>
        </View>
        <Text className="px-14 ">
          Aliqua officia duis occaecat consectetur furgiat nostrud anim dolor
          commado officia proident...
        </Text>
      </View>
      <View className="flex   pb-3">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-2">
            <Image
              className="inline-flex h-20 w-20 items-center justify-center rounded-full"
              contentFit="cover"
              source={{
                uri: '',
              }}
            />
            <View>
              <Text className="text-lg">Gathoni</Text>
              <View className="flex flex-row">{stars}</View>
            </View>
          </View>
          <Text className="text-lg">2 Days ago</Text>
        </View>
        <Text className="px-14 ">
          Aliqua officia duis occaecat consectetur furgiat nostrud anim dolor
          commado officia proident...
        </Text>
      </View>
    </View>
  );
};
