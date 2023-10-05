import type { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { ThemeProvider } from '@/components/providers/ThemeProvider';

import './globals.css';

const font = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
