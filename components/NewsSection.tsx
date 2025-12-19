'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Language, getTranslation } from '@/lib/i18n'
import { getNewsList, type News } from '@/lib/api-public'

// Компонент слайдера изображений для новости
type NewsImageSliderProps = {
  newsItem: News
  currentIndex: number
  onImageChange: (index: number) => void
  currentLang: Language
  t: ReturnType<typeof getTranslation>
}

const NewsImageSlider = ({ newsItem, currentIndex, onImageChange, currentLang, t }: NewsImageSliderProps) => {
  // Сначала thumb, затем images
  const images: string[] = []
  if (newsItem.thumb) {
    images.push(newsItem.thumb)
  }
  if (newsItem.images && newsItem.images.length > 0) {
    // Сортируем по order, если есть
    const sortedImages = [...newsItem.images].sort((a, b) => (a.order || 0) - (b.order || 0))
    sortedImages.forEach(img => {
      if (img.image && !images.includes(img.image)) {
        images.push(img.image)
      }
    })
  }

  const hasMultipleImages = images.length > 1

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onImageChange((currentIndex - 1 + images.length) % images.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onImageChange((currentIndex + 1) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Нет изображения</span>
        </div>
        <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {t.news.title}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-48 overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={`${newsItem.id}-${image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={image}
            alt={`${newsItem.title} - ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 320px, 384px"
            priority={index === 0}
          />
        </div>
      ))}
      
      <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
        {t.news.title}
      </div>

      {hasMultipleImages && (
        <>
          {/* Кнопка предыдущего изображения */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Предыдущее изображение"
            tabIndex={0}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Кнопка следующего изображения */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Следующее изображение"
            tabIndex={0}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы изображений */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onImageChange(index)
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 h-2 bg-white shadow-lg'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Изображение ${index + 1}`}
                tabIndex={0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

type NewsSectionProps = {
  currentLang: Language
}

const NewsSection = ({ currentLang }: NewsSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const isFetchingRef = useRef(false)
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const t = getTranslation(currentLang)

  useEffect(() => {
    // Защита от повторных запросов
    if (isFetchingRef.current) return
    
    async function fetchNews() {
      if (isFetchingRef.current) return
      isFetchingRef.current = true
      
      try {
        setLoading(true)
        setError(null)
        const response = await getNewsList({
          page: 1,
          ordering: '-created_at',
        })
        // Берем первые 6 новостей для главной страницы
        const newsData = response.results.slice(0, 6)
        setNews(newsData)
        // Инициализируем индексы изображений для каждой новости
        const initialIndexes: { [key: number]: number } = {}
        newsData.forEach((item) => {
          initialIndexes[item.id] = 0
        })
        setCurrentImageIndex(initialIndexes)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки новостей')
        console.error('Ошибка загрузки новостей:', err)
      } finally {
        setLoading(false)
        isFetchingRef.current = false
      }
    }

    fetchNews()
  }, [])

  // Автоматическая смена изображений каждые 2 секунды
  useEffect(() => {
    // Очищаем предыдущие интервалы
    intervalsRef.current.forEach((interval) => clearInterval(interval))
    intervalsRef.current = []

    if (news.length === 0) return

    news.forEach((newsItem) => {
      // Формируем массив изображений: сначала thumb, потом images
      const images: string[] = []
      if (newsItem.thumb) {
        images.push(newsItem.thumb)
      }
      if (newsItem.images && newsItem.images.length > 0) {
        const sortedImages = [...newsItem.images].sort((a, b) => (a.order || 0) - (b.order || 0))
        sortedImages.forEach(img => {
          if (img.image && !images.includes(img.image)) {
            images.push(img.image)
          }
        })
      }

      if (images.length > 1) {
        const newsItemId = newsItem.id
        const imagesLength = images.length
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => {
            const currentIdx = prev[newsItemId] ?? 0
            const nextIdx = (currentIdx + 1) % imagesLength
            return {
              ...prev,
              [newsItemId]: nextIdx,
            }
          })
        }, 2000)
        intervalsRef.current.push(interval)
      }
    })

    return () => {
      intervalsRef.current.forEach((interval) => clearInterval(interval))
      intervalsRef.current = []
    }
  }, [news])

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
              <NewsImageSlider 
                newsItem={newsItem}
                currentIndex={currentImageIndex[newsItem.id] || 0}
                onImageChange={(newIndex) => {
                  setCurrentImageIndex((prev) => ({
                    ...prev,
                    [newsItem.id]: newIndex,
                  }))
                }}
                currentLang={currentLang}
                t={t}
              />
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

