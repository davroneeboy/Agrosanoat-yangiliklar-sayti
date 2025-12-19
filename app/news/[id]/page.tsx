'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import { getNewsById, type News } from '@/lib/api-public'
import Image from 'next/image'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { currentLang } = useLanguage()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)
        const id = parseInt(params.id as string)
        if (isNaN(id)) {
          throw new Error('Неверный ID новости')
        }
        const data = await getNewsById(id)
        setNews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки новости')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchNews()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLang === 'uz' ? 'uz-UZ' : currentLang === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">
              {currentLang === 'uz' && 'Yuklanmoqda...'}
              {currentLang === 'ru' && 'Загрузка...'}
              {currentLang === 'en' && 'Loading...'}
            </p>
          </div>
        </div>
        <Footer currentLang={currentLang} />
      </main>
    )
  }

  if (error || !news) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Новость не найдена'}
          </div>
          <Link
            href="/news"
            className="mt-4 inline-block text-primary-600 hover:text-primary-700"
          >
            {currentLang === 'uz' && '← Yangiliklarga qaytish'}
            {currentLang === 'ru' && '← Вернуться к новостям'}
            {currentLang === 'en' && '← Back to news'}
          </Link>
        </div>
        <Footer currentLang={currentLang} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: news.title,
          ru: news.title,
          en: news.title
        }}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop"
      />

      {/* News Content */}
      <article className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">{news.title}</h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base text-gray-600">
                <time dateTime={news.created_at} className="flex items-center">
                  {formatDate(news.created_at)}
                </time>
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {news.views_count}
                </span>
              </div>
            </header>

            {news.thumb && (
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full mb-6 sm:mb-8 rounded-lg overflow-hidden">
                <Image
                  src={news.thumb}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
              </div>
            )}

            {news.short_description && (
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 font-semibold">{news.short_description}</p>
            )}

            <div
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />

            {news.images && news.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                {news.images.map((image) => (
                  <div key={image.id} className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image.image}
                      alt={image.caption || news.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs sm:text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-8 border-t">
              <Link
                href="/news"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {currentLang === 'uz' && 'Yangiliklarga qaytish'}
                {currentLang === 'ru' && 'Вернуться к новостям'}
                {currentLang === 'en' && 'Back to news'}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

