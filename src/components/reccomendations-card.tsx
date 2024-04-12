import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { Text, View } from '@/ui';
import { Rating } from '@/ui/icons/rating';

export const ReccomendationsCard = ({
  imageUrl,
  rating,
  business_name,
}: {
  imageUrl: string;
  rating: number;
  business_name: string;
}) => {
  const stars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <Rating key={index} />
  ));

  return (
    <View className="ml-2 w-[200px] rounded-xl bg-white shadow-xl">
      <View className="flex h-[100px]  items-end justify-end  bg-[#DB1471] ">
        <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
          <View className="flex flex-row">{stars}</View>
        </ImageBackground>
      </View>
      <View className="h-[61px] p-4">
        <Text className="text-lg text-[#2E2A2B]">{business_name}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
