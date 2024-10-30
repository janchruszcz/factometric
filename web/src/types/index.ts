export interface Metric {
    id: string;
    name: string;
    value: number;
    timestamp: string;
    category?: string;
    created_at: string;
}
  
export interface MetricStats {
    by_minute: AggregatedMetric[];
    by_hour: AggregatedMetric[];
    by_day: AggregatedMetric[];
}
  
export interface AggregatedMetric {
    period: string;
    average: number;
    count: number;
    maximum: number;
    minimum: number;
}