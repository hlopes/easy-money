import type { PropsWithChildren } from 'react';

type PageTopProps = PropsWithChildren & {
  title: string;
};

export default function PageTop({ title, children }: PageTopProps) {
  return (
    <section className="flex justify-between w-full py-2 prose">
      <h2 className="pb-2 mt-10 text-2xl font-semibold tracking-tight transition-colors scroll-m-20 first:mt-0">
        {title}
      </h2>
      {children}
    </section>
  );
}
