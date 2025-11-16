import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  // baseURL: 'https://travellers-back.onrender.com',
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});