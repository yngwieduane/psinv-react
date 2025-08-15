'use client';

import { XCircle } from 'lucide-react';

export function ValidationAlert({
  errors,
  onClose,
}: {
  errors: string[];
  onClose: () => void;
}) {
  if (!errors.length) return null;

  return (
    <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
        aria-label="Close"
      >
        <XCircle className="w-4 h-4" />
      </button>

      <div className="flex items-center mb-2">
        <XCircle className="w-5 h-5 text-red-500 mr-2" />
        <p className="font-semibold">
          There {errors.length === 1 ? 'was' : 'were'} {errors.length} error{errors.length > 1 ? 's' : ''} with your submission
        </p>
      </div>

      <ul className="list-disc pl-7 space-y-1">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
