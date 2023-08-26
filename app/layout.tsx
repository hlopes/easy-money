import type { PropsWithChildren } from 'react';
import { Roboto_Mono } from 'next/font/google';

import Sidebar from './_components/Sidebar';

import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <Sidebar>
          <div className="container mx-auto">{children}</div>
        </Sidebar>
      </body>
    </html>
  );
}
