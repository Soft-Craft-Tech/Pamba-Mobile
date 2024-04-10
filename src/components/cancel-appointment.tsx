import React from 'react';
import { TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useCancelAppointment } from '@/api/posts/use-cancel-appointment';
import { Button, showErrorMessage, Text, View } from '@/ui';

export const CancelAppointment: React.FC<{
  appointmentId: number | undefined;
}> = ({ appointmentId }) => {
  const [value, onChangeText] = React.useState('Write a comment');
  const { mutate: cancelAppointment, isLoading } = useCancelAppointment();

  const handleCancelAppointment = () => {
    cancelAppointment(
      { params: appointmentId, comment: value },
      {
        onSuccess: () => {
          showMessage({
            message: 'Appointment cancelled succesfuly',
            type: 'success',
          });
        },
        onError: () => {
          showErrorMessage('Error canceling appointment');
        },
      }
    );
  };

  return (
    <View className="m-2 flex gap-y-6 overflow-hidden rounded-xl bg-white p-10 shadow-xl">
      <Text className="mb-2 text-xl font-bold">Cancel Apppointment</Text>
      <TextInput
        editable
        className="rounded-lg border border-slate-500  p-4 align-top"
        multiline
        maxLength={40}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button
        label="Submit"
        loading={isLoading}
        onPress={() => {
          handleCancelAppointment();
        }}
      />
    </View>
  );
};
