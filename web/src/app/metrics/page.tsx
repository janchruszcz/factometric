'use client';

import React, { useEffect, useState, Suspense } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { metricsApi } from '@/lib/api/metrics';
import type { Metric } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Loading from './loading';

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setGranularity(value);
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

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await metricsApi.getMetrics({
          page: currentPage,
          search: search,
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
  }, [currentPage, search, startDate, endDate, category, granularity, source]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      
      <div className="grid grid-rows-2">
        <h1 className="text-2xl font-bold mb-4">Metrics</h1>
        <div className="flex gap-2">
          <Input placeholder="Search" onChange={handleSearch} />
          <Input type="datetime-local" placeholder="Start Date" onChange={handleStartDateChange} />
          <Input type="datetime-local" placeholder="End Date" onChange={handleEndDateChange} />
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="acquisition">Acquisition</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
            </SelectContent>
          </Select>
          <Select value={granularity} onValueChange={handleGranularityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select granularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="minute">Minute</SelectItem>
            </SelectContent>
          </Select>
          <Select value={source} onValueChange={handleSourceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile_app">Mobile App</SelectItem>
              <SelectItem value="api">API</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link href="/metrics/create">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Granularity</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Suspense>
          <TableBody>
              {metrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{metric.value}</TableCell>
                <TableCell>{metric.unit || 'N/A'}</TableCell>
                <TableCell>{metric.category || 'N/A'}</TableCell>
                <TableCell>{metric.granularity || 'N/A'}</TableCell>
                <TableCell>{new Date(metric.timestamp).toLocaleString()}</TableCell>
                <TableCell>{metric.source || 'N/A'}</TableCell>
                <TableCell>{metric.tags.join(', ') || 'N/A'}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="" asChild>
                    <Link href={`/metrics/${metric.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/metrics/${metric.id}`}>
                      <Trash className="h-4 w-4" />
                    </Link>
                  </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Suspense>
      </Table>

      <div className="mt-4 cursor-default">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
                1
              </PaginationLink>
            </PaginationItem>

            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {currentPage > 2 && currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage)} isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink 
                  onClick={() => handlePageChange(totalPages)} 
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MetricsPage;
