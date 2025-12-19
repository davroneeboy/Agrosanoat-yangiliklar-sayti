'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import { getAboutList, type About } from '@/lib/api-public'
import Image from 'next/image'

export default function AboutPage() {
  const { currentLang } = useLanguage()
  const [aboutData, setAboutData] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    async function fetchAbout() {
      try {
        setLoading(true)
        setError(null)
        const response = await getAboutList()
        if (response.results.length > 0) {
          setAboutData(response.results[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  // Функция для форматирования текста с абзацами
  const formatTextWithParagraphs = (text: string): string => {
    if (!text) return ''
    
    // Заменяем двойные переносы строк (\r\n\r\n, \n\n, \r\r) на разделители абзацев
    let formatted = text
      .replace(/\r\n\r\n/g, '|||PARAGRAPH|||')
      .replace(/\n\n/g, '|||PARAGRAPH|||')
      .replace(/\r\r/g, '|||PARAGRAPH|||')
    
    // Разделяем на абзацы
    const paragraphs = formatted.split('|||PARAGRAPH|||')
    
    // Оборачиваем каждый абзац в <p> тег и обрабатываем одиночные переносы строк
    const htmlParagraphs = paragraphs
      .map(para => {
        if (!para.trim()) return ''
        // Заменяем одиночные переносы строк на <br>
        const withBreaks = para
          .replace(/\r\n/g, '<br>')
          .replace(/\n/g, '<br>')
          .replace(/\r/g, '<br>')
        return `<p>${withBreaks.trim()}</p>`
      })
      .filter(p => p !== '')
    
    return htmlParagraphs.join('')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={t.about.title}
        backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=600&fit=crop"
      />

      {/* Main Content */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">
                  {currentLang === 'uz' && 'Yuklanmoqda...'}
                  {currentLang === 'ru' && 'Загрузка...'}
                  {currentLang === 'en' && 'Loading...'}
                </p>
                  </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
                </div>
            )}

            {!loading && !error && aboutData && (
              <>
                {aboutData.about_us && (
                  <ScrollReveal direction="up" delay={0}>
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 border-b-2 border-primary-200">
                        {currentLang === 'uz' && 'Biz haqimizda'}
                        {currentLang === 'ru' && 'О нас'}
                        {currentLang === 'en' && 'About Us'}
                      </h2>
                      <div
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                        style={{
                          wordWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: formatTextWithParagraphs(aboutData.about_us) }}
                      />
                </div>
                  </ScrollReveal>
                )}

                {aboutData.tashkilot_tizulma && (
                  <ScrollReveal direction="up" delay={100}>
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {currentLang === 'uz' && 'Tashkilot tuzilmasi'}
                        {currentLang === 'ru' && 'Структура организации'}
                        {currentLang === 'en' && 'Organizational Structure'}
                      </h2>
                      <div
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                        style={{
                          wordWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: formatTextWithParagraphs(aboutData.tashkilot_tizulma) }}
                      />
              </div>
                  </ScrollReveal>
                )}

                {aboutData.gov && (
                  <ScrollReveal direction="up" delay={200}>
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {currentLang === 'uz' && 'Rahbariyat'}
                        {currentLang === 'ru' && 'Руководство'}
                        {currentLang === 'en' && 'Management'}
                      </h2>
                      <div
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                        style={{
                          wordWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: formatTextWithParagraphs(aboutData.gov) }}
                      />
            </div>
                  </ScrollReveal>
                )}

                {aboutData.central_apparat && (
                  <ScrollReveal direction="up" delay={300}>
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {currentLang === 'uz' && 'Markaziy apparat'}
                        {currentLang === 'ru' && 'Центральный аппарат'}
                        {currentLang === 'en' && 'Central Office'}
                      </h2>
                      <div
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                        style={{
                          wordWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: formatTextWithParagraphs(aboutData.central_apparat) }}
                      />
                  </div>
                  </ScrollReveal>
                )}

                {aboutData.district_management && (
                  <ScrollReveal direction="up" delay={400}>
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {currentLang === 'uz' && 'Hududiy boshqarmalar'}
                        {currentLang === 'ru' && 'Территориальные управления'}
                        {currentLang === 'en' && 'Territorial Departments'}
                      </h2>
                      <div
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                        style={{
                          wordWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: formatTextWithParagraphs(aboutData.district_management) }}
                      />
                    </div>
                  </ScrollReveal>
                )}
              </>
            )}

            {!loading && !error && !aboutData && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {currentLang === 'uz' && 'Ma\'lumotlar topilmadi'}
                  {currentLang === 'ru' && 'Данные не найдены'}
                  {currentLang === 'en' && 'No data found'}
                </p>
                  </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Tezkor havolalar'}
                {currentLang === 'ru' && 'Быстрые ссылки'}
                {currentLang === 'en' && 'Quick Links'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/about/structure"
                  className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {t.dropdown.about.structure}
                  </h3>
                  <p className="text-gray-600">{t.about.structure.description}</p>
                </a>
                <a
                  href="/about/management"
                  className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {t.dropdown.about.management}
                  </h3>
                  <p className="text-gray-600">{t.about.management.description}</p>
                </a>
                <a
                  href="/about/central"
                  className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {t.dropdown.about.central}
                  </h3>
                  <p className="text-gray-600">{t.about.central.description}</p>
                </a>
                <a
                  href="/about/territorial"
                  className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {t.dropdown.about.territorial}
                  </h3>
                  <p className="text-gray-600">{t.about.territorial.description}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}


