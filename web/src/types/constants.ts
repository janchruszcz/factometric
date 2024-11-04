import { MetricCategory, MetricGranularity } from "./definitions";

export const METRIC_CATEGORIES = ['engagement', 'acquisition', 'revenue', 'feature'] as const;

export const METRIC_GRANULARITIES = ['minute', 'hourly', 'daily'] as const;

export const metrics = {
  engagement: {
    daily: [
      'daily_active_users',
      'retention_rate',
      'average_session_duration'
    ],
    hourly: [
      'active_users_per_hour',
      'session_starts',
      'feature_interactions'
    ],
    minute: [
      'current_active_sessions',
      'concurrent_users',
      'active_api_connections'
    ]
  },
  acquisition: {
    daily: [
      'new_user_signups',
      'signup_conversion_rate',
      'trial_starts'
    ],
    hourly: [
      'landing_page_visitors',
      'signup_form_starts',
      'demo_requests'
    ],
    minute: [
      'visitor_count',
      'signup_attempts',
      'referral_clicks'
    ]
  },
  revenue: {
    daily: [
      'daily_revenue',
      'new_subscriptions',
      'upgrade_rate'
    ],
    hourly: [
      'transaction_volume',
      'checkout_starts',
      'payment_attempts'
    ],
    minute: [
      'active_checkouts',
      'transaction_attempts',
      'revenue_per_minute'
    ]
  },
  feature: {
    daily: [
      'feature_adoption_rate',
      'feature_retention',
      'feature_satisfaction_score'
    ],
    hourly: [
      'feature_usage_count',
      'feature_load_time',
      'feature_error_rate'
    ],
    minute: [
      'api_requests',
      'active_features',
      'error_count'
    ]
  }
} as const;

// Helper to get metrics for a specific category and granularity
export function getMetrics(category: MetricCategory, granularity: MetricGranularity): readonly string[] {
  return metrics[category][granularity];
}

// Helper to get all metrics for a category
export function getCategoryMetrics(category: MetricCategory): string[] {
  return [
    ...metrics[category].daily,
    ...metrics[category].hourly,
    ...metrics[category].minute
  ];
}

// Helper to get all metrics for a granularity
export function getGranularityMetrics(granularity: MetricGranularity): string[] {
  return METRIC_CATEGORIES.flatMap(category => metrics[category][granularity]);
}
