import type { PropsWithChildren } from 'react';
import { Roboto_Mono } from 'next/font/google';

import SideBar from './_components/SideBar';

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
        <SideBar>
          <div className="container mx-auto px-4">{children}</div>
        </SideBar>
      </body>
    </html>
  );
}
