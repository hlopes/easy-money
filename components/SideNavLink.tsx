import type { ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type SideNavLinkProps = {
  Icon: ComponentType<{ className: string }>;
  url: string;
  name: string;
};

export default function SideNavLink({ Icon, url, name }: SideNavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <li className="mb-6 ml-6" onClick={close}>
      <Link className="flex space-x-2 group" href={url}>
        <Icon
          className={cn(
            'h-6 w-6',
            !isActive && 'text-muted-foreground group-hover:text-foreground'
          )}
        />
        <span
          className={
            !isActive ? 'text-muted-foreground group-hover:text-foreground' : ''
          }>
          {name}
        </span>
      </Link>
    </li>
  );
}
