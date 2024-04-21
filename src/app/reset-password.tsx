import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
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
  const router = useRouter();

  const { control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View className="flex-1 justify-between  bg-[#0F1C35] px-4 py-24">
      <View className="flex items-center">
        <Text
          testID="form-title"
          className="mt-8 max-w-[222px] pb-6 text-center text-[14px] text-[#A59E9E]"
        >
          Please enter your email & phone number to Login
        </Text>
      </View>
      <View className="gap-y-4">
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <Link href="/forgot-password" asChild>
          <Pressable>
            <Text className="px-3 text-white">Forgot Password?</Text>
          </Pressable>
        </Link>
      </View>
      <Button testID="login-button" label="Login" />
      <View>
        <Text
          testID="form-title"
          className="mt-8  pb-6 text-center text-[14px] text-[#A59E9E]"
        >
          Don't have an account?
        </Text>
        <Button
          testID="login-button"
          label="Sign Up"
          variant="outlined"
          onPress={() => {
            router.replace('/login');
          }}
        />
      </View>
    </View>
  );
}
