import React from 'react';

import { Skeleton } from './ui/skeleton';
import ButtonAdd from './ButtonAdd';
import PageTop from './PageTop';

type LoadingTableProps = {
  title: string;
};

export default function LoadingTable({ title }: LoadingTableProps) {
  return (
    <>
      <PageTop title={title}>
        <ButtonAdd disabled />
      </PageTop>
      <div className="overflow-x-auto my-2">
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    </>
  );
}
