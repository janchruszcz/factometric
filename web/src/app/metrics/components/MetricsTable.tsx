import React, { Suspense } from 'react';
import { Table, TableHeader, TableBody, TableLoadingRow, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { Metric } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const MetricsTable: React.FC<MetricsTableProps> = ({ metrics, onDelete }) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Granularity</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
    <Suspense>
      <TableBody>
          {metrics.map((metric) => (
          <TableRow key={metric.id}>
            <TableCell>{metric.name}</TableCell>
            <TableCell>{metric.value}</TableCell>
            <TableCell>{metric.category || 'N/A'}</TableCell>
            <TableCell>{metric.granularity || 'N/A'}</TableCell>
            <TableCell>{new Date(metric.timestamp).toLocaleString()}</TableCell>
            <TableCell>{metric.source || 'N/A'}</TableCell>
            <TableCell>{metric.tags.join(', ') || 'N/A'}</TableCell>
            <TableCell className="flex gap-2">
              <Button variant="default" size="sm" className="bg-sky-500 hover:bg-sky-400" asChild>
                <Link href={`/metrics/${metric.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-[#ff365e] hover:bg-[#ff365e]/80"
                onClick={() => onDelete(metric.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
          </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Suspense>
  </Table>
);