import { API_URL } from "@/configs/global";
import { ApiError } from "@/types/http-errors.interface";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { errorHandler, networkErrorStrategy } from "./http-error-strategies";

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      const { status } = error?.response;
      if (status >= 400) {
        const errorData: ApiError = error?.response?.data;
        errorHandler[status](errorData);
      }
    } else {
      networkErrorStrategy();
    }
  }
);

async function ApiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await httpService(url, options);
  return response.data as T;
}

async function readData<T>(
  api: string,
  headers?: AxiosRequestHeaders
): Promise<T> {
  const options = {
    method: "GET",
    headers,
  };
  return await ApiBase<T>(api, options);
}

async function createData<TModel, TResult>(
  api: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options = {
    method: "POST",
    headers,
    data: JSON.stringify(data),
  };
  return await ApiBase<TResult>(api, options);
}

async function updateData<TModel, TResult>(
  api: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options = {
    method: "PUT",
    headers,
    data: JSON.stringify(data),
  };
  return await ApiBase<TResult>(api, options);
}

async function deleteData(
  api: string,
  headers?: AxiosRequestHeaders
): Promise<void> {
  const options = {
    method: "DELETE",
    headers,
  };
  return await ApiBase(api, options);
}

export { readData, createData, updateData, deleteData };
