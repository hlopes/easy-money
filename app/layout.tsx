import type { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';

import SessionProvider from '@/components/providers/SessionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import SideNav from '@/components/SideNav';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const font = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <SessionProvider session={session}>
            <SideNav>
              <main className="container mt-2 px-4 max-w-4xl">{children}</main>
              <Toaster />
            </SideNav>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
