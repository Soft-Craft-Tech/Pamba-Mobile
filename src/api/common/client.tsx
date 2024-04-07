import { Env } from '@env';
import axios from 'axios';
import { encode } from 'base-64';

import { getToken } from '@/core/auth/utils';

const apiKey = '0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62';

const token = getToken();

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': apiKey,
    'x-access-token': token,
  },
});

export const loginClient = async (email: string, password: string) => {
  try {
    const credentials = `${email}:${password}`;
    const credentialsBase64 = encode(credentials);

    const response = await client.post(
      '/clients/login',
      { username: email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentialsBase64}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Sign-in error:', error.response.status);
      throw error.response;
    } else if (error.request) {
      console.error('Request error:', error.request);
      throw error.request;
    } else {
      console.error('Error:', error.message);
      throw error.message;
    }
  }
};
