import { Metadata } from 'next';
import { TrendingUp, BarChart3, Activity, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '../components/BottomNav';

export const metadata: Metadata = {
  title: "실시간 차트",
  description: "관심 티커의 가격 변동 및 기술적 지표 실시간 확인",
};

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="px-6 py-6 bg-[var(--background)] sticky top-0 z-10">
        <div className="container-px w-full text-center">
            <h1 className="text-xl font-black tracking-tight">실시간 차트</h1>
        </div>
      </header>

      <main className="container-px py-8 space-y-6">
        <div className="surface p-8 flex flex-col items-center justify-center min-h-[400px] border border-[var(--border-light)] animate-slide-up bg-[var(--surface)]">
            <div className="w-16 h-16 rounded-[var(--radius-md)] bg-[var(--primary-dim)] flex items-center justify-center mb-6">
                <BarChart3 className="text-[var(--primary)]" size={32} strokeWidth={2.5} />
            </div>
            <p className="text-[15px] font-bold text-[var(--foreground-dim)] text-center leading-relaxed">
                TradingView 차트가 연동될 예정입니다.<br/>
                실시간 데이터 스트리밍을 준비 중입니다.
            </p>
            <button className="mt-8 px-8 py-3 bg-[var(--primary)] text-white rounded-[var(--radius-md)] text-[15px] font-bold hover:bg-[var(--primary-hover)] transition-all active:scale-95 shadow-sm">
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
      <BottomNav />
    </div>
  );
}
