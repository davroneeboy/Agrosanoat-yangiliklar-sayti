'use client'

import Header from '@/components/Header'
import NewsSection from '@/components/NewsSection'
import VideoReportsSection from '@/components/VideoReportsSection'
import TelegramPostsSection from '@/components/TelegramPostsSection'
import StatisticsSection from '@/components/StatisticsSection'
import InteractiveMap from '@/components/InteractiveMap'
import AnalyticsSection from '@/components/AnalyticsSection'
import UsefulInfoSection from '@/components/UsefulInfoSection'
import AdviceSection from '@/components/AdviceSection'
import PhotoGallerySection from '@/components/PhotoGallerySection'
import MainDirectionsSection from '@/components/MainDirectionsSection'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { useLanguage } from '@/lib/useLanguage'

export default function Home() {
  const { currentLang } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      <StatisticsSection currentLang={currentLang} />
      <InteractiveMap currentLang={currentLang} />
      <NewsSection currentLang={currentLang} />
      <VideoReportsSection currentLang={currentLang} />
      <TelegramPostsSection currentLang={currentLang} />
      <AnalyticsSection currentLang={currentLang} />
      <MainDirectionsSection currentLang={currentLang} />
      <PhotoGallerySection currentLang={currentLang} />
      <AdviceSection currentLang={currentLang} />
      <UsefulInfoSection currentLang={currentLang} />
      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

