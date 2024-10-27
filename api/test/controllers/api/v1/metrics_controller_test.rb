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
          timestamp: Time.current, 
          category: 'test' 
        } 
      }, as: :json
    end

    assert_response :success
    assert_equal 'Test Metric', @response.parsed_body['name']
  end

  test "should show metric" do
    get api_v1_metric_url(@metric), as: :json
    assert_response :success
    assert_equal @metric.name, @response.parsed_body['name']
  end

  test "should update metric" do
    patch api_v1_metric_url(@metric), params: { 
      metric: { 
        name: 'Updated Metric' 
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
  end

  test "should filter metrics by category" do
    get api_v1_metrics_url, params: { category: @metric.category }, as: :json
    assert_response :success
    assert_equal @metric.category, @response.parsed_body['data'].first['category']
  end

  test "should filter metrics by date range" do
    start_date = 1.day.ago.iso8601
    end_date = Time.current.iso8601
    get api_v1_metrics_url, params: { start_date: start_date, end_date: end_date }, as: :json
    assert_response :success
    assert_not_empty @response.parsed_body['data']
  end
end
