import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "../configs/api-configs";

export interface IResponse<T = any> {
  status: number;
  data: T;
}

export const TOKEN_KEY = "token";

class APIRequest {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  //Attach token before every request
  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  //Handle global response errors
  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
        }
        return Promise.reject(error);
      }
    );
  }

  //HTTP Methods
  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return { status: response.status, data: response.data };
  }

  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return { status: response.status, data: response.data };
  }

  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return { status: response.status, data: response.data };
  }

  protected async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return { status: response.status, data: response.data };
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return { status: response.status, data: response.data };
  }

  //File upload (multipart/form-data)
  protected async upload<T>(
    url: string,
    formData: FormData,
    onProgress?: (percentage: number) => void
  ): Promise<IResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          const percentage = Math.round((event.loaded * 100) / event.total);
          onProgress(percentage);
        }
      },
    });
    return { status: response.status, data: response.data };
  }
}
