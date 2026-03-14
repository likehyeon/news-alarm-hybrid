"use client";

import { Search, Plus, ChevronRight, Minus, List } from 'lucide-react';
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

export default function AddTickerPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [tickers, setTickers] = useState(initialTickers);

  const handleDelete = (tickerToDelete: string) => {
    setTickers(prev => prev.filter(t => t.ticker !== tickerToDelete));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="px-6 py-8 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10 glass">
        <div className="flex items-center gap-3 container-px w-full">
            <Link href="/" className="p-2 -ml-2 hover:bg-[var(--background)] rounded-full transition-all active:scale-90 bg-[var(--background)]">
                <ChevronRight className="rotate-180" size={24} strokeWidth={3} />
            </Link>
            <h1 className="text-2xl font-black tracking-tighter">티커 추가</h1>
        </div>
      </header>

      <main className="container-px py-8 space-y-10">
        {/* 검색 입력 */}
        <div className="relative animate-slide-up">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)] z-10" size={20} strokeWidth={2.5} />
            <input 
                type="text" 
                placeholder="기업명 또는 티커 검색 (예: NVDA)" 
                className="w-full bg-[var(--surface)] border-2 border-[var(--border)] rounded-[24px] py-5 pl-14 pr-6 text-[15px] font-bold focus:outline-none focus:border-[var(--primary)] transition-all shadow-sm focus:shadow-blue-500/10"
            />
        </div>

        {/* 현재 추가한 티커 */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="text-[11px] font-black text-[var(--secondary)] flex items-center gap-2 uppercase tracking-widest">
                  <List size={16} strokeWidth={2.5} />
                  현재 추가한 티커
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-[13px] font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
              >
                <span className="underline underline-offset-4 decoration-[var(--primary)]">
                  {isEditing ? '완료' : '편집'}
                </span>
              </button>
            </div>
            
            <div className="space-y-0">
              {tickers.length === 0 && (
                <p className="text-center text-[var(--secondary)] text-sm font-bold py-8">
                  추가된 티커가 없습니다.
                </p>
              )}
              {tickers.map((t, i) => (
                <div 
                  key={t.ticker} 
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-b-0 transition-all group"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[15px] font-black">{t.ticker}</p>
                      <p className="text-[12px] font-bold text-[var(--secondary)]">{t.name}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => handleDelete(t.ticker)}
                      className="w-8 h-8 rounded-full bg-[var(--danger)] text-white flex items-center justify-center transition-all active:scale-90 hover:bg-red-600 animate-fade-in"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                  )}
                </div>
              ))}
            </div>
        </section>
      </main>
    </div>
  );
}
