'use client';

import { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default function FancyboxWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Toolbar: true,
    });

    return () => NativeFancybox.destroy();
  }, []);

  return <>{children}</>;
}