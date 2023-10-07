import type { ComponentType } from 'react';
import Link from 'next/link';

type SideNavLinkProps = {
  Icon: ComponentType<{ className: string }>;
  url: string;
  name: string;
};

export default function SideNavLink({ Icon, url, name }: SideNavLinkProps) {
  return (
    <li className="ml-6 mb-6" onClick={close}>
      <Link className="flex space-x-2 group" href={url}>
        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
        <span className="text-muted-foreground group-hover:text-foreground">
          {name}
        </span>
      </Link>
    </li>
  );
}
