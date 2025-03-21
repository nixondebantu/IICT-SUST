import axios from "axios";
import { APIUrl } from "../constants/url.config";
import JWTService from "../services/cookies.service";

const httpClient = axios.create({
  baseURL: APIUrl.base,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = JWTService.getJWT();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
