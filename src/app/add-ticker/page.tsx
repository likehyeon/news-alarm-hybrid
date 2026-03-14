"use client";

import { Search, Plus, ChevronRight, Minus, List, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const initialTickers = [
  { ticker: 'PLTR', name: '팔란티어' },
  { ticker: 'HYMTF', name: '현대자동차' },
  { ticker: 'NVDA', name: '엔비디아' },
  { ticker: 'SATL', name: '세틀로직' },
  { ticker: 'POET', name: '포엣' },
  { ticker: 'AMKR', name: '앰코' },
  { ticker: 'TSLA', name: '테슬라' },
  { ticker: 'AAPL', name: '애플' },
];

import BottomNav from '../components/BottomNav';

// ... (initialTickers remain same)

export default function AddTickerPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [tickers, setTickers] = useState(initialTickers);

  const handleDelete = (tickerToDelete: string) => {
    setTickers(prev => prev.filter(t => t.ticker !== tickerToDelete));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-32">
      <header className="px-6 py-6 bg-[var(--background)] sticky top-0 z-10 flex items-center justify-between">
        <Link href="/" className="text-[var(--foreground)]">
            <ChevronLeft size={24} strokeWidth={2.5} className="rotate-0" />
        </Link>
        <h1 className="text-[17px] font-bold">티커 추가</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-[15px] font-bold text-[var(--primary)]"
        >
          {isEditing ? '완료' : '편집'}
        </button>
      </header>

      <main className="container-px pt-2">
        {/* Search Input */}
        <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={18} />
            <input 
                type="text" 
                placeholder="기업명 또는 티커 검색" 
                className="w-full bg-[var(--surface)] rounded-[16px] py-4 pl-11 pr-4 text-[15px] font-medium focus:outline-none shadow-sm"
            />
        </div>

        {/* Added Tickers List */}
        <section className="bg-[var(--surface)] rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[13px] font-bold text-[var(--secondary)] uppercase tracking-tight">
                <List size={16} />
                현재 추가한 티커
            </div>
            
            <div className="flex flex-col divide-y divide-[var(--border-light)]">
              {tickers.length === 0 && (
                <p className="py-10 text-center text-[var(--secondary)] text-[14px] font-medium">
                  추가된 티커가 없습니다.
                </p>
              )}
              {tickers.map((t) => (
                <div 
                  key={t.ticker} 
                  className="flex items-center justify-between py-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[var(--background)] flex items-center justify-center font-bold text-[var(--secondary)] text-[12px]">
                        {t.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[16px] font-bold text-[var(--foreground)]">{t.name}</p>
                      <p className="text-[13px] font-medium text-[var(--secondary)] uppercase">{t.ticker}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => handleDelete(t.ticker)}
                      className="w-8 h-8 rounded-full bg-[var(--danger)] text-white flex items-center justify-center active:scale-90"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                  )}
                </div>
              ))}
            </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
