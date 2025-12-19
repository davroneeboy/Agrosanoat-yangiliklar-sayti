'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Language, getTranslation } from '@/lib/i18n'
import { getTelegramPosts, formatTelegramText, type TelegramPost } from '@/lib/telegram'

type TelegramPostsSectionProps = {
  currentLang: Language
}

type PostItem = {
  id: string
  text: string
  thumbnail: string | null
  publishedAt: string
  url: string
  hasMedia: boolean
  mediaType?: 'photo' | 'video' | 'document' | 'none'
  mediaUrl?: string | null
  views?: number | null
  author?: string | null
}

// Fallback данные на случай, если API недоступен
const fallbackPosts: PostItem[] = [
  {
    id: '1',
    text: 'Добро пожаловать в наш Telegram канал! Здесь вы найдете последние новости и обновления.',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop',
    publishedAt: new Date().toISOString(),
    url: 'https://t.me/example/1',
    hasMedia: false,
  },
]

// Преобразование Telegram поста в формат PostItem
const convertTelegramToPostItem = (telegramPost: TelegramPost): PostItem => {
  const publishedDate = new Date(telegramPost.publishedAt)
  
  return {
    id: telegramPost.id,
    text: formatTelegramText(telegramPost.text),
    thumbnail: telegramPost.thumbnail,
    publishedAt: telegramPost.publishedAt,
    url: telegramPost.url,
    hasMedia: telegramPost.hasMedia,
    mediaType: telegramPost.mediaType,
    mediaUrl: telegramPost.mediaUrl,
    views: telegramPost.views,
    author: telegramPost.author,
  }
}

const TelegramPostsSection = ({ currentLang }: TelegramPostsSectionProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [postData, setPostData] = useState<PostItem[]>(fallbackPosts)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const telegramPosts = await getTelegramPosts()
        if (telegramPosts && telegramPosts.length > 0) {
          const convertedPosts = telegramPosts.map((post) =>
            convertTelegramToPostItem(post)
          )
          // Отладочная информация
          console.log('Telegram posts loaded:', convertedPosts.map(p => ({
            id: p.id,
            hasMedia: p.hasMedia,
            mediaType: p.mediaType,
            mediaUrl: p.mediaUrl,
            thumbnail: p.thumbnail
          })))
          setPostData(convertedPosts)
        } else {
          // Если постов нет, используем fallback
          setPostData(fallbackPosts)
        }
      } catch (error) {
        console.error('Failed to load Telegram posts:', error)
        setError('Не удалось загрузить посты из Telegram')
        // Используем fallback данные
        setPostData(fallbackPosts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
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
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    let formattedDate = ''
    if (currentLang === 'uz') {
      formattedDate = date.toLocaleDateString('uz-UZ', options)
    } else if (currentLang === 'ru') {
      formattedDate = date.toLocaleDateString('ru-RU', options)
    } else {
      formattedDate = date.toLocaleDateString('en-US', options)
    }

    return formattedDate
  }

  const handlePostClick = (postId: string) => {
    setSelectedPost(postId)
  }

  const handleClosePost = () => {
    setSelectedPost(null)
  }

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Всегда рендерим компонент, даже если есть ошибки
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900 relative">
              Telegram канал
              <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary-600"></span>
            </h2>
            <div className="flex items-center space-x-4">
              {isLoading && (
                <div className="flex items-center text-gray-500 text-sm">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Загрузка...
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Предыдущие посты"
                  tabIndex={0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Следующие посты"
                  tabIndex={0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {postData && postData.length > 0 ? (
              postData.map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden card-hover flex-shrink-0 w-80 md:w-96 cursor-pointer animate-slide-in-right hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => handlePostClick(post.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handlePostClick(post.id)
                  }
                }}
              >
                {/* Отображение медиа */}
                {(post.mediaUrl || post.thumbnail) && (
                  <div className="relative h-48 overflow-hidden group">
                    {post.mediaType === 'video' && post.mediaUrl ? (
                      // Видео
                      <video
                        src={post.mediaUrl}
                        poster={post.thumbnail || undefined}
                        className="w-full h-full object-cover"
                        controls={false}
                        muted
                        playsInline
                        onMouseEnter={(e) => {
                          const video = e.currentTarget
                          video.play().catch(() => {})
                        }}
                        onMouseLeave={(e) => {
                          const video = e.currentTarget
                          video.pause()
                          video.currentTime = 0
                        }}
                      >
                        Ваш браузер не поддерживает видео.
                      </video>
                    ) : post.mediaUrl || post.thumbnail ? (
                      // Изображение
                      <Image
                        src={post.mediaUrl || post.thumbnail || ''}
                        alt={truncateText(post.text, 50)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 320px, 384px"
                        unoptimized={post.mediaUrl?.includes('telesco.pe') || post.thumbnail?.includes('telesco.pe')}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      {post.mediaType === 'video' && (
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            className="w-8 h-8 text-primary-600 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {post.views && (
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.views.toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDate(post.publishedAt)}
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-4 text-sm leading-relaxed">
                    {truncateText(post.text, 200)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-primary-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                      <span>Telegram</span>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
                    >
                      Читать →
                    </a>
                  </div>
                </div>
              </article>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Посты не найдены</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Модальное окно для поста */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClosePost}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClosePost}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Закрыть пост"
              tabIndex={0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {(() => {
              const post = postData.find((p) => p.id === selectedPost)
              if (!post) return null
              return (
                <div className="p-6">
                  {/* Отображение медиа в модальном окне */}
                  {(post.mediaUrl || post.thumbnail) && (
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4">
                      {post.mediaType === 'video' && post.mediaUrl ? (
                        // Видео в модальном окне
                        <div className="aspect-video bg-black">
                          <video
                            src={post.mediaUrl}
                            poster={post.thumbnail || undefined}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                          >
                            Ваш браузер не поддерживает видео.
                          </video>
                        </div>
                      ) : (
                        // Изображение в модальном окне
                        <div className="relative h-96">
                          <Image
                            src={post.mediaUrl || post.thumbnail || ''}
                            alt={truncateText(post.text, 50)}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 672px"
                            unoptimized={post.mediaUrl?.includes('telesco.pe') || post.thumbnail?.includes('telesco.pe')}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mb-4 flex items-center flex-wrap gap-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatDate(post.publishedAt)}
                    </div>
                    {post.views && (
                      <>
                        <span>•</span>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views.toLocaleString()} просмотров
                        </div>
                      </>
                    )}
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 text-base leading-relaxed whitespace-pre-wrap">
                    {post.text}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Открыть в Telegram
                  </a>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}

export default TelegramPostsSection

