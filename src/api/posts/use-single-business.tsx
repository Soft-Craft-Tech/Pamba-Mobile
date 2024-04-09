import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { SingleBusiness } from './types';

type Response = SingleBusiness;
type Variables = string;

export const useSingleBusiness = createQuery<Response, Variables, AxiosError>({
  queryKey: [],
  fetcher: (variables) => {
    return client.get(`businesses/${variables}`).then((response) => {
      return response.data;
    });
  },
});
