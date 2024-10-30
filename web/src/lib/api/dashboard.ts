import { api } from './client';
import type { RequestConfig } from './types';

export const dashboardApi = {
  getDashboardData: async (params: { time_granularity: string }, config?: RequestConfig) => {
    return api.get<DashboardData>('/dashboard', {
      ...config,
      params,
    });
  },
};
