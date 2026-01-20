'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the actual widget file
const AIChatWidget = dynamic(() => import('./AIChatWidget'), { ssr: false, loading: () => null });

export default function AIChatWidgetClient() {
  return <AIChatWidget />;
}