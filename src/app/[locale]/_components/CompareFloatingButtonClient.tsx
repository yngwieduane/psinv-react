'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the actual widget file
const CompareFloatingButton = dynamic(() => import('./CompareFloatingButton'), 
  { ssr: false, loading: () => null }
);

export default function CompareFloatingButtonClient() {
  return <CompareFloatingButton />;
}