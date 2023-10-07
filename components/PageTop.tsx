import type { PropsWithChildren } from 'react';

type PageTopProps = PropsWithChildren & {
  title: string;
};

export default function PageTop({ title, children }: PageTopProps) {
  return (
    <section className="prose py-2 w-full flex justify-between">
      <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        {title}
      </h2>
      {children}
    </section>
  );
}
