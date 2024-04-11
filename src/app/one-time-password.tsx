/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { useVerifyAccount } from '@/api/posts/use-verify-otp';
import { getEmailAdress } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { showErrorMessage, Text, View } from '@/ui';

type OTPInputProps = {};

const OTP: React.FC<OTPInputProps> = () => {
  useSoftKeyboardEffect();
  const [otpValue, setOtpValue] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const { mutate: createAccount } = useVerifyAccount();

  const emailAdress = getEmailAdress();

  const handleOtpInput = (index: number, text: string) => {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = text;
    setOtpValue(newOtpValue);
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (text.length === 1 && index === 5) {
      createAccount(
        { otp: text, email: emailAdress.email },
        {
          onSuccess: () => {
            router.push('/login');
          },
          onError: () => {
            showErrorMessage('Error Veirifying account');
            router.push('/create-account');
          },
        }
      );
    }
  };

  return (
    <>
      <View className="flex-1 justify-between bg-[#0F1C35] px-4 py-24">
        <View className="flex items-center">
          <Text
            testID="form-title"
            className="mt-8 max-w-[222px] pb-6 text-center text-3xl text-white"
          >
            Enter 6-Digit Verification Code
          </Text>
          <Text
            testID="form-title"
            className="mt-8 max-w-[222px] pb-6 text-center text-lg text-white"
          >
            Enter Verification code sent to your email address
          </Text>
          <View className="flex flex-row gap-x-2">
            {otpValue.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="h-[50px] w-[50px] rounded-md bg-white text-center text-lg font-semibold text-black shadow-md"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpInput(index, text)}
              />
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default OTP;
