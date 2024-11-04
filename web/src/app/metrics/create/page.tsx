'use client';

import { useRouter } from 'next/navigation';
import { metricsApi } from '@/lib/api/metrics';
import MetricForm, { MetricFormData } from '../components/MetricForm';

export default function CreateMetricForm() {
  const router = useRouter();

  const onSubmit = async (values: MetricFormData) => {
    try {
      const response = await metricsApi.createMetric(values);
      router.push('/metrics');
    } catch (error) {
      console.error('Error creating metric:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      <h1 className="text-2xl font-bold mb-4">New Metric</h1>
      <MetricForm onSubmit={onSubmit} submitButtonText="Create" />
    </div>
  );
}
