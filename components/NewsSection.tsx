'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Language, getTranslation } from '@/lib/i18n'
import { getNewsList, type News } from '@/lib/api-public'

type NewsSectionProps = {
  currentLang: Language
}

const NewsSection = ({ currentLang }: NewsSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)
        const response = await getNewsList({
          page: 1,
          ordering: '-created_at',
        })
        // Берем первые 6 новостей для главной страницы
        setNews(response.results.slice(0, 6))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки новостей')
        console.error('Ошибка загрузки новостей:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(
      currentLang === 'uz' ? 'uz-UZ' : currentLang === 'ru' ? 'ru-RU' : 'en-US',
      {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    )
  }

  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900 relative">
            {t.news.title}
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary-600"></span>
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Предыдущие новости"
              tabIndex={0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Следующие новости"
              tabIndex={0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Загрузка новостей...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Новости не найдены</div>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {news.map((newsItem, index) => (
            <article
                key={newsItem.id}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover flex-shrink-0 w-80 md:w-96 animate-slide-in-right hover:animate-glow"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                  {newsItem.thumb ? (
                    <Image
                      src={newsItem.thumb}
                      alt={newsItem.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 320px, 384px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Нет изображения</span>
                    </div>
                  )}
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t.news.title}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                    {t.news.date}: {formatDate(newsItem.created_at)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {newsItem.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {newsItem.short_description || newsItem.description.substring(0, 150) + '...'}
                </p>
                  <Link
                    href={`/news/${newsItem.id}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  tabIndex={0}
                    aria-label={`${t.news.readMore}: ${newsItem.title}`}
                >
                  {t.news.readMore}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  </Link>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>0 комментариев</span>
                  <span className="mx-2">•</span>
                    <span>{newsItem.views_count.toLocaleString()} просмотров</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default NewsSection

