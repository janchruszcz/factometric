# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

puts "Clearing existing metrics..."
Metric.delete_all

module MetricSeeder
  module_name = self.name

  # Daily metrics (measured once per day)
  ENGAGEMENT_METRICS_DAILY = {
    'daily_active_users' => { min: 70, max: 100, unit: 'count' },
    'retention_rate' => { min: 70, max: 95, unit: 'percentage' },
    'average_session_duration' => { min: 45, max: 90, unit: 'minutes' }
  }

  # Hourly metrics
  ENGAGEMENT_METRICS_HOURLY = {
    'active_users_per_hour' => { min: 100, max: 500, unit: 'count' },
    'session_starts' => { min: 50, max: 200, unit: 'count' },
    'feature_interactions' => { min: 200, max: 1000, unit: 'count' }
  }

  # Minute metrics
  ENGAGEMENT_METRICS_MINUTE = {
    'current_active_sessions' => { min: 20, max: 100, unit: 'count' },
    'concurrent_users' => { min: 10, max: 50, unit: 'count' },
    'active_api_connections' => { min: 5, max: 30, unit: 'count' }
  }

  # Daily acquisition metrics
  ACQUISITION_METRICS_DAILY = {
    'new_user_signups' => { min: 10, max: 50, unit: 'count' },
    'signup_conversion_rate' => { min: 2, max: 8, unit: 'percentage' },
    'trial_starts' => { min: 5, max: 25, unit: 'count' }
  }

  # Hourly acquisition metrics
  ACQUISITION_METRICS_HOURLY = {
    'landing_page_visitors' => { min: 50, max: 200, unit: 'count' },
    'signup_form_starts' => { min: 10, max: 40, unit: 'count' },
    'demo_requests' => { min: 1, max: 10, unit: 'count' }
  }

  # Daily revenue metrics
  REVENUE_METRICS_DAILY = {
    'daily_revenue' => { min: 1000, max: 5000, unit: 'currency' },
    'new_subscriptions' => { min: 5, max: 20, unit: 'count' },
    'upgrade_rate' => { min: 1, max: 5, unit: 'percentage' }
  }

  # Hourly revenue metrics
  REVENUE_METRICS_HOURLY = {
    'transaction_volume' => { min: 10, max: 50, unit: 'count' },
    'checkout_starts' => { min: 5, max: 25, unit: 'count' },
    'payment_attempts' => { min: 5, max: 20, unit: 'count' }
  }

  # Daily feature metrics
  FEATURE_METRICS_DAILY = {
    'feature_adoption_rate' => { min: 20, max: 60, unit: 'percentage' },
    'feature_retention' => { min: 40, max: 80, unit: 'percentage' },
    'feature_satisfaction_score' => { min: 3.5, max: 4.8, unit: 'score' }
  }

  # Hourly feature metrics
  FEATURE_METRICS_HOURLY = {
    'feature_usage_count' => { min: 100, max: 500, unit: 'count' },
    'feature_load_time' => { min: 100, max: 500, unit: 'milliseconds' },
    'feature_error_rate' => { min: 0.1, max: 2, unit: 'percentage' }
  }

  SOURCES = ['web', 'mobile_app', 'api', 'system']
  
  class << self
    def generate_value(min, max)
      rand(min..max)
    end

    def generate_tags(category, metric_name)
      tags = [category, metric_name.split('_')]
      tags.flatten.uniq
    end

    def generate_metadata(metric_name, unit)
      {
        unit: unit,
        description: "#{metric_name.titleize} - #{unit}",
        alert_threshold: {
          warning: 0.75,
          critical: 0.9
        }
      }
    end
  end
end

puts "Generating metrics..."
start_time = Time.current
total_metrics = 0

# Generate daily metrics
[
  ['engagement', MetricSeeder::ENGAGEMENT_METRICS_DAILY],
  ['acquisition', MetricSeeder::ACQUISITION_METRICS_DAILY],
  ['revenue', MetricSeeder::REVENUE_METRICS_DAILY],
  ['feature', MetricSeeder::FEATURE_METRICS_DAILY]
].each do |category, metrics_config|
  puts "Generating daily #{category} metrics..."
  metrics_config.each do |metric_name, config|
    (30.days.ago.to_i..Time.current.to_i).step(1.day) do |timestamp|
      Metric.create!(
        name: metric_name,
        value: MetricSeeder.generate_value(config[:min], config[:max]),
        timestamp: Time.at(timestamp),
        category: category,
        granularity: 'daily',
        source: MetricSeeder::SOURCES.sample,
        tags: MetricSeeder.generate_tags(category, metric_name),
        metadata: MetricSeeder.generate_metadata(metric_name, config[:unit])
      )
      total_metrics += 1
    end
  end
end

# Generate hourly metrics for the last 7 days
[
  ['engagement', MetricSeeder::ENGAGEMENT_METRICS_HOURLY],
  ['acquisition', MetricSeeder::ACQUISITION_METRICS_HOURLY],
  ['revenue', MetricSeeder::REVENUE_METRICS_HOURLY],
  ['feature', MetricSeeder::FEATURE_METRICS_HOURLY]
].each do |category, metrics_config|
  puts "Generating hourly #{category} metrics..."
  metrics_config.each do |metric_name, config|
    (7.days.ago.to_i..Time.current.to_i).step(1.hour) do |timestamp|
      Metric.create!(
        name: metric_name,
        value: MetricSeeder.generate_value(config[:min], config[:max]),
        timestamp: Time.at(timestamp),
        category: category,
        granularity: 'hourly',
        source: MetricSeeder::SOURCES.sample,
        tags: MetricSeeder.generate_tags(category, metric_name),
        metadata: MetricSeeder.generate_metadata(metric_name, config[:unit])
      )
      total_metrics += 1
    end
  end
end

# Generate minute metrics for the last 24 hours
[
  ['engagement', MetricSeeder::ENGAGEMENT_METRICS_MINUTE]
  # Add other minute-level metrics if needed
].each do |category, metrics_config|
  puts "Generating minute #{category} metrics..."
  metrics_config.each do |metric_name, config|
    (24.hours.ago.to_i..Time.current.to_i).step(1.minute) do |timestamp|
      Metric.create!(
        name: metric_name,
        value: MetricSeeder.generate_value(config[:min], config[:max]),
        timestamp: Time.at(timestamp),
        category: category,
        granularity: 'minute',
        source: MetricSeeder::SOURCES.sample,
        tags: MetricSeeder.generate_tags(category, metric_name),
        metadata: MetricSeeder.generate_metadata(metric_name, config[:unit])
      )
      total_metrics += 1
    end
  end
end

end_time = Time.current
duration = (end_time - start_time).round(2)

puts "Seed completed!"
puts "Generated #{total_metrics} metrics in #{duration} seconds"
