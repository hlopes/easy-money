import type { PropsWithChildren } from 'react';
import { Roboto_Mono } from 'next/font/google';

import SideNav from '@/components/SideNav';

import TRPCProvider from '../components/providers/TRPCProvider';

import './globals.css';

const font = Roboto_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TRPCProvider>
          <SideNav>
            <main className="container px-4 max-w-4xl">{children}</main>
          </SideNav>
        </TRPCProvider>
      </body>
    </html>
  );
}
