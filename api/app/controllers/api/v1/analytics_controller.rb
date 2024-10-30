class Api::V1::AnalyticsController < ApplicationController
  def index
    metrics = Metric.where(
      category: params[:category],
      granularity: params[:granularity],
      name: params[:metric],
      timestamp: params[:start_date]..params[:end_date]
    )
    .group_by { |m| m.timestamp.strftime("%Y-%m-%d") }
    .transform_values { |daily_metrics| daily_metrics.sum(&:value) }
    .map { |timestamp, value| { timestamp: timestamp, value: value } }
    .sort_by { |entry| entry[:timestamp] }

    render json: { data: metrics }
  end
end
