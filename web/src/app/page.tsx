'use client';

import { useState, useEffect } from 'react';
import { AppLineChart } from '@/components/app-line-chart';
import { dashboardApi } from '@/lib/api/dashboard';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';

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
        <h2 className="text-lg font-semibold tracking-wide">Dashboard</h2>
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
        <div className="border-r border-b rounded-br-lg border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4">
          <AppLineChart 
            data={dashboardData?.engagement_metrics} 
            title="Engagement" 
          />
        </div>
        <div className="border-l border-b rounded-bl-lg border-gray-200 bg-gradient-to-bl from-white to-gray-50 p-4">
          <AppLineChart 
            data={dashboardData?.acquisition_metrics} 
            title="Acquisition" 
          />
        </div>
        <div className="border-t border-r rounded-tr-lg border-gray-200 bg-gradient-to-tr from-white to-gray-50 p-4">
          <AppLineChart 
            data={dashboardData?.revenue_metrics} 
            title="Revenue" 
          />
        </div>
        <div className="border-t border-l rounded-tl-lg border-gray-200 bg-gradient-to-tl from-white to-gray-50 p-4">
          <AppLineChart 
            data={dashboardData?.feature_metrics} 
            title="Feature" 
          />
        </div>
      </div>
    </div>
  );
}
