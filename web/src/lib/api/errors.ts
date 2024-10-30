export class ApiError extends Error {
    public readonly status: number;
    public readonly errors?: Record<string, string[]>;
  
    constructor(message: string, status: number, errors?: Record<string, string[]>) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.errors = errors;
    }
  
    static async fromResponse(response: Response): Promise<ApiError> {
      try {
        const data = await response.json();
        
        // Handle different Rails error formats
        const message = data.error || 
                       data.message || 
                       Object.values(data.errors || {})[0]?.[0] ||
                       'An error occurred';
        
        return new ApiError(message, response.status, data.errors);
      } catch {
        return new ApiError(
          'An unexpected error occurred',
          response.status
        );
      }
    }
  
    // Helper to format errors for display
    getFieldError(field: string): string | undefined {
      return this.errors?.[field]?.[0];
    }
  
    // Get all errors as a flat array of messages
    getAllErrors(): string[] {
      if (!this.errors) return [this.message];
      return Object.values(this.errors).flat();
    }
  }