import type { PropsWithChildren } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';

export const metadata = {
  title: 'Easy Money',
  description: 'Money Tracker',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
