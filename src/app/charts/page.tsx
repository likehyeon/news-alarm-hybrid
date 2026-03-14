import { Metadata } from 'next';
import { TrendingUp, BarChart3, Activity, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "실시간 차트",
  description: "관심 티커의 가격 변동 및 기술적 지표 실시간 확인",
};

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="px-6 py-6 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <Link href="/" className="p-1 -ml-1 hover:bg-[var(--background)] rounded-full transition-colors">
                <ChevronRight className="rotate-180" size={24} />
            </Link>
            <h1 className="text-2xl font-bold">실시간 차트</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="surface p-6 flex flex-col items-center justify-center min-h-[400px] border-dashed">
            <BarChart3 className="text-[var(--secondary)] mb-4" size={48} />
            <p className="text-sm font-medium text-[var(--secondary)]">TradingView 차트가 연동될 예정입니다.</p>
            <button className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-full text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors">
                데이터 불러오기
            </button>
        </div>

        <section className="grid grid-cols-2 gap-3">
            <div className="surface p-4">
                <div className="flex items-center gap-2 text-[var(--secondary)] mb-2">
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase">Volatility</span>
                </div>
                <p className="text-lg font-bold">Low</p>
            </div>
            <div className="surface p-4">
                <div className="flex items-center gap-2 text-[var(--secondary)] mb-2">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-bold uppercase">Trend</span>
                </div>
                <p className="text-lg font-bold text-[var(--success)]">Bullish</p>
            </div>
        </section>
      </main>
    </div>
  );
}
