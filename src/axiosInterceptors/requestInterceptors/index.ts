import { AxiosError, AxiosRequestConfig } from "axios";

export const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  return request;
}

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (error.message.includes(" 401")) {
    if (localStorage.getItem("loginToken")) {
      localStorage.clear();
      window.location.reload();
    }
  }
  return Promise.reject(error);
}