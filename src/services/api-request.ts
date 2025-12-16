import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "../configs/api-configs";

export interface IResponse<T = any> {
  status: number;
  data: T;
}

// Token constants
export const TOKEN_KEY = "token";
export const STUDENT_TOKEN_KEY = "studentToken";
export const STAFF_TOKEN_KEY = "staffToken";

// Token type for better type safety (erasable)
export type TokenType = "studentToken" | "staffToken" | "adminToken";

// User data storage keys
export const STUDENT_DATA_KEY = "studentData";
export const STAFF_DATA_KEY = "staffData";

class APIRequest {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  // Attach appropriate token before every request
  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getCurrentToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Handle global response errors
  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const { response } = error;

        if (response?.status === 401) {
          // Unauthorized - clear tokens and redirect
          this.clearAllTokens();
          this.redirectToLogin();
        } else if (response?.status === 403) {
          // Forbidden - user doesn't have permission
          console.error("Access forbidden: Insufficient permissions");
        } else if (response?.status === 429) {
          // Too many requests
          console.error("Too many requests. Please try again later.");
        }

        return Promise.reject(error);
      }
    );
  }

  // Helper method to get current token
  private getCurrentToken(): string | null {
    // Priority: Student token > Staff token > General token
    const studentToken =
      localStorage.getItem(STUDENT_TOKEN_KEY) ||
      sessionStorage.getItem(STUDENT_TOKEN_KEY);

    const staffToken =
      localStorage.getItem(STAFF_TOKEN_KEY) ||
      sessionStorage.getItem(STAFF_TOKEN_KEY);

    return studentToken || staffToken || localStorage.getItem(TOKEN_KEY);
  }

  // Helper method to clear all authentication tokens
  private clearAllTokens(): void {
    // Clear localStorage
    [TOKEN_KEY, STUDENT_TOKEN_KEY, STAFF_TOKEN_KEY].forEach((key) => {
      localStorage.removeItem(key);
    });

    // Clear sessionStorage
    [STUDENT_TOKEN_KEY, STAFF_TOKEN_KEY].forEach((key) => {
      sessionStorage.removeItem(key);
    });
  }

  // Redirect to appropriate login page
  private redirectToLogin(): void {
    const currentPath = window.location.pathname;

    // Don't redirect if already on a login page
    if (
      currentPath.includes("/login") ||
      currentPath.includes("/staff") ||
      currentPath === "/"
    ) {
      return;
    }

    // Redirect to student login by default
    window.location.href = "/";
  }

  // Public method to get current user type
  public getCurrentUserType(): TokenType | null {
    if (
      localStorage.getItem(STUDENT_TOKEN_KEY) ||
      sessionStorage.getItem(STUDENT_TOKEN_KEY)
    ) {
      return "studentToken";
    }
    if (
      localStorage.getItem(STAFF_TOKEN_KEY) ||
      sessionStorage.getItem(STAFF_TOKEN_KEY)
    ) {
      return "staffToken";
    }
    return null;
  }

  // HTTP Methods (keep existing)
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

  // File upload (keep existing)
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

export default APIRequest;
