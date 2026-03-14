import { Metadata } from 'next';
import { Settings as SettingsIcon, Bell, Moon, Shield, Info, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '../components/BottomNav';

export const metadata: Metadata = {
  title: "설정",
  description: "알림 설정, 테마 변경 및 앱 정보 확인",
};

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasArrow?: boolean;
}

const SettingsItem = ({ icon, label, value, hasArrow = true }: SettingsItemProps) => (
  <button className="w-full flex items-center justify-between p-5 active:bg-[var(--background)] transition-all border-b border-[var(--border-light)] last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-[12px] bg-[var(--background)] flex items-center justify-center text-[var(--foreground)] group-active:scale-95 transition-transform">
        {icon}
      </div>
      <span className="text-[16px] font-bold">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[14px] font-bold text-[var(--primary)]">{value}</span>}
      {hasArrow && <ChevronRight size={18} className="text-[var(--secondary)] opacity-30" />}
    </div>
  </button>
);

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-32">
      <header className="px-6 py-6 bg-[var(--background)] sticky top-0 z-10 text-center">
            <h1 className="text-xl font-black tracking-tight">설정</h1>
      </header>

      <main className="container-px py-4 space-y-8">
        <section className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm animate-slide-up">
          <h2 className="px-6 py-5 text-[13px] font-bold text-[var(--secondary)] border-b border-[var(--border-light)]">알림 및 서비스</h2>
          <SettingsItem icon={<Bell size={20} strokeWidth={2.5} />} label="새 뉴스 알림" value="켜짐" />
          <SettingsItem icon={<Shield size={20} strokeWidth={2.5} />} label="중요 알림만 필터링" value="꺼짐" />
        </section>

        <section className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="px-6 py-5 text-[13px] font-bold text-[var(--secondary)] border-b border-[var(--border-light)]">앱 커스텀</h2>
          <SettingsItem icon={<Moon size={20} strokeWidth={2.5} />} label="다크 모드" value="시스템 설정" />
          <SettingsItem icon={<SettingsIcon size={20} strokeWidth={2.5} />} label="홈 화면 위젯 편집" />
        </section>

        <section className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="px-6 py-5 text-[13px] font-bold text-[var(--secondary)] border-b border-[var(--border-light)]">정보</h2>
          <SettingsItem icon={<Info size={20} strokeWidth={2.5} />} label="버전 정보" value="v1.0.0" hasArrow={false} />
          <SettingsItem icon={<Shield size={20} strokeWidth={2.5} />} label="개인정보 처리방침" />
        </section>

        <button className="w-full py-5 text-center text-[15px] font-black text-[var(--danger)] hover:bg-[var(--danger)]/5 rounded-[var(--radius-lg)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
            <LogOut size={18} strokeWidth={3} />
            로그아웃
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
