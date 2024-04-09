/* eslint-disable max-lines-per-function */
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

// import { showMessage } from 'react-native-flash-message';
import { useBookAppoinment } from '@/api';
import type { SingleBusiness } from '@/api/posts/types';
import { Button, Pressable, showErrorMessage, Text, View } from '@/ui';
import DropDown from '@/ui/icons/drop-down';

interface BookAppointmentProps {
  data: SingleBusiness | undefined;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({ data }) => {
  const { mutate: bookAppointment, isLoading } = useBookAppoinment();
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

  const [firstServiceId] = data?.services?.map((service) => service?.id) || [];

  const [service, setSelectedService] = useState(firstServiceId);

  const [comment] = useState('');

  const [provider] = useState(9);

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

  const onSubmit = () => {
    const newDate = Moment(date).format('DD-MM-YYYY');
    const newTime = Moment(time).format('HH:mm');
    bookAppointment(
      { time: newTime, date: newDate, comment, service, provider },
      {
        onSuccess: () => {
          showMessage({
            message: 'Appointment booked succesfuly',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error booking appointment');
        },
      }
    );
  };
  return (
    <View>
      <View className="m-2 flex overflow-hidden  rounded-xl bg-white p-10 shadow-xl">
        <Text>{data?.business.description}</Text>
      </View>
      <View className="m-2 flex overflow-hidden rounded-xl bg-white p-10 shadow-xl">
        <Text className="text-2xl">Services</Text>
        <View className="flex flex-row flex-wrap gap-x-2">
          {data?.services?.map((serviceData) => (
            <Button
              label={serviceData?.service}
              key={serviceData?.id}
              variant="ghostGray"
              className="w-[90px]"
              onPress={() => {
                setSelectedService(serviceData?.id);
              }}
            />
          ))}
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
      <Button
        loading={isLoading}
        onPress={() => onSubmit()}
        label="Book Appointment"
      />
    </View>
  );
};
