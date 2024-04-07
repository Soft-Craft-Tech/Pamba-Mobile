import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground } from 'react-native';

import type { AllBusiness } from '@/api';
import { Pressable, Text, View } from '@/ui';
import { Rating } from '@/ui/icons/rating';

type Props = AllBusiness;

export const BusinessCard = ({ profile_img, slug, business_name }: Props) => {
  const stars = Array.from({ length: Math.floor(4.5) }, (_, index) => (
    <Rating key={index} />
  ));

  return (
    <Link href={`/feed/${slug}`} asChild>
      <Pressable>
        <View className="ml-2  rounded-xl bg-white shadow-xl">
          <View className="flex h-[100px]  items-end justify-end rounded-t-xl bg-[#DB1471] p-4">
            <ImageBackground source={{ uri: profile_img }} resizeMode="cover">
              <View className="flex flex-row">{stars}</View>
            </ImageBackground>
          </View>
          <View className="h-[61px] p-4">
            <Text className="text-lg text-[#2E2A2B]">{business_name}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
