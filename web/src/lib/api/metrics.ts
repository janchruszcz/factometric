import type { Metric, MetricStats } from '@/types';
import { api } from './client';
import type { RequestConfig } from './types';

interface GetMetricsParams {
  since?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

interface CreateMetricData {
  name: string;
  value: number;
  timestamp: string;
  category?: string;
}

export const metricsApi = {
  getMetrics: async (params?: GetMetricsParams, config?: RequestConfig) => {
    return api.get<Metric[]>('/metrics', {
      ...config,
      params,
    });
  },

  createMetric: async (data: CreateMetricData, config?: RequestConfig) => {
    return api.post<Metric>('/metrics', { metric: data }, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/json',
      },
    });
  },

  getMetric: async (id: string, config?: RequestConfig) => {
    return api.get<Metric>(`/metrics/${id}`, config);
  },

  updateMetric: async (id: string, data: CreateMetricData, config?: RequestConfig) => {
    return api.put<Metric>(`/metrics/${id}`, { metric: data }, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/json',
      },
    });
  },

  deleteMetric: async (id: string, config?: RequestConfig) => {
    return api.delete<void>(`/metrics/${id}`, config);
  },
};
