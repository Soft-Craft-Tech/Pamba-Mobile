import { useRouter } from 'expo-router';
import React from 'react';

import { Button, FocusAwareStatusBar, Text, View } from '@/ui';

export default function ResetPassword() {
  const router = useRouter();

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1 justify-center p-4">
        <Text>Forgot</Text>
        <Button
          testID="login-button"
          label="Request Password Reset"
          onPress={() => {
            router.replace('/');
          }}
        />
      </View>
    </>
  );
}
