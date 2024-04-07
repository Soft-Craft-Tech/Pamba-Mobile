/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { ReccomendationsCard } from '@/components/reccomendations-card';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';
import BellIcon from '@/ui/icons/notification';

export default function Feed() {
  const { data, isLoading, isError } = usePosts();
  const [activeFilter, setActiveFilter] = useState(0);
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  return (
    <View className="flex-1 px-8 pt-12">
      <FocusAwareStatusBar />
      <View className="flex flex-row justify-between">
        <View>
          <View className="flex flex-row gap-x-4">
            <View className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0F1C35] ">
              <Text className="text-xl text-[#DB1471]">TW</Text>
            </View>
            <View>
              <Text className="text-xl">Welcome Back</Text>
              <Text className="text-xl text-[#303535]">David Clinton</Text>
            </View>
          </View>
        </View>
        <BellIcon />
      </View>
      <View className="my-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Massage', 'Barber', 'Hair Dressings', 'Makeup', 'Nail Tech'].map(
            (item, index) => (
              <Pressable
                key={index}
                onPress={() => setActiveFilter(index)}
                className={
                  activeFilter === index
                    ? 'ml-2 rounded-xl bg-[#0F1C35]  px-4 py-2 font-semibold text-[#fff]'
                    : 'ml-2 rounded-xl border border-[#0F1C35] bg-transparent px-4 py-2 font-semibold text-[#0F1C35]'
                }
              >
                <Text
                  className={
                    activeFilter === index ? 'text-white' : 'text-[#0F1C35]'
                  }
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </ScrollView>
      </View>
      <Text className="text-xl font-bold text-[#000000]">Recomendations</Text>
      <View className="my-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ReccomendationsCard
            imageUrl="https://example.com/image.jpg"
            rating={4.5}
          />
          <ReccomendationsCard
            imageUrl="https://example.com/image.jpg"
            rating={4.5}
          />
          <ReccomendationsCard
            imageUrl="https://example.com/image.jpg"
            rating={4.5}
          />
        </ScrollView>
      </View>
      <Text className="text-xl font-bold text-[#000000]">
        Upcoming Appointments
      </Text>
      <View className="mt-10">
        {isError ? (
          <View>
            <Text>Error Loading Data</Text>
          </View>
        ) : (
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => `item-${index}`}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            estimatedItemSize={300}
          />
        )}
      </View>
    </View>
  );
}
