import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Dimensions, StyleSheet } from 'react-native';
import * as z from 'zod';

import { Button, ControlledInput, Image, View } from '@/ui';

const Logo = require('../../assets/transparentLogo.png');

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({
  onSubmit = () => {
    router.replace('/feed/add-post');
  },
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <View style={styles.logoContent}>
        <Image
          className="h-[90px] w-[169px] overflow-hidden rounded-t-xl"
          source={Logo}
        />
      </View>
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        // labelIcon={<FontAwesome6 name="user" size={24} color="black" />}
      />

      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <View className="mt-14">
        <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 40,
  },
  logoContent: {
    alignItems: 'center',
    marginBottom: '20%',
  },
});
