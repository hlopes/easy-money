import type { PropsWithChildren } from 'react';

import SideNav from '@/components/SideNav';
import { Toaster } from '@/components/ui/toaster';

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SideNav>
        <main className="container mt-2 px-4 max-w-4xl">{children}</main>
      </SideNav>
      <Toaster />
    </>
  );
}
