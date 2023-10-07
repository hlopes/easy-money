'use client';

import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { useSideNav } from '@/hooks';

import { Button } from './ui/button';
import ModeToggle from './ModeToggle';

export default function TopNav() {
  const { theme } = useTheme();

  const { isOpen, toggle } = useSideNav();

  return (
    <div className="fixed top-0 w-full bg-background border-b z-10">
      <div className="flex h-16 items-center justify-between px-4">
        <Button
          className="lg:hidden"
          variant="ghost"
          size="icon"
          onClick={toggle}>
          {isOpen ? (
            <LuPanelLeftClose className="w-6 h-6" />
          ) : (
            <LuPanelLeftOpen className="w-6 h-6" />
          )}
        </Button>
        <div className="flex items-center space-x-2 w-full justify-end">
          <ModeToggle />
          <Button variant="outline" size="icon">
            <UserButton
              appearance={
                theme === 'dark'
                  ? {
                      baseTheme: dark,
                    }
                  : {}
              }
              afterSignOutUrl="/"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
