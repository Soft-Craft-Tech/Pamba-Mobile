import { Link } from 'expo-router';
import Moment from 'moment';
import React from 'react';

import type { AllAppointments } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';
import { AppointmentSvg } from '@/ui/icons/appointment';
import { Time } from '@/ui/icons/time';

type Props = AllAppointments;

export const Card = ({ id, time, date, comment, imgUrl, cancelled }: Props) => {
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable key={id}>
        <View className="m-2 flex h-[100px] flex-row items-center justify-center overflow-hidden rounded-xl  bg-white shadow-xl">
          <Image
            className="inline-flex h-20 w-20 items-center justify-center rounded-full"
            contentFit="cover"
            source={{
              uri: imgUrl,
            }}
          />
          <View className="flex flex-col gap-y-2 px-2">
            <Text className="text-xl  text-[#000000]">{comment}</Text>
            <View className="flex flex-row items-center gap-x-2">
              <View className="flex flex-row items-center justify-evenly gap-x-2 rounded-lg bg-[#DB1471] px-5 py-1">
                <AppointmentSvg color="#fff" />
                <Text className="text-white">
                  {Moment(date).format('d MMM YY')}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-evenly gap-x-2 rounded-lg bg-[#DB1471] px-5 py-1">
                <Time color="#fff" />
                <Text className="text-white">{time.slice(0, -3)}</Text>
              </View>
            </View>
            <Text className="px-3">{cancelled ? 'Cancelled' : ''}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
