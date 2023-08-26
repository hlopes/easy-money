import React from 'react';
import { LuAlignJustify } from 'react-icons/lu';

export default function TopNavBar() {
  return (
    <div className="navbar bg-base-100">
      <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
        <LuAlignJustify className="w-6 h-6" />
      </label>
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
