import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
type Response = Post;

export const useSignUp = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return client({
      url: '/clients/signup',
      method: 'POST',
      data: variables,
    }).then((response) => {
      return response.data;
    });
  },
});
