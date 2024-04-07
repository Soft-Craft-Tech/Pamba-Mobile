import axios from 'axios';

const apiKey = '0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62';

export const client = axios.create({
  baseURL: 'https://pamba-web.onrender.com/API/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': apiKey,
  },
});
