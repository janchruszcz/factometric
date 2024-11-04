'use client';

import React, { useEffect, useState } from 'react';
import { metricsApi } from '@/lib/api/metrics';
import type { Metric } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Loading from './loading';
import { MetricsFilters } from './components/MetricsFilters';
import { MetricsTable } from './components/MetricsTable';
import { MetricsPagination } from './components/MetricsPagination';
import { useDebounce } from '@/hooks/use-debounce';

const MetricsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [granularity, setGranularity] = useState('daily');
  const [source, setSource] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);


  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearch(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
        setCategory('');
    } else {
        setCategory(value);
    }
  };

  const handleGranularityChange = (value: string) => {
    if (value === 'all') {
        setGranularity('');
    } else {
        setGranularity(value);
    }
  };

  const handleSourceChange = (value: string) => {
    if (value === 'all') {
        setSource('');
    } else {
        setSource(value);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await metricsApi.deleteMetric(id);
      setMetrics(metrics.filter(metric => metric.id !== id));
    } catch (error) {
      console.error('Failed to delete metric:', error);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await metricsApi.getMetrics({
          page: currentPage,
          search: debouncedSearch,
          start_date: startDate,
          end_date: endDate,
          category: category,
          granularity: granularity,
          source: source,
        });
        setMetrics(response.data || []);
        setTotalPages(parseInt(response.headers['total-pages'], 10) || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to fetch metrics');
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [currentPage, debouncedSearch, startDate, endDate, category, granularity, source]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-rows-2">
        <h1 className="text-2xl font-bold mb-4">Metrics</h1>
        <div className="flex justify-between">
          <MetricsFilters
            search={search}
            startDate={startDate}
            endDate={endDate}
            category={category}
            granularity={granularity}
            source={source}
            onSearchChange={handleSearch}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onCategoryChange={handleCategoryChange}
            onGranularityChange={handleGranularityChange}
            onSourceChange={handleSourceChange}
          />
          <Button asChild className="bg-lime-500 hover:bg-lime-400">
            <Link href="/metrics/create">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <MetricsTable 
        metrics={metrics} 
        onDelete={handleDelete} 
        isLoading={loading || isFiltering} 
      />
      <MetricsPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default MetricsPage;
