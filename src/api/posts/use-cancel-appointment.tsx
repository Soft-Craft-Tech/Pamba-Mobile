import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = {
  comment: string;
  params?: number | undefined;
};

type Response = Post | null;

export const useCancelAppointment = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    console.log('Here', `/appointments/cancel/${variables.params}`);
    return client({
      url: `/appointments/cancel/${variables.params}`,
      method: 'POST',
      data: { comment: variables.comment },
    }).then((response) => {
      return response.data;
    });
  },
});
