"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Bell, Settings, Plus, TrendingUp, ChevronRight, Menu, X, BarChart3, Star, BookOpen, HelpCircle } from 'lucide-react';
import BottomNav from './components/BottomNav';

// --- Types ---
interface StockWidgetProps {
  ticker: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  newsBadge?: number;
  importantBadge?: number;
  importance?: number;
  size?: 'small' | 'large';
  chartData?: number[];
}

// --- Components ---

const WidgetBadge = ({ count, importantCount }: { count: number, importantCount?: number }) => (
  <div className="absolute -top-1.5 -right-1.5 flex items-center gap-1 z-10">
    {count > 0 && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--foreground)] text-[9px] font-black text-white shadow-md border-2 border-[var(--surface)]">
            {count}
        </div>
    )}
    {importantCount && importantCount > 0 && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger)] text-[9px] font-black text-white shadow-md badge-pulse border-2 border-[var(--surface)]">
            {importantCount}
        </div>
    )}
  </div>
);

const ImportanceLight = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 mt-1.5 ">
    {[...Array(count)].map((_, i) => (
      <span key={i} className="text-[var(--warning)] text-[10px]">⚡</span>
    ))}
  </div>
);

const MiniSparkline = ({ data, color, isLarge = false }: { data: number[], color: string, isLarge?: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = (max - min) || 1;
  const width = 100;
  const height = isLarge ? 55 : 40;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`${isLarge ? 'mt-4' : 'mt-2'} opacity-80`}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth={isLarge ? "3" : "2.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
};

const StockWidget = ({ 
  ticker, 
  name, 
  price, 
  changePercent, 
  isPositive, 
  newsBadge, 
  importantBadge,
  importance = 0,
}: StockWidgetProps) => {
  const color = isPositive ? 'var(--danger)' : 'var(--primary)';
  
  return (
    <Link 
      href={`/detail/${ticker}`} 
      className="flex items-center justify-between py-4 active:bg-[var(--secondary-dim)] transition-colors px-1 group"
    >
      <div className="flex items-center gap-4">
        {/* Mock Logo Icon */}
        <div className="relative">
          <div className="w-12 h-12 rounded-[16px] bg-[var(--background)] flex items-center justify-center font-bold text-[var(--secondary)] text-sm shadow-sm overflow-hidden">
            {ticker.slice(0, 2)}
          </div>
          {(newsBadge !== undefined && newsBadge > 0) && (
            <div className="absolute -top-1 -right-1 flex gap-0.5">
               <div className="h-4 w-4 rounded-full bg-[var(--foreground)] text-[8px] flex items-center justify-center text-white border border-white">
                 {newsBadge}
               </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[16px] font-bold text-[var(--foreground)]">{name}</span>
            {importance > 0 && <span className="text-[10px]">⚡</span>}
          </div>
          <p className="text-[13px] font-medium text-[var(--secondary)] uppercase tracking-tight">{ticker}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-[16px] font-bold text-[var(--foreground)]">{price}</p>
        <p className={`text-[13px] font-bold ${isPositive ? 'text-[var(--danger)]' : 'text-[var(--primary)]'}`}>
          {isPositive ? '+' : ''}{changePercent}%
        </p>
      </div>
    </Link>
  );
};

// --- Menu Overlay ---
const menuItems = [
  { icon: Home, label: '홈', href: '/', description: '관심 종목 대시보드' },
  { icon: BarChart3, label: '차트', href: '/charts', description: '종목별 상세 차트' },
  { icon: Star, label: '관심 종목 관리', href: '/add-ticker', description: '티커 추가 및 편집' },
  { icon: Bell, label: '알림 설정', href: '/settings', description: '뉴스 알림 관리' },
  { icon: Settings, label: '설정', href: '/settings', description: '앱 환경설정' },
];

const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-[101] h-full w-[310px] max-w-[85vw] bg-[var(--surface)] shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-black tracking-tight">전체 메뉴</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--border)] transition-colors">
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
        {/* Menu Items */}
        <nav className="px-3 flex flex-col gap-1">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-[var(--background)] transition-all active:scale-[0.98] group"
            >
              <div className="w-10 h-10 rounded-[12px] bg-[var(--background)] flex items-center justify-center group-hover:bg-[var(--primary-dim)] group-hover:text-[var(--primary)] transition-colors">
                <item.icon size={20} strokeWidth={2} />
              </div>
              <span className="text-[16px] font-bold">{item.label}</span>
              <ChevronRight size={16} className="ml-auto text-[var(--secondary)] opacity-50" />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

// --- TopBar ---
const TopBar = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="sticky top-0 z-50 w-full bg-[var(--background)] py-4 container-px flex items-center justify-between">
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-black tracking-tight">알림</h1>
    </div>
    <div className="flex items-center gap-4">
      <Link href="/add-ticker" className="text-[var(--foreground-dim)]">
        <Plus size={24} strokeWidth={2.5} />
      </Link>
      <button className="text-[var(--foreground-dim)]">
        <Bell size={24} strokeWidth={2.5} />
      </button>
      <button onClick={onMenuOpen} className="text-[var(--foreground-dim)]">
        <Menu size={24} strokeWidth={2.5} />
      </button>
    </div>
  </header>
);

export default function AppHomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickers] = useState([
    { ticker: 'PLTR', name: '팔란티어', price: '42.15', change: '+1.2', changePercent: '2.85', isPositive: true, newsBadge: 3, importantBadge: 1 },
    { ticker: 'HYMTF', name: '현대자동차', price: '243,500', change: '+2,500', changePercent: '1.04', isPositive: true, newsBadge: 2, importantBadge: 1 },
    { ticker: 'NVDA', name: '엔비디아', price: '135.20', change: '-2.4', changePercent: '1.75', isPositive: false, newsBadge: 2 },
    { ticker: 'SATL', name: '세틀로직', price: '2.45', change: '+0.05', changePercent: '2.08', isPositive: true },
    { ticker: 'POET', name: '포엣', price: '4.82', change: '+0.12', changePercent: '2.55', isPositive: true },
    { ticker: 'AMKR', name: '앰코', price: '28.14', change: '-0.45', changePercent: '1.57', isPositive: false },
    { ticker: 'TSLA', name: '테슬라', price: '198.50', change: '+4.5', changePercent: '2.32', isPositive: true },
    { ticker: 'AAPL', name: '애플', price: '185.30', change: '-1.2', changePercent: '0.64', isPositive: false },
  ]);

  const sortedTickers = [...tickers].sort((a, b) => {
    const aBadge = a.newsBadge || 0;
    const bBadge = b.newsBadge || 0;
    return bBadge - aBadge;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] pb-32">
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <TopBar onMenuOpen={() => setMenuOpen(true)} />
      
      <main className="container-px pt-2">
        {/* Section One: Ticker List */}
        <section className="bg-[var(--surface)] rounded-[24px] p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[17px] font-bold">관심 종목</h2>
            <ChevronRight size={20} className="text-[var(--secondary)] opacity-50" />
          </div>
          
          <div className="flex flex-col divide-y divide-[var(--border-light)]">
            {sortedTickers.slice(0, 5).map((stock) => (
              <StockWidget key={stock.ticker} {...stock} />
            ))}
          </div>
          
          <Link href="/add-ticker" className="flex items-center justify-center py-4 mt-2 border-t border-[var(--border-light)] text-[15px] font-bold text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors">
            더보기
          </Link>
        </section>

        {/* Section Two: Example Secondary Card */}
        <section className="bg-[var(--surface)] rounded-[24px] p-6 shadow-sm mb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-[var(--primary-dim)] flex items-center justify-center text-[var(--primary)]">
                <TrendingUp size={24} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-bold">실시간 차트 보기</h3>
                <p className="text-[13px] text-[var(--secondary)]">인기 종목 트렌드</p>
              </div>
           </div>
           <ChevronRight size={20} className="text-[var(--secondary)] opacity-50" />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
