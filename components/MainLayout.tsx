import type { PropsWithChildren } from 'react';

import SideNav from '@/components/SideNav';
import { Toaster } from '@/components/ui/toaster';

import TopNav from './TopNav';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopNav />
      <SideNav />
      <main className="w-full max-h-screen pt-20 overflow-hidden lg:pl-64">
        <div className="container h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
}
