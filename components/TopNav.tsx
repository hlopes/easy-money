import { LuMenu } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { Button } from './ui/button';
import ModeToggle from './ModeToggle';

interface TopNavProps {
  onOpen(): void;
}

export default function TopNav({ onOpen }: TopNavProps) {
  const { theme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <Button
          className="lg:hidden"
          variant="ghost"
          size="icon"
          onClick={onOpen}>
          <LuMenu className="w-6 h-6" />
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
