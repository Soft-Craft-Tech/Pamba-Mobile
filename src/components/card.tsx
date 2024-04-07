import { Link } from 'expo-router';
import Moment from 'moment';
import React from 'react';

import type { AllAppointments } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';
import AppointmentCard from '@/ui/icons/appoint-card';
import Time from '@/ui/icons/time';

type Props = AllAppointments;

const images = ['', '', '', '', ''];

export const Card = ({ id, time, create_at, comment }: Props) => {
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable>
        <View className="m-2 flex h-[100px] flex-row items-center justify-center overflow-hidden rounded-xl  bg-white shadow-xl">
          <Image
            className="inline-flex h-20 w-20 items-center justify-center rounded-full"
            contentFit="cover"
            source={{
              uri: images[Math.floor(Math.random() * images.length)],
            }}
          />
          <View className="flex flex-col gap-y-2 px-2">
            <Text className=" text-lg font-medium text-[#000000]">
              {comment}
            </Text>
            <View className="flex flex-row items-center gap-x-2">
              <View className="flex flex-row items-center justify-evenly gap-x-2 rounded-lg bg-[#DB1471] px-5 py-1">
                <AppointmentCard />
                <Text className="text-white">
                  {Moment(create_at).format('d MMM')}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-evenly gap-x-2 rounded-lg bg-[#DB1471] px-5 py-1">
                <Time />
                <Text className="text-white">{time}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
