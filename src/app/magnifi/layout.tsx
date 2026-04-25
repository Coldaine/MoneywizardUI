import { MagnifiSidebar } from '@/components/MagnifiSidebar';
import { MagnifiChatBar } from '@/components/MagnifiChatBar';
import type { ReactNode } from 'react';

export default function MagnifiLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <MagnifiSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
          {children}
        </main>
        <MagnifiChatBar />
      </div>
    </div>
  );
}
