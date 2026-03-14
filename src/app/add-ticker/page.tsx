import { Metadata } from 'next';
import { Search, Plus, Star, History, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "티커 추가",
  description: "새로운 관심 기업을 추가하고 실시간 알림을 설정하세요",
};

export default function AddTickerPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="px-6 py-6 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <Link href="/" className="p-1 -ml-1 hover:bg-[var(--background)] rounded-full transition-colors">
                <ChevronRight className="rotate-180" size={24} />
            </Link>
            <h1 className="text-2xl font-bold">티커 추가</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={18} />
            <input 
                type="text" 
                placeholder="기업명 또는 티커 검색 (예: NVDA)" 
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[var(--primary)] transition-colors shadow-sm"
            />
        </div>

        <section>
            <h3 className="text-xs font-bold text-[var(--secondary)] mb-3 flex items-center gap-2">
                <Star size={14} />
                인기 티커
            </h3>
            <div className="flex flex-wrap gap-2">
                {['TSLA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META'].map(t => (
                    <button key={t} className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                        ${t}
                    </button>
                ))}
            </div>
        </section>

        <section className="surface overflow-hidden">
            <h3 className="px-4 py-3 text-[10px] uppercase font-bold text-[var(--secondary)] bg-[var(--background)]/50 border-b border-[var(--border)] flex items-center gap-2">
                <History size={14} />
                최근 검색
            </h3>
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold">PLTR</p>
                        <p className="text-[10px] text-[var(--secondary)]">Palantir Technologies Inc.</p>
                    </div>
                    <button className="text-[var(--primary)] p-1">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
