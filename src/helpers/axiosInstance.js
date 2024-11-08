import axios from "axios";
import { Coin_Gecko_Api } from "./constant";

const axiosInstance = axios.create({
  baseURL: Coin_Gecko_Api,
});

export default axiosInstance;
