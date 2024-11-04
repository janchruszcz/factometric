require 'test_helper'

class Api::V1::AnalyticsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @metric1 = metrics(:one)
    @metric2 = metrics(:two)
  end

  test "should get index with valid params" do
    get api_v1_analytics_url, params: {
      category: 'engagement',
      granularity: 'daily',
      metric: 'page_views',
      start_date: 2.days.ago,
      end_date: Time.current
    }, as: :json

    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_equal 2, response_body['data']['metrics'].length
    assert_equal 50.5, response_body['data']['average']
    assert_match /%H:%M %d-%m-%Y/, response_body['data']['metrics'].first['timestamp']
  end

  test "should return empty metrics with invalid params" do
    get api_v1_analytics_url, params: {
      category: 'invalid',
      granularity: 'hourly',
      metric: 'cpu_usage',
      start_date: 2.hours.ago,
      end_date: Time.current
    }, as: :json

    assert_response :bad_request
    
    response_body = JSON.parse(response.body)
    assert_empty response_body['data']['metrics']
    assert_equal 0, response_body['data']['average']
  end

  test "should format timestamp based on granularity" do
    get api_v1_analytics_url, params: {
      category: 'performance',
      granularity: 'daily',
      metric: 'cpu_usage',
      start_date: 2.hours.ago,
      end_date: Time.current
    }, as: :json

    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_match /%Y-%m-%d %Z/, response_body['data']['metrics'].first['timestamp']
  end
end