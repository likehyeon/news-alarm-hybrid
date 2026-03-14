"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Bell, Settings, Plus, TrendingUp, ChevronRight } from 'lucide-react';

// --- Types ---
interface StockWidgetProps {
  ticker: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  newsBadge?: number;
  importance?: number; // ⚡ count
  size?: 'small' | 'large';
  chartData?: number[];
}

// --- Components ---

const WidgetBadge = ({ count, importantCount }: { count: number, importantCount?: number }) => (
  <div className="absolute -top-2 -right-2 flex flex-col items-end gap-1 z-10">
    {importantCount && importantCount > 0 && (
        <div className="flex h-5 items-center px-1.5 rounded-full bg-[var(--danger)] text-[9px] font-black text-white shadow-md badge-pulse border-2 border-[var(--surface)]">
            중요 {importantCount}
        </div>
    )}
    {count > 0 && (
        <div className="flex h-5 items-center px-1.5 rounded-full bg-[var(--foreground)] text-[9px] font-black text-white shadow-md border-2 border-[var(--surface)]">
            알림 {count}
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
  const height = isLarge ? 40 : 25;
  
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
  importance = 0,
  size = 'small',
  chartData = [10, 15, 12, 18, 14, 20]
}: StockWidgetProps) => {
  const color = isPositive ? 'var(--danger)' : 'var(--primary)';
  const bgColor = isPositive ? 'rgba(240, 68, 82, 0.05)' : 'rgba(49, 130, 246, 0.05)';
  
  return (
    <Link 
      href={`/detail/${ticker}`} 
      className={`toss-card interactive relative flex flex-col justify-between transition-all animate-slide-up ${size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1 aspect-square p-4'}`}
    >
      {(newsBadge || importance > 0) && <WidgetBadge count={newsBadge || 0} importantCount={importance > 2 ? 1 : 0} />}
      
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-[var(--secondary)] tracking-wider uppercase">{ticker}</p>
          <h3 className="text-[15px] font-black text-[var(--foreground)] truncate mt-0.5">{name}</h3>
          {importance > 0 && <ImportanceLight count={importance} />}
        </div>
      </div>
      
      <div className="mt-auto">
        <MiniSparkline data={chartData} color={isPositive ? '#f04452' : '#3182f6'} isLarge={size === 'large'} />
        <div className={size === 'large' ? 'mt-4' : 'mt-2'}>
          <p className={`${size === 'large' ? 'text-[20px]' : 'text-[15px]'} font-black tracking-tight leading-none`}>{price}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md" style={{ color, backgroundColor: bgColor }}>
              {isPositive ? '▲' : '▼'} {changePercent}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TopBar = () => (
  <header className="sticky top-0 z-50 w-full glass py-4 container-px flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-md">
        <TrendingUp size={20} color="white" strokeWidth={3} />
      </div>
      <h1 className="text-xl font-black tracking-tight">News Alarm</h1>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2.5 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--foreground)]">
        <Bell size={22} strokeWidth={2.5} />
      </button>
      <Link href="/add-ticker" className="flex items-center gap-1.5 bg-[var(--primary)] text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-[var(--primary-hover)] transition-all active:scale-95">
        <Plus size={18} strokeWidth={3} />
        <span>검색</span>
      </Link>
    </div>
  </header>
);

const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass py-3 px-8 flex justify-around items-center rounded-t-3xl">
        <Link href="/" className="flex flex-col items-center gap-1.5 text-[var(--primary)]">
            <Home size={24} strokeWidth={3} />
            <span className="text-[11px] font-black">홈</span>
        </Link>
        <Link href="/charts" className="flex flex-col items-center gap-1.5 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors group">
            <TrendingUp size={24} strokeWidth={2.5} className="group-active:scale-110 transition-transform" />
            <span className="text-[11px] font-black">차트</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1.5 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors group">
            <Settings size={24} strokeWidth={2.5} className="group-active:scale-110 transition-transform" />
            <span className="text-[11px] font-black">설정</span>
        </Link>
    </nav>
)

export default function AppHomeClient() {
  const [tickers] = useState([
    { ticker: 'HYMTF', name: '현대자동차', price: '243,500', change: '+2,500', changePercent: '1.04', isPositive: true, importance: 3, newsBadge: 2, size: 'large' as const },
    { ticker: 'PLTR', name: '팔란티어', price: '42.15', change: '+1.2', changePercent: '2.85', isPositive: true, newsBadge: 5 },
    { ticker: 'NVDA', name: '엔비디아', price: '135.20', change: '-2.4', changePercent: '1.75', isPositive: false, importance: 3 },
    { ticker: 'SATL', name: '세틀로직', price: '2.45', change: '+0.05', changePercent: '2.08', isPositive: true },
    { ticker: 'POET', name: '포엣', price: '4.82', change: '+0.12', changePercent: '2.55', isPositive: true },
    { ticker: 'AMKR', name: '앰코', price: '28.14', change: '-0.45', changePercent: '1.57', isPositive: false },
    { ticker: 'TSLA', name: '테슬라', price: '198.50', change: '+4.5', changePercent: '2.32', isPositive: true },
    { ticker: 'AAPL', name: '애플', price: '185.30', change: '-1.2', changePercent: '0.64', isPositive: false },
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopBar />
      
      <main className="container-px pt-6">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-black tracking-tighter">관심 종목</h2>
                <p className="text-sm font-bold text-[var(--secondary)] mt-1">실시간 뉴스 요약 및 알림</p>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {tickers.map((stock) => (
            <StockWidget key={stock.ticker} {...stock} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
