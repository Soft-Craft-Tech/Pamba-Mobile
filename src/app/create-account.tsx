import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { SignUpForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function CreateAccount() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
