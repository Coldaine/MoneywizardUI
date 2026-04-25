import { MagnifiSidebar } from '@/components/MagnifiSidebar';
import type { ReactNode } from 'react';

export default function MagnifiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MagnifiSidebar />
      <main className="content-magnifi">
        {children}
      </main>
    </>
  );
}
