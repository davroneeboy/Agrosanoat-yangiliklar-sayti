'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import { getDigitalGovList, type DigitalGov } from '@/lib/api-public'

export default function DigitalGovPage() {
  const { currentLang } = useLanguage()
  const [data, setData] = useState<DigitalGov[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const response = await getDigitalGovList({
          ordering: '-created_at',
        })
        setData(response.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: 'Raqamli hukumat',
          ru: 'Цифровое правительство',
          en: 'Digital Government'
        }}
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop"
      />

      {/* Content */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
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

          {!loading && !error && data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {currentLang === 'uz' && 'Ma\'lumotlar topilmadi'}
                {currentLang === 'ru' && 'Данные не найдены'}
                {currentLang === 'en' && 'No data found'}
              </p>
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {data.map((item, index) => (
                <ScrollReveal key={item.id} direction="up" delay={index * 100}>
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                  {item.about_us_digital && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentLang === 'uz' && 'Biz haqimizda (Raqamli)'}
                        {currentLang === 'ru' && 'О нас (Цифровое)'}
                        {currentLang === 'en' && 'About Us (Digital)'}
                      </h2>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.about_us_digital }}
                      />
                    </div>
                  )}

                  {item.fruit_ration && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentLang === 'uz' && 'Meva ratsioni'}
                        {currentLang === 'ru' && 'Фруктовый рацион'}
                        {currentLang === 'en' && 'Fruit Ration'}
                      </h2>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.fruit_ration }}
                      />
                    </div>
                  )}

                  {item.zahira && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentLang === 'uz' && 'Zaxira'}
                        {currentLang === 'ru' && 'Запас'}
                        {currentLang === 'en' && 'Reserve'}
                      </h2>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.zahira }}
                      />
                    </div>
                  )}

                  {item.vakancies && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentLang === 'uz' && 'Vakansiyalar'}
                        {currentLang === 'ru' && 'Вакансии'}
                        {currentLang === 'en' && 'Vacancies'}
                      </h2>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.vakancies }}
                      />
                    </div>
                  )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

