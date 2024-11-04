import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the data.</p>
      </div>
    </div>
  );
}
