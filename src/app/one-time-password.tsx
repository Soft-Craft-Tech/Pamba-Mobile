import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { Button, Text, View } from '@/ui';

interface OTPInputProps {}

const OTPInput: React.FC<OTPInputProps> = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOTPChange = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (index < 3 && value !== '') {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <View className="flex-1 items-center justify-evenly bg-[#0F1C35]">
      <View className="flex items-center">
        <Text className="text-3xl text-white">
          Enter 4-digit Verification code
        </Text>
        <Text className="text-sm text-white">
          Code sent to +254246****. This code will expire in 01:30
        </Text>
        <View className="flex flex-row justify-center gap-x-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              className="h-[70px] w-[70px] rounded-md bg-white text-center text-lg font-semibold text-black shadow-md"
              value={digit}
              onChangeText={(text) => handleOTPChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
      </View>
      <Button label="Verify" className="mt-20 w-full" />
    </View>
  );
};

export default OTPInput;
