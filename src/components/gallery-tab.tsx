import React from 'react';

import { Image, Text, View } from '@/ui';

export const GalleryTab = () => {
  return (
    <View className="m-2 flex overflow-hidden  rounded-xl bg-white p-10 ">
      <Text>Galley</Text>
      <View className="flex flex-row  gap-x-2">
        <Image
          className="inline-flex h-[156px] w-1/2 items-center justify-center "
          contentFit="cover"
          source={{
            uri: '',
          }}
        />
        <Image
          className="inline-flex h-[156px] w-1/2 items-center justify-center "
          contentFit="cover"
          source={{
            uri: '',
          }}
        />
      </View>
    </View>
  );
};
