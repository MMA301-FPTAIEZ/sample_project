import axios from 'axios';
import { API } from '@env';

export const instance = axios.create({
  baseURL: API || 'https://687372cac75558e273543cd3.mockapi.io/he123456',
});
