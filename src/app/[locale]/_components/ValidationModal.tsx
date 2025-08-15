'use client';

import { XCircle, X } from 'lucide-react';

export function ValidationModal({
  errors,
  onClose,
}: {
  errors: string[];
  onClose: () => void;
}) {
  if (!errors.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-lg border border-red-200 p-6 shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-red-400 hover:text-red-600"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center mb-4">
          <XCircle className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-lg font-semibold text-red-700">
            Please complete all required fields
          </h2>
        </div>

        {/* Error list */}
        <ul className="list-disc pl-6 text-sm text-red-600 space-y-1">
          {errors.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
