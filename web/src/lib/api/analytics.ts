import { api } from './client';
import type { RequestConfig } from './types';

export const analyticsApi = {
  getAnalyticsData: async (params: GetAnalyticsDataParams, config?: RequestConfig) => {
    return api.get<AnalyticsData>('/analytics', {
      ...config,
      params,
    });
  },
};
