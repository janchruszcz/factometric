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
    @engagement_metrics = fetch_metrics('engagement', time_granularity)
    @acquisition_metrics = fetch_metrics('acquisition', time_granularity)
    @revenue_metrics = fetch_metrics('revenue', time_granularity)
    @feature_metrics = fetch_metrics('feature', time_granularity)
  end

  def fetch_metrics(category, time_granularity)
    Metric.where(category: category, 
                granularity: time_granularity, 
                timestamp: time_range_for_granularity(time_granularity))
      .group_by(&:name)
      .transform_values do |metrics_by_name|
        metrics_by_name
          .map { |m| { timestamp: format_timestamp(m.timestamp, time_granularity), value: m.value } }
          .sort_by { |entry| entry[:timestamp] }
      end
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
end
