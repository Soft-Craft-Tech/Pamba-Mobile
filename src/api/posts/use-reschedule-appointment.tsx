import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = {
  date: string;
  time: string;
  params?: number | undefined;
};

type Response = Post | null;

export const useRescheduleAppointent = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    return client({
      url: `/appointments/reschedule/${variables.params}`,
      method: 'PUT',
      data: { date: variables.date, time: variables.date },
    }).then((response) => {
      return response.data;
    });
  },
});
