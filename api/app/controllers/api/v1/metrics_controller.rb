class Api::V1::MetricsController < ApplicationController
  include Pagy::Backend

  # GET /metrics
  def index
    @metrics = Metric.all

    @metrics = @metrics.where('name LIKE ?', "%#{params[:search]}%") if params[:search].present?
    @metrics = @metrics.where(category: params[:category]) if params[:category].present?
    @metrics = @metrics.where(granularity: params[:granularity]) if params[:granularity].present?
    @metrics = @metrics.where('timestamp >= ?', params[:start_date]) if params[:start_date].present?
    @metrics = @metrics.where('timestamp <= ?', params[:end_date]) if params[:end_date].present?
    @metrics = @metrics.where(source: params[:source]) if params[:source].present?

    @pagy, @metrics = pagy(@metrics)
    render json: { data: @metrics, headers: pagy_headers_merge(@pagy) }
  end

  # POST /metrics
  def create
    @metric = Metric.new(metric_params)

    if @metric.save
      render json: @metric
    else
      puts "Error creating metric: #{@metric.errors.full_messages}"
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  # GET /metrics/:id
  def show
    @metric = Metric.find(params[:id])
    render json: @metric
  end

  # PUT /metrics/:id
  def update
    @metric = Metric.find(params[:id])
    @metric.update(metric_params)
    render json: @metric
  end

  # DELETE /metrics/:id
  def destroy
    @metric = Metric.find(params[:id])
    @metric.destroy
    render json: { message: 'Metric deleted' }
  end

  private

  def metric_params
    params.require(:metric).permit(:name, :value, :timestamp, :category, :granularity, :source, :metadata, :tags)
  end
end
