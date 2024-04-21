import { useRouter } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } catch (error) {}
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
