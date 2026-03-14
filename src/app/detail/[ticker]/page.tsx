"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, TrendingUp, ExternalLink, Info, ChevronRight } from 'lucide-react';

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

import BottomNav from '../../components/BottomNav';

// ... (previous Types and Mock Data remain same)

export default function DetailPage() {
  const params = useParams();
  const currentTicker = params.ticker as string || 'HYMTF';
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  
  const newsList = MOCK_NEWS[currentTicker] || [];
  const stockName = TICKERS.find(t => t.id === currentTicker)?.name || currentTicker;

  return (
    <div className="min-h-screen bg-[var(--background)] pb-32">
      {/* Header */}
      <header className="px-6 py-6 bg-[var(--background)] sticky top-0 z-10">
        <div className="container-px flex items-center justify-between">
          <Link href="/" className="text-[var(--foreground)]">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-[17px] font-bold">{stockName}</h1>
            <span className="text-[12px] text-[var(--secondary)] font-medium uppercase tracking-tight">{currentTicker}</span>
          </div>
          <div className="w-6" /> {/* Spacer */}
        </div>
      </header>

      <main className="container-px pt-2">
        {/* Price Section */}
        <section className="flex flex-col items-center py-6">
          <div className="flex items-center gap-2 text-[var(--danger)]">
            <h2 className="text-[32px] font-black tracking-tight">243,500</h2>
            <TrendingUp size={28} strokeWidth={3} />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[15px] font-bold text-[var(--danger)]">+2,500원 (+1.04%)</span>
          </div>
        </section>

        {/* Chart Placeholder Section */}
        <section className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 shadow-sm mb-4 min-h-[250px] flex items-center justify-center border border-[var(--border-light)]">
           <p className="text-[14px] font-bold text-[var(--secondary)]">차트 영역 (TradingView연동 예정)</p>
        </section>

        {/* Filter Section */}
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          {['최신순', '중요도순', '공시', '뉴스'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full text-[14px] font-bold whitespace-nowrap transition-all ${selectedFilter === filter ? 'bg-[var(--foreground)] text-white' : 'bg-[var(--surface)] text-[var(--secondary)] shadow-sm'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* News Feed */}
        <section className="space-y-4 pt-2">
          {newsList.map((news) => (
            <div key={news.id} className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 shadow-sm animate-slide-up border border-[var(--border-light)]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-0.5">
                    {[...Array(news.importance)].map((_, i) => (
                        <span key={i} className="text-[var(--warning)] text-[10px]">⚡</span>
                    ))}
                </div>
                <span className="text-[12px] text-[var(--secondary)] font-bold">{news.time}</span>
              </div>
              
              <h3 className="text-[18px] font-black mb-4 leading-[1.4] text-[var(--foreground)]">{news.title}</h3>
              
              <div className="bg-[var(--primary-dim)] p-4 rounded-[var(--radius-md)] mb-4">
                  <p className="text-[14px] font-bold text-[var(--foreground)] leading-snug">
                    {news.conclusion}
                  </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[13px] font-bold text-[var(--primary)] uppercase tracking-wider">Impact Analysis</span>
                <Link 
                    href={news.url} 
                    target="_blank"
                    className="flex items-center gap-1 text-[13px] font-bold text-[var(--secondary)]"
                >
                    더보기 <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}

          {newsList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-[var(--secondary)] space-y-4">
                <Info size={24} />
                <p className="text-[14px] font-bold">뉴스 정보가 없습니다.</p>
            </div>
          )}
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}
