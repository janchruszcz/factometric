'use client';

import { useState, useEffect } from 'react';
import { AppLineChart } from '@/components/app-line-chart';
import { dashboardApi } from '@/lib/api/dashboard';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [timeGranularity, setTimeGranularity] = useState('daily');

  const handleTimeGranularityChange = (value: string) => {
    setTimeGranularity(value);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardApi.getDashboardData({ time_granularity: timeGranularity });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [timeGranularity]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-foreground font-semibold tracking-wide">Dashboard</h2>
        <div className="w-1/3">
          <Select value={timeGranularity} onValueChange={handleTimeGranularityChange}>
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
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <AppLineChart 
              data={dashboardData?.engagement_metrics} 
            />
          </CardContent>
        </Card>
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <AppLineChart 
              data={dashboardData?.acquisition_metrics} 
            />
          </CardContent>
        </Card>
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <AppLineChart 
              data={dashboardData?.revenue_metrics} 
            />
          </CardContent>
        </Card>
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <AppLineChart 
              data={dashboardData?.feature_metrics} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
