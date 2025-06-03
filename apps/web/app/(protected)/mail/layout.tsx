// app/(protected)/mail/layout.tsx


import Sidebar from '@/components/mail/Sidebar';
import type { ReactNode } from 'react';

export default function MailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[##111112] flex h-screen w-full">
      <Sidebar/>
      <main className="bg-[#1A1A1A] flex-1 overflow-hidden rounded-l-2xl">
        {children}
      </main>
    </div>
  );
}