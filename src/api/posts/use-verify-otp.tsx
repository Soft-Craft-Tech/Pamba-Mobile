import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = {
  email: string;
  otp: string;
};
type Response = Post;

export const useVerifyAccount = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async (variables) => {
      return client({
        url: 'clients/verify-otp',
        method: 'POST',
        data: variables,
      }).then((response) => {
        return response.data;
      });
    },
  }
);
