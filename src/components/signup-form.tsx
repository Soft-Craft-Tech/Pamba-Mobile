/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Image, Text, View } from '@/ui';
const Logo = require('../../assets/transparentLogo.png');

const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  phone: z.string({
    required_error: 'Name is required',
  }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading?: boolean;
};

export const SignUpForm = ({
  onSubmit = () => {},
  isLoading = false,
}: SignUpFormProps) => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-between  bg-[#0F1C35] px-4 py-24">
      <View className="flex items-center">
        <Image
          className="h-[90px] w-[169px] overflow-hidden rounded-t-xl"
          source={Logo}
        />
        <Text
          testID="form-title"
          className="mt-8 max-w-[222px] pb-6 text-center text-lg text-[#A59E9E]"
        >
          Welcome to Pamba
        </Text>
      </View>
      <View className="gap-y-2">
        <ControlledInput
          testID="email-input"
          control={control}
          name="name"
          label="Full Name"
        />
        <ControlledInput
          testID="email-input"
          control={control}
          name="phone"
          label="Phone Number"
        />
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={false}
        />
      </View>
      <Button
        testID="login-button"
        label="Register Now"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
      <View>
        <Text
          testID="form-title"
          className="mt-8  pb-6 text-center text-[14px] text-[#A59E9E]"
        >
          Already have an account?
        </Text>
        <Button
          testID="login-button"
          label="Login"
          variant="outlined"
          onPress={() => {
            router.replace('/login');
          }}
        />
      </View>
    </View>
  );
};
