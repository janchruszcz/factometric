'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyticsApi } from '@/lib/api/analytics';
import { Input } from '@/components/ui/input';

const AnalyticsPage = () => {
  const categoryMetrics = {
    engagement: ['daily_active_users', 'weekly_active_users', 'monthly_active_users'],
    acquisition: ['signup_rate', 'daily_new_users', 'weekly_new_users'],
    revenue: ['daily_revenue', 'weekly_revenue', 'monthly_revenue'],
    feature: ['daily_feature_usage', 'weekly_feature_usage', 'monthly_feature_usage'],
  };

  const [metric, setMetric] = useState('');
  const [category, setCategory] = useState('');
  const [granularity, setGranularity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);

  // Remove mock data as we'll use analyticsData from the API

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      // Only fetch if all required fields are filled
      if (metric && startDate && endDate) {
        const response = await analyticsApi.getAnalyticsData({
          metric,
          category,
          start_date: startDate,
          end_date: endDate,
          granularity,
        });
        setAnalyticsData(response.data);
      }
    };

    fetchAnalyticsData();
  }, [metric, category, startDate, endDate, granularity]);

  // Add validation check for rendering chart
  const canShowChart = metric && startDate && endDate && analyticsData.length > 0;

  // Add this handler to reset metric when category changes
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setMetric(''); // Reset metric when category changes
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="flex justify-between items-center mx-12">
        <div className="flex flex-col gap-4 w-1/3">
            <div className="space-y-2">
                <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="acquisition">Acquisition</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Select onValueChange={setGranularity}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select granularity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="minute">Minute</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Select onValueChange={setMetric} disabled={!category}>
                    <SelectTrigger>
                    <SelectValue placeholder={category ? "Select a metric" : "Please select a category & granularity first"} />
                    </SelectTrigger>
                    <SelectContent>
                    {category && categoryMetrics[category].map((metricOption) => (
                        <SelectItem key={metricOption} value={metricOption}>
                        {metricOption.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
        
            <div className="space-y-2">
                <Input
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            
            <div className="space-y-2">
                <Input
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>
      
      {canShowChart ? (
        <div className="h-[400px] mt-32 mr-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData} width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name={metric} stroke="#ff365e" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[400px] m-auto flex justify-center items-center text-center text-gray-500 underline">
          Please select a metric, start date, and end date to view the chart
        </div>
      )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
