import { useRouter } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      console.log(data);
      await signIn(data.email, data.password);
      router.replace('/');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
