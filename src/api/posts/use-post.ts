import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { AllAppointments } from './types';

type Response = AllAppointments[];

export const useUpcoming = createQuery<Response, AxiosError>({
  queryKey: ['upcoming'],
  fetcher: () => {
    return client
      .get(`appointments/my-appointments`)
      .then((response) => response.data.upcoming);
  },
});
