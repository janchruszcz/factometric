require 'test_helper'

class Api::V1::DashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get index with default daily granularity" do
    get api_v1_dashboard_url, as: :json
    assert_response :success
    assert_json_structure
  end

  test "should get index with minute granularity" do
    get api_v1_dashboard_url, params: { time_granularity: 'minute' }, as: :json
    assert_response :success
    assert_json_structure
  end

  test "should get index with hourly granularity" do
    get api_v1_dashboard_url, params: { time_granularity: 'hourly' }, as: :json
    assert_response :success
    assert_json_structure
  end

  private

  def assert_json_structure
    response_body = JSON.parse(response.body)
    assert_equal %w[data], response_body.keys
    assert_equal %w[engagement_metrics acquisition_metrics revenue_metrics feature_metrics], 
                 response_body['data'].keys
  end
end