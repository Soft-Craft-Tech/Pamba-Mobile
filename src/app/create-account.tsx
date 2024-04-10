import { useRouter } from 'expo-router';
import React from 'react';

import { useSignUp } from '@/api/posts/use-create-account';
import { SignUpForm } from '@/components/signup-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

export default function Login() {
  useSoftKeyboardEffect();
  const router = useRouter();

  const { mutate: createAccount, isLoading } = useSignUp();

  const onSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    createAccount(data, {
      onSuccess: () => {
        router.push('/one-time-password');
      },
      onError: () => {
        showErrorMessage('Error booking appointment');
      },
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
}
