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
      <header className="px-6 py-8 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10 glass">
        <div className="flex items-center gap-3 container-px w-full">
            <Link href="/" className="p-2 -ml-2 hover:bg-[var(--background)] rounded-full transition-all active:scale-90 bg-[var(--background)]">
                <ChevronRight className="rotate-180" size={24} strokeWidth={3} />
            </Link>
            <h1 className="text-2xl font-black tracking-tighter">티커 추가</h1>
        </div>
      </header>

      <main className="container-px py-8 space-y-10">
        <div className="relative animate-slide-up">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={20} strokeWidth={2.5} />
            <input 
                type="text" 
                placeholder="기업명 또는 티커 검색 (예: NVDA)" 
                className="w-full bg-[var(--surface)] border-2 border-[var(--border)] rounded-[24px] py-5 pl-14 pr-6 text-[15px] font-bold focus:outline-none focus:border-[var(--primary)] transition-all shadow-sm focus:shadow-blue-500/10"
            />
        </div>

        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-[11px] font-black text-[var(--secondary)] mb-5 flex items-center gap-2 uppercase tracking-widest px-1">
                <Star size={16} strokeWidth={2.5} />
                인기 티커
            </h3>
            <div className="flex flex-wrap gap-2.5">
                {['TSLA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'NVDA', 'PLTR'].map(t => (
                    <button key={t} className="px-6 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[14px] font-black hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-dim)] transition-all active:scale-95 shadow-sm">
                        ${t}
                    </button>
                ))}
            </div>
        </section>

        <section className="bg-[var(--surface)] rounded-[28px] overflow-hidden shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="px-6 py-4 text-[11px] uppercase font-black text-[var(--secondary)] bg-[var(--secondary-dim)]/50 border-b border-[var(--border)] flex items-center gap-2 tracking-widest">
                <History size={16} strokeWidth={2.5} />
                최근 검색
            </h3>
            <div className="p-2 space-y-1">
                {['PLTR', 'NVDA'].map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-[var(--secondary-dim)] rounded-2xl transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center font-black text-[11px] text-[var(--secondary)]">
                                {t.slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-[15px] font-black">{t}</p>
                                <p className="text-[11px] font-bold text-[var(--secondary)] uppercase tracking-tight">Tech Corporation Inc.</p>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-[var(--primary-dim)] text-[var(--primary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                            <Plus size={22} strokeWidth={3} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
