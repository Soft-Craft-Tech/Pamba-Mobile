/* eslint-disable max-lines-per-function */
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import Moment from 'moment';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useRescheduleAppointent } from '@/api/posts/use-reschedule-appointment';
import { Button, showErrorMessage, Text, View } from '@/ui';
import DropDown from '@/ui/icons/drop-down';

export const RescheduleAppointment: React.FC<{
  appointmentId: number | undefined;
}> = ({ appointmentId }) => {
  // const [value, onChangeText] = React.useState('Write a comment');
  const { mutate: rescheduleAppointment, isLoading } =
    useRescheduleAppointent();
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [time, setTime] = React.useState(new Date(1598051730000));
  const [mode, setMode] = useState<any | undefined>('date');
  const [datePicker, setDatePicker] = useState(false);
  const [timeKeeper, setTimePicker] = useState(false);

  const onChangeDate = (
    _event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDatePicker(false);
    setDate(currentDate);
  };
  const onChangeTime = (
    _event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setTimePicker(false);
    setTime(currentDate);
  };
  const showDateMode = (currentMode: any) => {
    setTimePicker(true);
    setMode(currentMode);
  };

  const showTimeMode = (currentMode: any) => {
    setTimePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showDateMode('date');
  };

  const showTimepicker = () => {
    showTimeMode('time');
  };

  const handlerescheduleAppointment = () => {
    rescheduleAppointment(
      { params: appointmentId, date, time },
      {
        onSuccess: () => {
          router.push('/feed/congratulations');
          showMessage({
            message: 'Appointment rescheduled succesfuly',
            type: 'success',
          });
        },
        onError: () => {
          showErrorMessage('Error reschedulling appointment');
        },
      }
    );
  };

  return (
    <View className="m-2 flex gap-y-6 overflow-hidden rounded-xl bg-white p-10 shadow-xl">
      <Text className="mb-2 text-xl font-bold">Reschedule Apppointment</Text>
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
            <Text>{Moment(time).format('LT')}</Text>
            <DropDown />
          </Pressable>
        </View>
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChangeDate}
          />
        )}
        {timeKeeper && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}
      </View>
      {/* <TextInput
        editable
        className="rounded-lg border border-slate-500  p-4 align-top"
        multiline
        maxLength={40}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      /> */}
      <Button
        label="Submit"
        loading={isLoading}
        onPress={() => {
          handlerescheduleAppointment();
        }}
      />
    </View>
  );
};
