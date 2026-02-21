'use client';

import dynamic from 'next/dynamic';

const StickyBottomWidget = dynamic(() => import('./StickyBottomWidget'), { ssr: false, loading: () => null });

export default function StickyBottomWidgetClient() {
  return <StickyBottomWidget />;
}