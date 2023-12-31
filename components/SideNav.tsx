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
      <aside
        className={cn(
          'fixed mt-[65px] inset-y-0 left-0 w-64 h-screen bg-white dark:bg-background shadow-md transform transition-transform duration-300 ease-in-out border-r-2 lg:mt-0 z-20',
          !isOpen && '-translate-x-full lg:-translate-x-0'
        )}>
        <h1 className="mt-10 text-4xl font-semibold text-center">Easy Money</h1>
        <nav>
          <ul className="my-12">
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
      </aside>

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
