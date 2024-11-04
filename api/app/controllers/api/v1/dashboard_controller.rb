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

  def time_range_for_granularity(granularity)
    case granularity
    when "minute"
      30.minutes.ago..
    when "hourly"
      24.hours.ago..
    else # daily
      14.days.ago..
    end
  end

  def format_timestamp(timestamp, granularity)
    case granularity
    when "minute", "hourly"
      timestamp.strftime("%H:%M")
    else
      timestamp.strftime("%Y-%m-%d")
    end
  end

  def engagement_metrics(time_granularity)
    Metric.where(category: 'engagement', 
                granularity: time_granularity, 
                timestamp: time_range_for_granularity(time_granularity))
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .map { |m| { timestamp: format_timestamp(m.timestamp, time_granularity), value: m.value } }
          .sort_by { |entry| entry[:timestamp] }
      end
  end

  def acquisition_metrics(time_granularity)
    Metric.where(category: 'acquisition', 
                granularity: time_granularity, 
                timestamp: time_range_for_granularity(time_granularity))
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .map { |m| { timestamp: format_timestamp(m.timestamp, time_granularity), value: m.value } }
          .sort_by { |entry| entry[:timestamp] }
      end
  end

  def revenue_metrics(time_granularity)
    Metric.where(category: 'revenue', 
                granularity: time_granularity, 
                timestamp: time_range_for_granularity(time_granularity))
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .map { |m| { timestamp: format_timestamp(m.timestamp, time_granularity), value: m.value } }
          .sort_by { |entry| entry[:timestamp] }
      end
  end

  def feature_metrics(time_granularity)
    Metric.where(category: 'feature', 
                granularity: time_granularity, 
                timestamp: time_range_for_granularity(time_granularity))
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .map { |m| { timestamp: format_timestamp(m.timestamp, time_granularity), value: m.value } }
          .sort_by { |entry| entry[:timestamp] }
      end
  end
end
