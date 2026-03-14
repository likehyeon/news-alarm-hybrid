"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Menu } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/charts', icon: TrendingUp, label: '증권' },
    { href: '/settings', icon: Menu, label: '전체' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border-light)] py-2 px-6 flex justify-around items-center h-[70px] pointer-events-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex flex-col items-center gap-1 transition-all active:scale-95 group flex-1 ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--secondary)] hover:text-[var(--foreground-dim)]'}`}
          >
            <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
            <span className={`text-[11px] font-bold ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--secondary)]'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
