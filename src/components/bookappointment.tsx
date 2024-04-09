/* eslint-disable max-lines-per-function */
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import React, { useState } from 'react';

import { Button, Pressable, Text, View } from '@/ui';
import DropDown from '@/ui/icons/drop-down';

export const BookAppointment = () => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = useState<any | undefined>('date');
  const [show, setShow] = useState(false);
  const onChange = (selectedDate: any) => {
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
  return (
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
  );
};
