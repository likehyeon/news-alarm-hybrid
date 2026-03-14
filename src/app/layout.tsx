import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | News Alarm",
    default: "News Alarm - 실시간 AI 뉴스 요약 및 알림",
  },
  description: "내가 관심 있는 기업의 소식을 세상에서 가장 빠르게, AI 요약과 함께 받아보세요. 투자자를 위한 최고의 동반자.",
  keywords: ["주식", "뉴스", "AI요약", "투자", "티커", "실시간알림", "현대차", "엔비디아", "팔란티어"],
  authors: [{ name: "News Alarm Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://news-alarm.app",
    title: "News Alarm - 실시간 AI 뉴스 요약",
    description: "투자자를 위한 2줄 뉴스 요약 및 실시간 ⚡ 중요 알림 서비스",
    siteName: "News Alarm",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
