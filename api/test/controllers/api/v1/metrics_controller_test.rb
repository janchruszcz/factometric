require 'test_helper'

class Api::V1::MetricsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @metric = metrics(:one)
  end

  test "should get index" do
    get api_v1_metrics_url, as: :json
    assert_response :success
    assert_not_empty @response.parsed_body['data']
  end

  test "should create metric" do
    assert_difference('Metric.count') do
      post api_v1_metrics_url, params: { 
        metric: { 
          name: 'Test Metric', 
          value: 42.0, 
          timestamp: Time.current.strftime('%Y-%m-%dT%H:%M'), 
          category: 'engagement',
          granularity: 'daily',
          source: 'web',
          tags: ['test', 'engagement'],
          metadata: {
            unit: 'count',
            description: 'Test metric description'
          }
        } 
      }, as: :json
    end

    assert_response :created
    assert_equal 'Test Metric', @response.parsed_body['name']
    assert_equal 'engagement', @response.parsed_body['category']
    assert_equal 'daily', @response.parsed_body['granularity']
  end

  test "should show metric" do
    get api_v1_metric_url(@metric), as: :json
    assert_response :success
    assert_equal @metric.name, @response.parsed_body['name']
  end

  test "should update metric" do
    patch api_v1_metric_url(@metric), params: { 
      metric: { 
        name: 'Updated Metric',
        category: 'engagement'
      } 
    }, as: :json
    
    assert_response :success
    assert_equal 'Updated Metric', @response.parsed_body['name']
  end

  test "should destroy metric" do
    assert_difference('Metric.count', -1) do
      delete api_v1_metric_url(@metric), as: :json
    end

    assert_response :success
    assert_equal 'Metric deleted', @response.parsed_body['message']
  end

  test "should filter metrics by category" do
    get api_v1_metrics_url, params: { category: @metric.category }, as: :json
    if response.status == 400
      puts "Response body: #{response.body}"  # This will show the error message
    end
    assert_response :success
    assert_equal @metric.category, @response.parsed_body['data'].first['category']
  end

  test "should filter metrics by date range" do
    get api_v1_metrics_url, params: { 
      start_date: 1.day.ago.iso8601,
      end_date: Time.current.iso8601 
    }, as: :json
    assert_response :success
    assert_not_empty @response.parsed_body['data']
  end

  test "should filter metrics by source" do
    get api_v1_metrics_url, params: { source: @metric.source }, as: :json
    assert_response :success
    assert_equal @metric.source, @response.parsed_body['data'].first['source']
  end

  test "should filter metrics by granularity" do
    get api_v1_metrics_url, params: { granularity: @metric.granularity }, as: :json
    assert_response :success
    assert_equal @metric.granularity, @response.parsed_body['data'].first['granularity']
  end

  test "should validate required fields" do
    post api_v1_metrics_url, params: { 
      metric: { 
        value: 42.0 
      } 
    }, as: :json
    
    assert_response :unprocessable_entity
    error_response = @response.parsed_body
    assert_kind_of Hash, error_response
    assert error_response.key?('name') || error_response.key?('timestamp') || 
           error_response.key?('category') || error_response.key?('granularity')
  end

  test "should search metrics by name" do
    get api_v1_metrics_url, params: { search: @metric.name[0..3] }, as: :json
    assert_response :success
    assert_not_empty @response.parsed_body['data']
    assert_includes @response.parsed_body['data'].first['name'], @metric.name[0..3]
  end
end
