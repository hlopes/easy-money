'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import TopNav from './TopNav';

export default function SideNav({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Navigation */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-full h-screen bg-white dark:bg-background shadow-md transform transition-transform duration-300 ease-in-out z-10 lg:static border-r-2 mt-[65px] lg:mt-0 md:w-64',
          !isOpen && '-translate-x-full lg:-translate-x-0'
        )}>
        <div className="p-4 prose text-lg">
          <h3>Menu</h3>
        </div>
        <nav>
          <ul>
            <li className="ml-6 mb-2" onClick={() => setIsOpen(false)}>
              <Link href="/">Dashboard</Link>
            </li>
            <li className="ml-6 mb-2" onClick={() => setIsOpen(false)}>
              <Link href="/bank-accounts">BankAccounts</Link>
            </li>
            <li className="ml-6 mb-2" onClick={() => setIsOpen(false)}>
              <Link href="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        id="backdrop"
        className={cn(
          'fixed inset-0 bg-black opacity-25 mt-[65px] lg:hidden lg:mt-0',
          !isOpen && 'hidden'
        )}
        onClick={() => setIsOpen(false)}></div>

      {/* TopBar */}
      <div className="flex flex-col w-full">
        <TopNav onOpen={() => setIsOpen(true)} />
        {/* Page */}
        {children}
      </div>
    </div>
  );
}
