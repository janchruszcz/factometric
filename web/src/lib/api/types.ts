export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;  // Rails ActiveModel::Errors format
    error?: string;  // Simple error message format
    status?: number;
  }
  
  export interface ApiPagination {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    errors?: Record<string, string[]>;
    metadata?: {
        pagination?: ApiPagination;
    };
  }
  
  export interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
    suppressErrors?: boolean;
  }
  