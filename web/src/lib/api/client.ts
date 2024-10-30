import { API_CONFIG } from './config';
import { ApiError } from './errors';
import type { RequestConfig, ApiResponse } from './types';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private defaultConfig: RequestInit;

  constructor() {
    this.baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.API_PATH}`;
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
    this.defaultConfig = { ...API_CONFIG.CORS_CONFIG };
  }

  private getCSRFToken(): string | null {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  }

  private async executeRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, config.params);
    
    try {
      const response = await fetch(url, {
        ...this.defaultConfig,
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
      });

      if (!response.ok && !config.suppressErrors) {
        throw await ApiError.fromResponse(response);
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return {};
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        500
      );
    }
  }

  private buildUrl(endpoint: string, params?: RequestConfig['params']): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  async get<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: 'GET',
    });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
