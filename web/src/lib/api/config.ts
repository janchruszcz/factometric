export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    API_PATH: '/api/v1',
    DEFAULT_HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    // TIMEOUT: 10000, // 10 seconds
    // RETRY_ATTEMPTS: 3,
    // RETRY_DELAY: 1000, // 1 second
    CORS_COFIG: {
        credentials: 'include' as RequestCredentials,
        mode: 'cors' as RequestMode,
    }
} as const;
