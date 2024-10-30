class Api::V1::DashboardController < ApplicationController
  wrap_parameters false

  def index
    time_granularity = params[:time_granularity] || "daily"
    dashboard_metrics(time_granularity)

    render json: { data: { engagement_metrics: @engagement_metrics, 
                           acquisition_metrics: @acquisition_metrics, 
                           revenue_metrics: @revenue_metrics, 
                           feature_metrics: @feature_metrics } }
  end

  private

  def dashboard_metrics(time_granularity)
    @engagement_metrics = engagement_metrics(time_granularity)
    @acquisition_metrics = acquisition_metrics(time_granularity)
    @revenue_metrics = revenue_metrics(time_granularity)
    @feature_metrics = feature_metrics(time_granularity)
  end

  def engagement_metrics(time_granularity)
    Metric.where(category: 'engagement', granularity: time_granularity, timestamp: 14.days.ago..)
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .group_by { |m| m.timestamp.strftime("%Y-%m-%d") }
          .transform_values { |daily_metrics| daily_metrics.sum(&:value).round(2) }
          .map { |timestamp, value| { timestamp: timestamp, value: value } }
          .sort_by { |entry| entry[:timestamp] }
      end
  end

  def acquisition_metrics(time_granularity)
    metrics = Metric.where(category: 'acquisition', granularity: time_granularity, timestamp: 14.days.ago..)
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .group_by { |m| m.timestamp.strftime("%Y-%m-%d") }
          .transform_values { |daily_metrics| daily_metrics.sum(&:value) / daily_metrics.size.to_f }
          .map { |timestamp, value| { timestamp: timestamp, value: value } }
      end
  end

  def revenue_metrics(time_granularity)
    metrics = Metric.where(category: 'revenue', granularity: time_granularity, timestamp: 14.days.ago..)
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .group_by { |m| m.timestamp.strftime("%Y-%m-%d") }
          .transform_values { |daily_metrics| daily_metrics.sum(&:value) }
          .map { |timestamp, value| { timestamp: timestamp, value: value } }
      end
  end

  def feature_metrics(time_granularity)
    metrics = Metric.where(category: 'feature', granularity: time_granularity, timestamp: 14.days.ago..)
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .group_by { |m| m.timestamp.strftime("%Y-%m-%d") }
          .transform_values { |daily_metrics| daily_metrics.sum(&:value) / daily_metrics.size.to_f }
          .map { |timestamp, value| { timestamp: timestamp, value: value } }
      end
  end
end
