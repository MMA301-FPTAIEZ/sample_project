import axios from 'axios';

const API_URL = 'https://687372cac75558e273543cd3.mockapi.io';

export const instance = axios.create({
  baseURL: API_URL,
});
