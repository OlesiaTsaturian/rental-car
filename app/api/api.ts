import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PRIVATE_API_CARS,
  withCredentials: true,
});
