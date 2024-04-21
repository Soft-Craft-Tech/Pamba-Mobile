import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Pressable, Text, View } from '@/ui';

const schema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export default function ResetPassword() {
  const { control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View className="flex-1 justify-center bg-[#0F1C35] px-4 py-24">
      <View className="flex items-center">
        <Text
          testID="form-title"
          className="mt-8 max-w-[222px] pb-6 text-center text-3xl text-white"
        >
          Password Reset!
        </Text>
      </View>
      <View className="mt-20">
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Enter Email Address"
        />
        <Link href="/login" asChild>
          <Pressable>
            <Text className="px-3 text-white">Back to Login?</Text>
          </Pressable>
        </Link>
      </View>
      <Button
        className="mt-20"
        testID="login-button"
        label="Request Password Reset"
      />
    </View>
  );
}
