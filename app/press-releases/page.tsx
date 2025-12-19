'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

export default function PressReleasesPage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: 'Press-relizlar',
          ru: 'Пресс-релизы',
          en: 'Press Releases'
        }}
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop"
      />

      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-800">
              {currentLang === 'uz' && 'Bosh sahifa'}
              {currentLang === 'ru' && 'Главная'}
              {currentLang === 'en' && 'Home'}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/info-service" className="text-primary-600 hover:text-primary-800">
              {currentLang === 'uz' && 'Axborot xizmati'}
              {currentLang === 'ru' && 'Информационный сервис'}
              {currentLang === 'en' && 'Information Service'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">
              {currentLang === 'uz' && 'Press-relizlar'}
              {currentLang === 'ru' && 'Пресс-релизы'}
              {currentLang === 'en' && 'Press Releases'}
            </span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 text-lg">
                {currentLang === 'uz' && 'Hozircha press-relizlar mavjud emas.'}
                {currentLang === 'ru' && 'На данный момент пресс-релизы отсутствуют.'}
                {currentLang === 'en' && 'No press releases available at the moment.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

