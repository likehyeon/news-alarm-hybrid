import React from 'react';
import { Metadata } from 'next';
import AppHomeClient from './AppHomeClient';

export const metadata: Metadata = {
  title: "홈",
  description: "실시간 주식 정보 및 AI 뉴스 요약 위젯",
};

export default function Home() {
  return <AppHomeClient />;
}
