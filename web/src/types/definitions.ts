import { METRIC_CATEGORIES, METRIC_GRANULARITIES, metrics } from './constants';

export interface Metric {
    id: string;
    name: string;
    value: number;
    timestamp: string;
    category?: string;
    created_at: string;
    unit?: string;
    granularity?: string;
    source?: string;
    tags: string[];
}

export type MetricCategory = (typeof METRIC_CATEGORIES)[number];

export type MetricGranularity = (typeof METRIC_GRANULARITIES)[number];

// Type for any metric name
export type MetricName = (typeof metrics)[MetricCategory][MetricGranularity][number];

// Type for metric source
export type MetricSource = 'api' | 'web' | 'mobile_app' | 'system';

// Type for chart configuration
export interface ChartConfig {
    [key: string]: {
        label: string;
        color?: string;
        theme?: {
            light?: string;
            dark?: string;
        };
        icon?: React.ComponentType;
    };
}

// Type for dashboard data
export interface DashboardData {
    [key: string]: {
        timestamp: string;
        value: number;
    }[];
}