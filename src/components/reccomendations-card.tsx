import React from 'react';
import { ImageBackground } from 'react-native';

import { Text, View } from '@/ui';
import { Rating } from '@/ui/icons/rating';

export const ReccomendationsCard = ({
  imageUrl,
  rating,
}: {
  imageUrl: string;
  rating: number;
}) => {
  const stars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <Rating key={index} />
  ));

  return (
    <View className="ml-2 w-[200px] rounded-xl bg-white shadow-xl">
      <View className="flex h-[100px]  items-end justify-end rounded-t-xl bg-[#DB1471] p-4">
        <ImageBackground source={{ uri: imageUrl }} resizeMode="cover">
          <View className="flex flex-row">{stars}</View>
        </ImageBackground>
      </View>
      <View className="h-[61px] p-4">
        <Text className="text-lg text-[#2E2A2B]">Perfect Hairstyles</Text>
      </View>
    </View>
  );
};
