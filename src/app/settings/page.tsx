import { Metadata } from 'next';
import { Settings as SettingsIcon, Bell, Moon, Shield, Info, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';

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
  <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--border)] transition-colors">
    <div className="flex items-center gap-3">
      <div className="text-[var(--secondary)]">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-xs text-[var(--secondary)]">{value}</span>}
      {hasArrow && <ChevronRight size={16} className="text-[var(--border)]" />}
    </div>
  </button>
);

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="px-6 py-6 border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <Link href="/" className="p-1 -ml-1 hover:bg-[var(--background)] rounded-full transition-colors">
                <ChevronRight className="rotate-180" size={24} />
            </Link>
            <h1 className="text-2xl font-bold">설정</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section className="surface overflow-hidden">
          <h2 className="px-4 py-3 text-[10px] uppercase font-bold text-[var(--secondary)] bg-[var(--background)]/50 border-b border-[var(--border)]">알림 및 서비스</h2>
          <SettingsItem icon={<Bell size={18} />} label="알림 설정" value="On" />
          <SettingsItem icon={<Shield size={18} />} label="중요 알림만 받기 (⚡3개 이상)" value="Off" />
        </section>

        <section className="surface overflow-hidden">
          <h2 className="px-4 py-3 text-[10px] uppercase font-bold text-[var(--secondary)] bg-[var(--background)]/50 border-b border-[var(--border)]">앱 설정</h2>
          <SettingsItem icon={<Moon size={18} />} label="다크 모드" value="시스템 설정" />
          <SettingsItem icon={<SettingsIcon size={18} />} label="위젯 레이아웃 편집" />
        </section>

        <section className="surface overflow-hidden">
          <h2 className="px-4 py-3 text-[10px] uppercase font-bold text-[var(--secondary)] bg-[var(--background)]/50 border-b border-[var(--border)]">정보</h2>
          <SettingsItem icon={<Info size={18} />} label="버전 정보" value="v1.0.0" hasArrow={false} />
          <SettingsItem icon={<Shield size={18} />} label="개인정보 처리방침" />
        </section>

        <button className="w-full py-4 text-center text-sm font-bold text-[#f04452] hover:bg-[#f04452]/5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <LogOut size={16} />
            로그아웃
        </button>
      </main>
    </div>
  );
}
