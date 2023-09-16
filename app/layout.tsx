import type { PropsWithChildren } from 'react';
import { Roboto_Mono } from 'next/font/google';
import { getServerSession } from 'next-auth';

import SessionProvider from '@/components/providers/SessionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import TRPCProvider from '@/components/providers/TRPCProvider';
import SideNav from '@/components/SideNav';

import './globals.css';

const font = Roboto_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={font.className}>
        <TRPCProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <SessionProvider session={session}>
              <SideNav>
                <main className="container mt-2 px-4 max-w-4xl">
                  {children}
                </main>
              </SideNav>
            </SessionProvider>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
