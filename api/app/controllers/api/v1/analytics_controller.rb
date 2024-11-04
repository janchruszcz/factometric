class Api::V1::AnalyticsController < ApplicationController
  wrap_parameters false

  def index
    metrics = Metric.where(
      category: params[:category],
      granularity: params[:granularity],
      name: params[:metric],
      timestamp: params[:start_date]..params[:end_date]
    )
    .map { |m| { timestamp: format_timestamp(m.timestamp, params[:granularity]), value: m.value } }
    .sort_by { |entry| entry[:timestamp] }

    render json: { data: { metrics: metrics, average: calculate_average(metrics) } }
  end

  private

  def format_timestamp(timestamp, granularity)
    case granularity
    when "minute", "hourly"
      timestamp.strftime("%H:%M %d-%m-%Y")
    else
      timestamp.strftime("%Y-%m-%d %Z")
    end
  end
  
  def calculate_average(metrics)
    (metrics.sum { |entry| entry[:value] } / metrics.size.to_f).round(2) rescue 0
  end
end
