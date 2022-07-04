import type { AxiosInstance } from "axios";
import axios from "axios";
import qs from "qs";

// noinspection JSUnusedGlobalSymbols
export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
});
interface ServiceOptions {
  axios?: AxiosInstance;
}
export const axiosInstance = axios.create({
  paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
});

axiosInstance.interceptors.request.use(
  // TODO: must be real backend url;
  async () => "someUrl",
  (error) => Promise.reject(error)
);
const serviceOptions: ServiceOptions = {};

serviceOptions.axios = axiosInstance;

export function setApiToken(token: string | null) {
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete apiInstance.defaults.headers.common.Authorization;
  }
}
