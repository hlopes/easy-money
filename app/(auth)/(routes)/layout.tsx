import type { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="h-[100dvh] flex items-center justify-center">
      {children}
    </main>
  );
}
