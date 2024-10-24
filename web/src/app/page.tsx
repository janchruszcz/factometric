import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { AppChart } from '@/components/app-chart';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <div className="">
            <h2 className="text-lg font-semibold mb-4">Latest Metrics</h2>
            
            {/* Charts */}
            <div className="my-5 flex justify-between">
              <div className="flex items-center gap-2">
                <AppChart />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="text-sm">
                <Link href="/metrics/create">Add Metric</Link>
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}