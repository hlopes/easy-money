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
      <div className="my-2 overflow-x-auto">
        <Skeleton className="w-full h-40 mt-4" />
      </div>
    </>
  );
}
