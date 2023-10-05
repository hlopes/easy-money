import type { PropsWithChildren } from 'react';

import MainLayout from '@/components/MainLayout';

export default async function Layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
