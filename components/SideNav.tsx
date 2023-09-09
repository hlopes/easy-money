'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import UserNav from './UserNav';

export default function SideNav({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Navigation */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-64 h-screen bg-white shadow-md transform transition-transform duration-300 ease-in-out z-10 lg:static',
          !isOpen && '-translate-x-full lg:-translate-x-0'
        )}>
        <div className="p-4 prose">
          <h3>Menu</h3>
        </div>
        <nav>
          <ul>
            <li className="ml-6 mb-2 text-sm" onClick={() => setIsOpen(false)}>
              <Link href="/">Dashboard</Link>
            </li>
            <li className="ml-6 mb-2 text-sm" onClick={() => setIsOpen(false)}>
              <Link href="/bank-accounts">BankAccounts</Link>
            </li>
            <li className="ml-6 mb-2 text-sm" onClick={() => setIsOpen(false)}>
              <Link href="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        id="backdrop"
        className={cn(
          'fixed inset-0 bg-black opacity-25 lg:hidden',
          !isOpen && 'hidden'
        )}
        onClick={() => setIsOpen(false)}></div>

      {/* TopBar */}
      <div className="flex flex-col w-full">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <Button
              className="lg:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}>
              <LuMenu className="w-6 h-6" />
            </Button>
            <UserNav />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
