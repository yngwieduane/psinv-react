'use client';

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './_components/navigation';
import MainFooter from './_components/MainFooter';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
const layoutExcludedRoutes = ['/psi-youngsters-program', '/list-your-property'];

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = getQueryClient();

  const hideLayout = layoutExcludedRoutes.some((path) =>
    pathname?.endsWith(path) || pathname?.includes(`${path}/`)
  );

  return (
    <QueryClientProvider client={queryClient}>
      {!hideLayout && <Navigation />}
      {children}
      {!hideLayout && (
        <div className="w-full mt-10">
          <MainFooter />
        </div>
      )}
    </QueryClientProvider>
  );
}
