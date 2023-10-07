import type { PropsWithChildren } from 'react';

import SideNav from '@/components/SideNav';
import { Toaster } from '@/components/ui/toaster';

import TopNav from './TopNav';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopNav />
      <SideNav />
      <main className="pt-16 w-full lg:pl-64 max-h-screen overflow-hidden">
        <div className="container h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
}
