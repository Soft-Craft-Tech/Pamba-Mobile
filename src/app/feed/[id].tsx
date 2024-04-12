import * as Linking from 'expo-linking';
import { Stack, useLocalSearchParams } from 'expo-router';
import Moment from 'moment';
import * as React from 'react';

import { useUpcoming } from '@/api';
import { CancelAppointment } from '@/components/cancel-appointment';
import { RescheduleAppointment } from '@/components/reschedule-appointment';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { AppointmentSvg } from '@/ui/icons/appointment';
import { LocationIcon } from '@/ui/icons/location';
import { Rating } from '@/ui/icons/rating';
import { Time } from '@/ui/icons/time';

// eslint-disable-next-line max-lines-per-function
export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();
  const [cancelAppointment, setIsCancelAppoinment] = React.useState(false);
  const [reschedule, setIsReschedule] = React.useState(false);

  const { data, isLoading, isError } = useUpcoming();
  const postData = data?.find((item) => item.id.toString() === local.id);

  console.log(postData);

  const stars = Array.from({ length: Math.floor(4.5) }, (_, index) => (
    <Rating key={index} color="#DB1471" />
  ));

  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading Appointment Details</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-3 ">
      <Stack.Screen
        options={{ title: postData?.name, headerBackTitle: 'Feed' }}
      />
      <FocusAwareStatusBar />

      <View className="m-2 flex h-[100px] flex-row items-center overflow-hidden  rounded-xl bg-white px-10 shadow-xl">
        <Image
          className="inline-flex h-20 w-20 items-center justify-center rounded-full"
          contentFit="cover"
          source={{
            uri: postData?.imgUrl,
          }}
        />
        <View className="flex flex-col px-2">
          <Text className=" text-2xl  text-[#000000]">{postData?.comment}</Text>
          <View className="mt-3 flex flex-row gap-x-3">{stars}</View>
          <View className="flex w-full flex-row items-center justify-between pr-10">
            <View className="flex flex-row items-center gap-x-2">
              <LocationIcon />
              <Text className="text-sm">{postData?.location}</Text>
            </View>
            <Pressable
              onPress={() => Linking.openURL(postData?.mapUrl || '')}
              className="flex items-center justify-center rounded-lg border border-charcoal-300 px-4 shadow-lg"
            >
              <Text className="text-center align-middle">Directions</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="m-2 flex overflow-hidden  rounded-xl bg-white p-10 shadow-xl">
        <Text className="text-2xl">Shop Description</Text>
        <Text>{postData?.description}</Text>
      </View>
      <Text className="px-4 text-xl font-bold text-[#000000]">Appointment</Text>
      <View className="m-2 flex overflow-hidden rounded-xl bg-white px-10 shadow-xl">
        <View className="flex-row items-center">
          <Image
            className="inline-flex h-20 w-20 items-center justify-center rounded-full"
            contentFit="cover"
            source={{
              uri: postData?.imgUrl,
            }}
          />
          <View className="flex flex-col gap-y-2 px-2">
            <Text className=" text-lg font-medium text-[#000000]">
              {postData?.comment}
            </Text>
            <View className="flex h-[30px] items-center justify-center rounded-lg border border-[#DB1471] px-4 shadow-lg">
              <Text className="text-black">Upcoming</Text>
            </View>
          </View>
        </View>
        <View className="my-2 flex w-full  flex-row justify-between rounded-lg bg-[#F5F6FA] p-5">
          <View className="flex flex-row items-center gap-x-4">
            <AppointmentSvg color="#0F1C35" />
            <Text>{Moment(postData?.create_at).format('DD-MM-YY')}</Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <Time color="#0F1C35" />
            <Text>{postData?.time.slice(0, -3)}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-between gap-x-2">
          <Button
            label="Cancel"
            className="w-1/2"
            variant="ghostVoke"
            onPress={() => {
              setIsReschedule(false);
              setIsCancelAppoinment(!cancelAppointment);
            }}
          />
          <Button
            label="Reschedule"
            className=" w-1/2"
            onPress={() => {
              setIsCancelAppoinment(false);
              setIsReschedule(!reschedule);
            }}
          />
        </View>
      </View>
      {cancelAppointment && <CancelAppointment appointmentId={postData?.id} />}
      {reschedule && <RescheduleAppointment appointmentId={postData?.id} />}
    </ScrollView>
  );
}
