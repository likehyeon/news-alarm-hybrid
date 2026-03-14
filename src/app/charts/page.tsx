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
      <header className="px-6 py-8 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10 glass">
        <div className="flex items-center gap-3 container-px w-full">
            <Link href="/" className="p-2 -ml-2 hover:bg-[var(--background)] rounded-full transition-all active:scale-90 bg-[var(--background)]">
                <ChevronRight className="rotate-180" size={24} strokeWidth={3} />
            </Link>
            <h1 className="text-2xl font-black tracking-tighter">실시간 차트</h1>
        </div>
      </header>

      <main className="container-px py-8 space-y-6">
        <div className="surface p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 animate-slide-up border-[var(--border)] bg-[var(--surface)]">
            <div className="w-20 h-20 rounded-3xl bg-[var(--primary-dim)] flex items-center justify-center mb-6">
                <BarChart3 className="text-[var(--primary)]" size={40} strokeWidth={2.5} />
            </div>
            <p className="text-[15px] font-bold text-[var(--secondary)] text-center leading-relaxed">
                TradingView 차트가 연동될 예정입니다.<br/>
                실시간 데이터 스트리밍을 준비 중입니다.
            </p>
            <button className="mt-8 px-8 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-[var(--primary-hover)] transition-all active:scale-95">
                데이터 수동 동기화
            </button>
        </div>

        <section className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="surface p-6">
                <div className="flex items-center gap-2 text-[var(--secondary)] mb-3">
                    <Activity size={16} strokeWidth={2.5} />
                    <span className="text-[11px] font-black uppercase tracking-wider">변동성</span>
                </div>
                <p className="text-xl font-black">낮음</p>
            </div>
            <div className="surface p-6">
                <div className="flex items-center gap-2 text-[var(--secondary)] mb-3">
                    <TrendingUp size={16} strokeWidth={2.5} />
                    <span className="text-[11px] font-black uppercase tracking-wider">추세</span>
                </div>
                <p className="text-xl font-black text-[var(--success)]">상승세</p>
            </div>
        </section>
      </main>
    </div>
  );
}
