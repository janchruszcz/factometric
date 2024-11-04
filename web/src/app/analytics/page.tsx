'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyticsApi } from '@/lib/api/analytics';
import { Input } from '@/components/ui/input';
import { metrics, type MetricCategory, type MetricGranularity } from '@/types/metrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  const [metric, setMetric] = useState('');
  const [category, setCategory] = useState<MetricCategory | ''>('');
  const [granularity, setGranularity] = useState<MetricGranularity | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analyticsData, setAnalyticsData] = useState({ metrics: [], average: 0 });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
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

  const canShowChart = metric && startDate && endDate && analyticsData.metrics?.length > 0;

  const handleCategoryChange = (newCategory: MetricCategory) => {
    setCategory(newCategory);
    setMetric('');
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="flex justify-between items-start gap-8">
        <Card className="w-1/3 p-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Configure your analytics view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Select onValueChange={(value) => setGranularity(value as MetricGranularity)}>
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
                <Select 
                  onValueChange={setMetric} 
                  disabled={!category || !granularity}
                >
                    <SelectTrigger>
                        <SelectValue 
                          placeholder={category && granularity 
                            ? "Select a metric" 
                            : "Please select a category & granularity first"} 
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {category && granularity && metrics[category][granularity].map((metricOption) => (
                            <SelectItem key={metricOption} value={metricOption}>
                                {metricOption.split('_').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
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
          </CardContent>
        </Card>

        <Card className="w-2/3 h-[410px]">
          <CardHeader>
            {analyticsData.average > 0 && (
              <CardDescription>
                Average in selected period: {analyticsData.average.toLocaleString()}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="h-[400px] mx-12">
            {canShowChart ? (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.metrics} width={600} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name={metric} 
                      stroke="#ff365e" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[320px] mx-auto flex justify-center items-center text-center text-gray-500 underline">
                Please select a metric, start date, and end date to view the chart
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
