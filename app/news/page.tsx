'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import { getNewsList, type News } from '@/lib/api-public'
import Image from 'next/image'

export default function NewsPage() {
  const { currentLang } = useLanguage()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()
  const t = getTranslation(currentLang)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)
        const response = await getNewsList({
          page,
          ordering: '-created_at',
        })
        setNews(response.results)
        setTotalPages(Math.ceil(response.count / 10))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки новостей')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [page])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLang === 'uz' ? 'uz-UZ' : currentLang === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: 'Yangiliklar',
          ru: 'Новости',
          en: 'News'
        }}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop"
      />

      {/* News List */}
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

          {!loading && !error && news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {currentLang === 'uz' && 'Yangiliklar topilmadi'}
                {currentLang === 'ru' && 'Новости не найдены'}
                {currentLang === 'en' && 'No news found'}
              </p>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {news.map((item, index) => (
                <ScrollReveal key={item.id} direction="up" delay={index * 100}>
                  <Link
                    href={`/news/${item.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group block"
                  >
                  {item.thumb && (
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={item.thumb}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.short_description && (
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">{item.short_description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 flex-wrap gap-2">
                      <span className="truncate">{formatDate(item.created_at)}</span>
                      <span className="flex items-center flex-shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {item.views_count}
                      </span>
                    </div>
                  </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-6 sm:mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors text-sm sm:text-base"
              >
                {currentLang === 'uz' && 'Oldingi'}
                {currentLang === 'ru' && 'Предыдущая'}
                {currentLang === 'en' && 'Previous'}
              </button>
              <span className="px-4 py-2 text-gray-700 text-sm sm:text-base">
                {currentLang === 'uz' && `Sahifa ${page} / ${totalPages}`}
                {currentLang === 'ru' && `Страница ${page} / ${totalPages}`}
                {currentLang === 'en' && `Page ${page} / ${totalPages}`}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors text-sm sm:text-base"
              >
                {currentLang === 'uz' && 'Keyingi'}
                {currentLang === 'ru' && 'Следующая'}
                {currentLang === 'en' && 'Next'}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

