import { getToken } from "@/api/utils";
import axios from "axios";

const token = getToken();

export const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62",
    "x-access-token": process.env.EXPO_PUBLIC_API_KEY,
  },
});
