/* eslint-disable max-lines-per-function */
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useLocalSearchParams } from 'expo-router';
import Moment from 'moment';
import * as React from 'react';
import { useState } from 'react';

import { useUpcoming } from '@/api';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Image,
  Pressable,
  Text,
  View,
} from '@/ui';
import DropDown from '@/ui/icons/drop-down';
import { LocationIcon } from '@/ui/icons/location';
import { Rating } from '@/ui/icons/rating';

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();

  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = useState<any | undefined>('date');
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  console.log(local.id);

  const { data, isLoading, isError } = useUpcoming();
  console.log(data);
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
  const stars = Array.from({ length: Math.floor(4.5) }, (_, index) => (
    <Rating key={index} color="#DB1471" />
  ));
  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <View className="m-2 overflow-hidden rounded-xl  bg-white px-5 py-4 shadow-xl">
        <View className="flex  flex-row items-center">
          <Image
            className="inline-flex h-20 w-20 items-center justify-center rounded-full"
            contentFit="cover"
            source={{
              uri: '',
            }}
          />
          <View className="flex flex-col px-2">
            <Text className=" text-2xl  text-[#000000]">Deevabits</Text>
            <View className="mt-3 flex flex-row gap-x-3">{stars}</View>
            <View className="flex w-full flex-row items-center justify-between pr-10">
              <View className="flex flex-row items-center gap-x-2">
                <LocationIcon />
                <Text className="text-lg">Nairobi</Text>
              </View>
              <Pressable className="mr-10 flex items-center justify-center rounded-lg border border-charcoal-300 px-4 shadow-lg">
                <Text className="text-center align-middle">Directions</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="m-4 flex flex-row justify-between gap-x-1 overflow-hidden rounded-xl bg-[#0F1C35] p-2">
          <Button label="About" className="w-[100px]" />
          <Button label="Reviews" variant="inactiveBtn" className="w-[100px]" />
          <Button label="Gallery" variant="inactiveBtn" className="w-[100px]" />
        </View>
      </View>
      <View>
        <View className="m-2 flex overflow-hidden  rounded-xl bg-white p-10 shadow-xl">
          <Text>
            Welcome to Nathan Massage, where relaxation and rejuvenation await
            you. Located in the heart of the city, our shop offers a tranquil
            oasis where you can escape the hustle and bustle of everyda...
          </Text>
        </View>
        <View className="m-2 flex overflow-hidden rounded-xl bg-white p-10 shadow-xl">
          <Text className="text-2xl">Services</Text>
          <View className="flex flex-row flex-wrap gap-x-2">
            <Button label="About" variant="ghostGray" className="w-[90px]" />
            <Button label="About" variant="ghostGray" className="w-[90px]" />
            <Button label="About" variant="ghostGray" className="w-[90px]" />
            <Button label="About" className="w-[90px]" />
          </View>
        </View>
        <View className="m-2 flex flex-row justify-between gap-x-4 overflow-hidden p-10">
          <View className="w-1/2">
            <Text className="text-lg">Choose Date</Text>
            <Pressable
              onPress={showDatepicker}
              className="flex flex-row items-center justify-between rounded-xl border border-[#C1B9BB] p-4"
            >
              <Text>{Moment(date).format('DD/MM/YY')}</Text>
              <DropDown />
            </Pressable>
          </View>
          <View className="w-1/2">
            <Text className="text-lg">Choose Time</Text>
            <Pressable
              onPress={showTimepicker}
              className="flex flex-row items-center justify-between rounded-xl border border-[#C1B9BB] p-4"
            >
              <Text>{Moment(date).format('LT')}</Text>
              <DropDown />
            </Pressable>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <Button label="Book Appointment" />
      </View>
    </View>
  );
}
