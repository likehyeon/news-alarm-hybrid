"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, TrendingUp, ChevronLeft } from 'lucide-react';

// --- Types ---
interface NewsItem {
  id: string;
  ticker: string;
  title: string;
  conclusion: string;
  summary: string[];
  impactTitle: string;
  impacts: string[];
  url: string;
  importance: number;
  time: string;
}

// --- Mock Data ---
const TICKERS = [
  { id: 'HYMTF', name: '현대자동차' },
  { id: 'PLTR', name: '팔란티어' },
  { id: 'NVDA', name: '엔비디아' },
  { id: 'SATL', name: '세틀로직' },
  { id: 'POET', name: '포엣' },
  { id: 'AMKR', name: '앰코' }
];

const MOCK_NEWS: Record<string, NewsItem[]> = {
  'HYMTF': [
    {
      id: '1',
      ticker: 'HYMTF',
      title: '현대차, 2026년 영업이익 13.4조 목표 상향!⚡⚡⚡',
      conclusion: '북미 전기차 점유율 확대 및 원가 절감을 통해 2026년 역대 최대 영업이익 목표 달성 전망',
      summary: [
        '매출 가이던스 상향: 기존 목표 대비 약 15% 상향 조정된 수치 발표.',
        '신규 플랫폼 효과: 2026년 양산 예정인 신규 전용 플랫폼(IMA) 도입으로 생산 단가 20% 절감 예상.',
        '시장 상황: 보조금 삭감 우려에도 불구하고 프리미엄 브랜드(제네시스) 비중 확대로 수익성 방어 가능.'
      ],
      impactTitle: '영향 분석 (Impact Analysis)',
      impacts: [
        '기업 가치: 목표 주가 상향 조정의 강력한 근거가 되며, Level 1(매우 중요) 수준의 긍정적 시그널.',
        '관련 산업: 부품 협력사 및 배터리 공급사의 동반 매출 성장 기대.',
        '경쟁 구도: 글로벌 완성차 업체 중 가장 높은 영업이익률 달성 여부에 시장 주목.'
      ],
      url: 'https://news.example.com/hundai-2026',
      importance: 3,
      time: '12분 전'
    },
    {
      id: '2',
      ticker: 'HYMTF',
      title: '현대차, 신규 배터리 협력사 선정 발표⚡⚡',
      conclusion: '안정적인 배터리 수급망 확보를 위한 글로벌 배터리 업체와의 전략적 제휴 체결',
      summary: [
        '공급 다변화: 특정 업체 의존도를 낮추고 가격 경쟁력 확보.',
        '기술 공유: 차세대 전고체 배터리 공동 연구 조항 포함.'
      ],
      impactTitle: '영향 분석 (Impact Analysis)',
      impacts: [
        '리스크 관리: 공급망 불안정성 해소로 인한 장기적 생산 안정화.',
        '기술력: 차세대 배터리 주도권 확보 가능성 증대.'
      ],
      url: 'https://news.example.com/hundai-battery',
      importance: 2,
      time: '2시간 전'
    }
  ]
};

export default function DetailPage() {
  const params = useParams();
  const currentTicker = params.ticker as string || 'HYMTF';
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  
  const newsList = MOCK_NEWS[currentTicker] || [];

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      {/* --- Sidebar (Ticker List) --- */}
      <aside className="w-16 md:w-20 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col items-center py-6 gap-6 z-20">
        <Link href="/" className="mb-4 p-2 rounded-full hover:bg-[var(--background)] transition-colors">
            <ChevronLeft size={24} />
        </Link>
        {TICKERS.map((t) => (
          <Link 
            key={t.id} 
            href={`/detail/${t.id}`}
            className={`flex flex-col items-center gap-1 group transition-all ${currentTicker === t.id ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs shadow-sm border-2 ${currentTicker === t.id ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'bg-[var(--background)] border-[var(--border)]'}`}>
              {t.id.slice(0, 2)}
            </div>
          </Link>
        ))}
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-6 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl font-extrabold tracking-tighter">{currentTicker}</h1>
              <button className="text-sm font-medium text-[var(--secondary)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--primary)] transition-colors">
                기업상세
              </button>
            </div>
            <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <TrendingUp size={20} />
                <span className="text-xl">243,500</span>
                <span className="text-sm">+1.04%</span>
            </div>
          </div>

          <div className="flex gap-2 mt-8">
            {['최신순', '중요도순', '관련 정보'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedFilter === filter ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--secondary)] hover:bg-[var(--border)]'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* News Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {newsList.map((news) => (
            <div key={news.id} className="surface p-6 animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-md">
                    {'⚡'.repeat(news.importance)}
                </span>
                <span className="text-xs text-[var(--secondary)] font-medium">{news.time}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-4 leading-tight">{news.title}</h2>
              
              <div className="space-y-4">
                <div className="bg-[var(--background)] p-4 rounded-xl border-l-4 border-[var(--primary)]">
                    <p className="text-sm font-bold text-[var(--foreground)] leading-relaxed">
                        <span className="text-[var(--primary)] mr-2">[결론]</span>
                        {news.conclusion}
                    </p>
                </div>

                <div className="space-y-1.5 px-1">
                    {news.summary.map((point, i) => (
                        <p key={i} className="text-sm text-[var(--foreground)] leading-relaxed flex gap-2">
                            <span className="text-[var(--secondary)]">•</span>
                            {point}
                        </p>
                    ))}
                </div>

                <div className="pt-4 border-t border-[var(--border)] mt-4">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[var(--primary)]">
                        {news.impactTitle}
                    </h4>
                    <ul className="space-y-2 px-1">
                        {news.impacts.map((impact, i) => (
                            <li key={i} className="text-[13px] text-[var(--secondary)] leading-relaxed flex gap-2 italic">
                                <span>-</span>
                                {impact}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link 
                    href={news.url} 
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[var(--primary)] hover:underline mt-2"
                >
                    <ExternalLink size={14} />
                    관련 기사 원문 보기
                </Link>
              </div>
            </div>
          ))}

          {newsList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-[var(--secondary)]">
                <p className="text-sm font-medium">현재 표시할 뉴스가 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
