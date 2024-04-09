/* eslint-disable max-lines-per-function */
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
  const [mode, setMode] = useState<any | undefined>('date');
  const [show, setShow] = useState(false);
  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const [service, setSelectedService] = useState(8);

  const [comment] = useState('');

  const [provider] = useState(9);

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

  const onSubmit = () => {
    const newDate = Moment(new Date(1598051730000)).format('DD-MM-YYYY');
    const time = Moment(new Date(1598051930000)).format('HH:mm');
    console.log(time, date, comment, service, provider);
    bookAppointment(
      { time, date: newDate, comment, service, provider },
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
      <Button
        loading={isLoading}
        onPress={() => onSubmit()}
        label="Book Appointment"
      />
    </View>
  );
};
