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
    <div className="fixed top-0 z-10 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4">
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
        <div className="flex items-center justify-end w-full space-x-2">
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
