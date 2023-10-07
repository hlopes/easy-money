'use client';

import { LuActivity, LuBriefcase, LuLayoutDashboard } from 'react-icons/lu';

import { useSideNav } from '@/hooks';
import { cn } from '@/lib/utils';

import SideNavLink from './SideNavLink';

export default function SideNav() {
  const { isOpen, close } = useSideNav();

  return (
    <>
      {/* Navigation */}
      <div
        className={cn(
          'fixed mt-[65px] inset-y-0 left-0 w-64 h-screen bg-white dark:bg-background shadow-md transform transition-transform duration-300 ease-in-out border-r-2 lg:mt-0 z-20',
          !isOpen && '-translate-x-full lg:-translate-x-0'
        )}>
        <div className="p-4 text-lg prose">
          <h3>Menu</h3>
        </div>
        <nav>
          <ul>
            <SideNavLink Icon={LuLayoutDashboard} url="/" name="Dashboard" />
            <SideNavLink
              Icon={LuBriefcase}
              url="/bank-accounts"
              name="Bank Accounts"
            />
            <SideNavLink
              Icon={LuActivity}
              url="/transactions"
              name="Transactions"
            />
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        id="backdrop"
        className={cn(
          'fixed inset-0 bg-black opacity-25 mt-[65px] lg:hidden lg:mt-0 z-10',
          !isOpen && 'hidden'
        )}
        onClick={close}></div>
    </>
  );
}
