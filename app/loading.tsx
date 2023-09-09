import { LuLoader2 } from 'react-icons/lu';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="mt-4 h-20 w-full" />
      <LuLoader2 className="m-4 h-6 w-6 animate-spin" />
    </div>
  );
}
