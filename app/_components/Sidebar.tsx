import type { PropsWithChildren } from 'react';
import Link from 'next/link';

export default function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <nav className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <h3>Menu</h3>
          <ul>
            <li>
              <Link href="/">Bank Accounts</Link>
            </li>
            <li>
              <Link href="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}