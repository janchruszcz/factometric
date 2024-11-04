'use client';

import { useRouter } from 'next/navigation';
import { metricsApi } from '@/lib/api/metrics';
import MetricForm, { MetricFormData } from '../../components/MetricForm';
import { useEffect, useState } from 'react';
import React from 'react';
import Loading from '../../loading';

export default function EditMetricForm({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<MetricFormData | null>(null);
  const unwrappedParams = React.use(params);

  useEffect(() => {
    const fetchMetric = async () => {
      try {
        const metric = await metricsApi.getMetric(unwrappedParams.id);
        setInitialData({
          name: metric.name,
          value: metric.value,
          timestamp: metric.timestamp.slice(0, 16), // Format timestamp for datetime-local input
          category: metric.category,
          granularity: metric.granularity,
          source: metric.source,
          tags: metric.tags,
        });
      } catch (error) {
        console.error('Error fetching metric:', error);
        router.push('/metrics');
      }
    };

    fetchMetric();
  }, [unwrappedParams.id, router]);

  const onSubmit = async (values: MetricFormData) => {
    try {
      const response = await metricsApi.updateMetric(unwrappedParams.id, values);
      router.push('/metrics');
    } catch (error) {
      console.error('Error updating metric:', error);
    }
  };

  if (!initialData) {
    return <Loading />;
  }

  return (
    <div className="max-w-md mx-auto mt-3">
      <h1 className="text-2xl font-bold mb-4">Edit Metric</h1>
      <MetricForm initialData={initialData} onSubmit={onSubmit} submitButtonText="Update" />
    </div>
  );
}
