import { getToken } from "@/api/utils";
import axios from "axios";

const token = getToken();

export const axiosClient = axios.create({
  baseURL: "https://pamba-web.onrender.com/API",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62",
    "x-access-token": "0837e78c2bbaa018a74ddcf00eda51680ec252377a912baa62",
  },
});
