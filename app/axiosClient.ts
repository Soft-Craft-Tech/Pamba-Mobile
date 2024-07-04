import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://your-api-base-url.com",
});

export default axiosClient;
