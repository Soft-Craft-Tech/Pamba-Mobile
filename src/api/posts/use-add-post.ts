import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = {
  date: string;
  time: string;
  comment: string;
  service: number;
  provider: number;
};
type Response = Post;

export const useBookAppoinment = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    console.log('Here', variables); // Console log the variables
    return client({
      url: 'appointments/book',
      method: 'POST',
      data: variables,
    }).then((response) => {
      console.log(response.data); // Console log the response data
      return response.data;
    });
  },
});
