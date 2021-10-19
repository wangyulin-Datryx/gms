import { AxiosError, AxiosResponse } from "axios";

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
}

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.message.includes(" 401")) {
    if (localStorage.getItem("loginToken")) {
      localStorage.clear();
      window.location.reload();
    }
  }
  return Promise.reject(error);
}