import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { AllBusiness } from './types';

type Response = AllBusiness[];
type Variables = void;

export const useBusinessesQuery = createQuery<Response, Variables, AxiosError>({
  queryKey: ['businesses'],
  fetcher: () => {
    return client
      .get(`businesses/all-businesses`)
      .then((response) => response.data.businesses);
  },
});
