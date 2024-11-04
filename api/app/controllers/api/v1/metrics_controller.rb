class Api::V1::MetricsController < ApplicationController
  include Pagy::Backend

  wrap_parameters false
  rescue_from ArgumentError do |e|
    render json: { error: e.message }, status: :bad_request
  end

  # GET /metrics
  def index
    @metrics = Metric.all

    filter_metrics!

    @pagy, @metrics = pagy(@metrics)
    
    render json: {
      data: @metrics,
      status: :ok,
      headers: pagy_headers_merge(@pagy)
    }
  end

  # POST /metrics
  def create
    @metric = Metric.new(metric_params)

    if @metric.save
      render json: @metric, status: :created
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

  def filter_metrics!
    if params[:search].present?
      @metrics = @metrics.where('name ILIKE ?', "%#{params[:search]}%")
    end
    
    if params[:category].present?
      @metrics = @metrics.where(category: params[:category].to_s)
    end
    
    if params[:granularity].present?
      @metrics = @metrics.where(granularity: params[:granularity].to_s)
    end
    
    if params[:source].present?
      @metrics = @metrics.where(source: params[:source].to_s)
    end
    
    if params[:start_date].present?
      begin
        start_date = Time.zone.parse(params[:start_date].to_s)
        @metrics = @metrics.where('timestamp >= ?', start_date)
      rescue ArgumentError
        # Skip invalid date
      end
    end
    
    if params[:end_date].present?
      begin
        end_date = Time.zone.parse(params[:end_date].to_s)
        @metrics = @metrics.where('timestamp <= ?', end_date)
      rescue ArgumentError
        # Skip invalid date
      end
    end

    @metrics = @metrics.order(timestamp: :desc)
  end

  def metric_params
    params.require(:metric).permit(:name, :value, :timestamp, :category, :granularity, :source, :metadata, :tags)
  end
end
