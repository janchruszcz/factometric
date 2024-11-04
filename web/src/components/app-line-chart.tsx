"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  // Engagement metrics
  daily_active_users: {
    label: "Daily Active Users",
    color: "#2563eb", // blue
  },
  retention_rate: {
    label: "Retention Rate",
    color: "#82ca9d", // green
  },
  average_session_duration: {
    label: "Avg Session Duration",
    color: "#ff7300", // orange
  },
  active_users_per_hour: {
    label: "Active Users/Hour",
    color: "#d53f8c", // pink
  },
  session_starts: {
    label: "Session Starts",
    color: "#8b5cf6", // purple
  },
  feature_interactions: {
    label: "Feature Interactions",
    color: "#ef4444", // red
  },
  current_active_sessions: {
    label: "Current Sessions",
    color: "#14b8a6", // teal
  },
  concurrent_users: {
    label: "Concurrent Users",
    color: "#f59e0b", // amber
  },
  active_api_connections: {
    label: "API Connections",
    color: "#6366f1", // indigo
  },

  // Acquisition metrics
  new_user_signups: {
    label: "New Signups",
    color: "#ec4899", // pink
  },
  signup_conversion_rate: {
    label: "Conversion Rate",
    color: "#84cc16", // lime
  },
  trial_starts: {
    label: "Trial Starts",
    color: "#7c3aed", // violet
  },
  landing_page_visitors: {
    label: "Landing Visitors",
    color: "#06b6d4", // cyan
  },
  signup_form_starts: {
    label: "Form Starts",
    color: "#eab308", // yellow
  },
  demo_requests: {
    label: "Demo Requests",
    color: "#f43f5e", // rose
  },

  // Revenue metrics
  daily_revenue: {
    label: "Daily Revenue",
    color: "#0ea5e9", // sky
  },
  new_subscriptions: {
    label: "New Subscriptions",
    color: "#2563eb", // blue
  },
  upgrade_rate: {
    label: "Upgrade Rate",
    color: "#82ca9d", // green
  },
  transaction_volume: {
    label: "Transaction Volume",
    color: "#ff7300", // orange
  },
  checkout_starts: {
    label: "Checkout Starts",
    color: "#d53f8c", // pink
  },
  payment_attempts: {
    label: "Payment Attempts",
    color: "#8b5cf6", // purple
  },

  // Feature metrics
  feature_adoption_rate: {
    label: "Adoption Rate",
    color: "#ef4444", // red
  },
  feature_retention: {
    label: "Feature Retention",
    color: "#14b8a6", // teal
  },
  feature_satisfaction_score: {
    label: "Satisfaction Score",
    color: "#f59e0b", // amber
  },
  feature_usage_count: {
    label: "Usage Count",
    color: "#6366f1", // indigo
  },
  feature_load_time: {
    label: "Load Time",
    color: "#ec4899", // pink
  },
  feature_error_rate: {
    label: "Error Rate",
    color: "#84cc16", // lime
  },
} satisfies ChartConfig

export function AppLineChart({ 
  data, 
}: { 
  data: any, 
}) {
  if (!data) return null;

  // Generate a random color for metrics not in chartConfig
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  // Get metric config with fallback for unknown metrics
  const getMetricConfig = (key: string) => {
    return chartConfig[key as keyof typeof chartConfig] || {
      label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      color: getRandomColor()
    };
  };

  const combinedData = Object.values(data)[0]?.map((item, index) => {
    const dataPoint: any = {
      timestamp: item.timestamp,
    };
    
    Object.entries(data).forEach(([metricName, values]) => {
      dataPoint[metricName] = parseFloat(values[index].value);
    });

    return dataPoint;
  });

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={combinedData} width={500} height={250}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{fontSize: 10}}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(combinedData?.[0] || {})
            .filter(key => key !== 'timestamp')
            .map(key => {
              const config = getMetricConfig(key);
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={config.label}
                  stroke={config.color}
                  strokeWidth={2}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
