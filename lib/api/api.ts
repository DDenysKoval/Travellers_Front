import axios from "axios";
//  + "/api";
const baseURL = process.env.NEXT_PUBLIC_API_URL
export const nextServer = axios.create({
  baseURL: baseURL,
});