/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { type AllAppointments, useUpcoming } from '@/api';
import { useBusinessesQuery } from '@/api/posts/use-businesses';
import { Card } from '@/components/card';
import { ReccomendationsCard } from '@/components/reccomendations-card';
import { getUserData } from '@/core/auth/utils';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';
import BellIcon from '@/ui/icons/notification';

export default function Feed() {
  const { data, isLoading, isError } = useUpcoming();
  const {
    data: businessData,
    // isLoading: loadingBusinesses,
    // isError: errorLoadingBusinesses,
  } = useBusinessesQuery();

  console.log(businessData?.[0]?.business_name);

  const [activeFilter, setActiveFilter] = useState(0);
  const renderItem = React.useCallback(
    ({ item }: { item: AllAppointments }) => <Card {...item} />,
    []
  );
  const router = useRouter();

  const userData = getUserData();

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
              <Text className="text-xl text-[#303535]">{userData?.name}</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => router.push('/feed/notifications')}>
          <BellIcon />
        </Pressable>
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
          {businessData?.map(({ profile_img, slug, business_name }) => (
            <Link href={`/business/${slug}`} asChild>
              <Pressable key={slug}>
                <ReccomendationsCard
                  imageUrl={profile_img}
                  rating={4.5}
                  business_name={business_name}
                />
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>
      <Text className="fbusiness_nameont-bold text-xl text-[#000000]">
        Upcoming Appointments
      </Text>
      <View className="mt-10 min-h-full">
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
            estimatedItemSize={3}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
