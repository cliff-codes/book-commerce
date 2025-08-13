'use client';

import { Button } from './ui/components/design-system';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <FiAlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Something went wrong!
        </h1>
        <p className="text-neutral-600 mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="flex items-center gap-2 mx-auto"
          >
            <FiRefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="mx-auto"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
