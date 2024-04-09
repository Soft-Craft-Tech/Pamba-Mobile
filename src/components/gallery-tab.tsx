import React from 'react';

import { Image, Text, View } from '@/ui';

export const GalleryTab = () => {
  return (
    <View className="m-2 flex overflow-hidden  rounded-xl bg-white p-10 ">
      <Text>Gallery</Text>
      <View className="flex flex-row flex-wrap">
        <View className="w-1/2 p-2">
          <Image
            className="h-[156px] w-full rounded-lg object-cover"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
        </View>
        <View className="w-1/2 p-2">
          <Image
            className="h-[156px] w-full rounded-lg object-cover"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
        </View>
        <View className="w-1/2 p-2">
          <Image
            className="h-[156px] w-full rounded-lg object-cover"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
        </View>
        <View className="w-1/2 p-2">
          <Image
            className="h-[156px] w-full rounded-lg object-cover"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
        </View>
      </View>
    </View>
  );
};
