"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Bell, Settings, Plus, TrendingUp, ChevronRight, Menu, X, BarChart3, Star, BookOpen, HelpCircle } from 'lucide-react';

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
  size = 'small',
  chartData = [10, 15, 12, 18, 14, 20]
}: StockWidgetProps) => {
  const color = isPositive ? 'var(--danger)' : 'var(--primary)';
  const bgColor = isPositive ? 'rgba(240, 68, 82, 0.05)' : 'rgba(49, 130, 246, 0.05)';
  
  return (
    <Link 
      href={`/detail/${ticker}`} 
      className={`toss-card interactive relative flex flex-col justify-between transition-all animate-slide-up ${size === 'large' ? 'col-span-2 row-span-2 p-6' : 'col-span-1 aspect-square p-6'}`}
    >
      {(newsBadge || importantBadge) && <WidgetBadge count={newsBadge || 0} importantCount={importantBadge} />}
      
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold text-[var(--secondary)] tracking-wider uppercase">{ticker}</p>
        <h3 className="text-[15px] font-black text-[var(--foreground)] truncate">{name}</h3>
        {importance > 0 && <ImportanceLight count={importance} />}
      </div>
      
      <div className="mt-auto">
        <MiniSparkline data={chartData} color={isPositive ? '#f04452' : '#3182f6'} isLarge={size === 'large'} />
        <div className={size === 'large' ? 'mt-4' : 'mt-2.5'}>
          <p className={`${size === 'large' ? 'text-[22px]' : 'text-[16px]'} font-black tracking-tight leading-none`}>{price}</p>
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
        className={`fixed top-0 left-0 z-[101] h-full w-[340px] max-w-[85vw] bg-[var(--surface)] shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-md">
              <TrendingUp size={20} color="white" strokeWidth={3} />
            </div>
            <h2 className="text-lg font-black tracking-tight">News Alarm</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--border)] transition-colors">
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
        {/* Menu Items */}
        <nav className="p-4 flex flex-col gap-1">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-[var(--border)] transition-all active:scale-[0.98] group"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--background)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors shadow-sm">
                <item.icon size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold">{item.label}</span>
                <span className="text-[12px] text-[var(--secondary)] font-medium">{item.description}</span>
              </div>
              <ChevronRight size={16} className="ml-auto text-[var(--secondary)] opacity-50" />
            </Link>
          ))}
        </nav>
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--border)]">
          <p className="text-[11px] text-[var(--secondary)] font-medium text-center">News Alarm v1.0</p>
        </div>
      </div>
    </>
  );
};

const TopBar = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="sticky top-0 z-50 w-full glass py-5 container-px flex items-center justify-between">
    <div className="flex items-center gap-3">
      <button onClick={onMenuOpen} className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-md hover:bg-[var(--primary-hover)] transition-colors active:scale-95">
        <Menu size={20} color="white" strokeWidth={3} />
      </button>
      <h1 className="text-xl font-black tracking-tight">News Alarm</h1>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2.5 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--foreground)]">
        <Bell size={22} strokeWidth={2.5} />
      </button>
      <Link href="/add-ticker" className="flex items-center gap-1.5 text-[var(--primary)] text-sm font-black hover:text-[var(--primary-hover)] transition-all active:scale-95 underline underline-offset-4 decoration-2">
        <Plus size={16} strokeWidth={3} />
        <span>티커 검색</span>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickers] = useState([
    { ticker: 'PLTR', name: '팔란티어', price: '42.15', change: '+1.2', changePercent: '2.85', isPositive: true, newsBadge: 3, importantBadge: 1 },
    { ticker: 'HYMTF', name: '현대자동차', price: '243,500', change: '+2,500', changePercent: '1.04', isPositive: true, newsBadge: 2, importantBadge: 1, size: 'large' as const },
    { ticker: 'NVDA', name: '엔비디아', price: '135.20', change: '-2.4', changePercent: '1.75', isPositive: false, newsBadge: 2 },
    { ticker: 'SATL', name: '세틀로직', price: '2.45', change: '+0.05', changePercent: '2.08', isPositive: true },
    { ticker: 'POET', name: '포엣', price: '4.82', change: '+0.12', changePercent: '2.55', isPositive: true },
    { ticker: 'AMKR', name: '앰코', price: '28.14', change: '-0.45', changePercent: '1.57', isPositive: false },
    { ticker: 'TSLA', name: '테슬라', price: '198.50', change: '+4.5', changePercent: '2.32', isPositive: true },
    { ticker: 'AAPL', name: '애플', price: '185.30', change: '-1.2', changePercent: '0.64', isPositive: false },
  ]);

  // 중요 알림이 있는 티커를 앞으로 자동 정렬
  const sortedTickers = [...tickers].sort((a, b) => {
    const aImportance = 'importance' in a ? (a as any).importance || 0 : 0;
    const bImportance = 'importance' in b ? (b as any).importance || 0 : 0;
    const aScore = (a.newsBadge || 0) + aImportance * 10;
    const bScore = (b.newsBadge || 0) + bImportance * 10;
    return bScore - aScore;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <TopBar onMenuOpen={() => setMenuOpen(true)} />
      
      <main className="container-px pt-6">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-black tracking-tighter">관심 종목</h2>
                <p className="text-sm font-bold text-[var(--secondary)] mt-1">실시간 뉴스 요약 및 알림</p>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4">
          {sortedTickers.map((stock) => (
            <StockWidget key={stock.ticker} {...stock} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
