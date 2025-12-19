'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Language, getTranslation } from '@/lib/i18n'
import { getYouTubeVideos, getYouTubeThumbnail, getYouTubeEmbedUrl, type YouTubeVideo } from '@/lib/youtube'

type VideoReportsSectionProps = {
  currentLang: Language
}

type VideoItem = {
  id: number
  title: {
    uz: string
    ru: string
    en: string
  }
  description: {
    uz: string
    ru: string
    en: string
  }
  date: string
  time: string
  thumbnail: string
  videoUrl?: string
  views: number
  duration?: string
}

// Fallback данные на случай, если API недоступен
const fallbackVideos: VideoItem[] = [
  {
    id: 1,
    title: {
      uz: 'FAO dan maxsus texnika: chigirtka bilan kurashishda yordam',
      ru: 'СПЕЦИАЛЬНАЯ ТЕХНИКА ОТ ФАО: ПОДДЕРЖКА В БОРЬБЕ С САРАНЧОЙ',
      en: 'SPECIAL EQUIPMENT FROM FAO: SUPPORT IN FIGHTING LOCUSTS',
    },
    description: {
      uz: 'Chigirtka qishloq xo\'jaligi ekinlariga katta zarar yetkazadi. Har yili bu zararkunanda bilan kurashish qishloq xo\'jaligi sohasidagi muhim vazifalardan biridir.',
      ru: 'Саранча наносит большой ущерб сельскохозяйственным культурам. Ежегодно борьба с этим вредителем является одной из важных задач в сельскохозяйственной сфере.',
      en: 'Locusts cause significant damage to agricultural crops. Fighting this pest annually is one of the important tasks in the agricultural sector.',
    },
    date: '2023-09-26',
    time: '10:45',
    thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
    views: 5428,
    duration: '5:32',
  },
  {
    id: 2,
    title: {
      uz: 'Yangi agrotexnologiyalar: kelajak qishloq xo\'jaligi',
      ru: 'Новые агротехнологии: сельское хозяйство будущего',
      en: 'New Agrotechnologies: Agriculture of the Future',
    },
    description: {
      uz: 'Zamonaviy agrotexnologiyalar qishloq xo\'jaligini rivojlantirish va hosildorlikni oshirishda muhim rol o\'ynaydi.',
      ru: 'Современные агротехнологии играют важную роль в развитии сельского хозяйства и повышении урожайности.',
      en: 'Modern agrotechnologies play an important role in agricultural development and yield increase.',
    },
    date: '2023-10-15',
    time: '14:20',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    views: 6891,
    duration: '8:15',
  },
  {
    id: 3,
    title: {
      uz: 'Suv resurslarini boshqarish: samarali sug\'orish tizimlari',
      ru: 'Управление водными ресурсами: эффективные системы орошения',
      en: 'Water Resource Management: Efficient Irrigation Systems',
    },
    description: {
      uz: 'Suv resurslarini samarali boshqarish va zamonaviy sug\'orish tizimlaridan foydalanish qishloq xo\'jaligining muvaffaqiyatli rivojlanishi uchun zarur.',
      ru: 'Эффективное управление водными ресурсами и использование современных систем орошения необходимо для успешного развития сельского хозяйства.',
      en: 'Efficient water resource management and use of modern irrigation systems is essential for successful agricultural development.',
    },
    date: '2023-10-20',
    time: '16:30',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    views: 4321,
    duration: '6:45',
  },
  {
    id: 4,
    title: {
      uz: 'Organik qishloq xo\'jaligi: tabiiy usullar',
      ru: 'Органическое сельское хозяйство: природные методы',
      en: 'Organic Agriculture: Natural Methods',
    },
    description: {
      uz: 'Organik qishloq xo\'jaligi atrof-muhitga zararsiz va sog\'liq uchun foydali mahsulotlar yetishtirishga imkon beradi.',
      ru: 'Органическое сельское хозяйство позволяет производить экологически чистые и полезные для здоровья продукты.',
      en: 'Organic agriculture enables the production of environmentally friendly and health-beneficial products.',
    },
    date: '2023-11-05',
    time: '11:15',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop',
    views: 5672,
    duration: '7:20',
  },
]

// Преобразование YouTube видео в формат VideoItem
const convertYouTubeToVideoItem = (youtubeVideo: YouTubeVideo, index: number, currentLang: Language = 'ru'): VideoItem => {
  const publishedDate = new Date(youtubeVideo.publishedAt)
  
  // Используем локаль в зависимости от языка
  let locale = 'ru-RU'
  if (currentLang === 'uz') {
    locale = 'uz-UZ'
  } else if (currentLang === 'en') {
    locale = 'en-US'
  }
  
  const time = publishedDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  const date = publishedDate.toISOString().split('T')[0]

  // Проверяем, что ID валидный (не плейсхолдер)
  const isValidVideoId = youtubeVideo.id && !youtubeVideo.id.includes('VIDEO_ID') && youtubeVideo.id.length > 5
  
  // Используем thumbnail из API, если есть и он валидный, иначе создаем только если ID валидный
  let thumbnail: string = youtubeVideo.thumbnail || ''
  // Проверяем, что thumbnail не содержит VIDEO_ID
  if (thumbnail && thumbnail.includes('VIDEO_ID')) {
    thumbnail = ''
  }
  if (!thumbnail && isValidVideoId) {
    thumbnail = getYouTubeThumbnail(youtubeVideo.id)
  }
  // Если thumbnail все еще нет или невалидный, используем fallback изображение
  if (!thumbnail || thumbnail.includes('VIDEO_ID')) {
    thumbnail = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop'
  }

  return {
    id: index + 1,
    title: {
      uz: youtubeVideo.title,
      ru: youtubeVideo.title,
      en: youtubeVideo.title,
    },
    description: {
      uz: youtubeVideo.description.substring(0, 150) + (youtubeVideo.description.length > 150 ? '...' : ''),
      ru: youtubeVideo.description.substring(0, 150) + (youtubeVideo.description.length > 150 ? '...' : ''),
      en: youtubeVideo.description.substring(0, 150) + (youtubeVideo.description.length > 150 ? '...' : ''),
    },
    date,
    time,
    thumbnail,
    videoUrl: isValidVideoId ? getYouTubeEmbedUrl(youtubeVideo.id) : undefined,
    views: youtubeVideo.viewCount || 0,
    duration: youtubeVideo.duration,
  }
}

const VideoReportsSection = ({ currentLang }: VideoReportsSectionProps) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [videoData, setVideoData] = useState<VideoItem[]>(fallbackVideos)
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = getTranslation(currentLang)

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        const youtubeVideos = await getYouTubeVideos()
        if (youtubeVideos.length > 0) {
          const convertedVideos = youtubeVideos.map((video, index) =>
            convertYouTubeToVideoItem(video, index, currentLang)
          )
          setVideoData(convertedVideos)
        }
      } catch (error) {
        console.error('Failed to load YouTube videos:', error)
        // Используем fallback данные
        setVideoData(fallbackVideos)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
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

  // Функция форматирования чисел для избежания проблем с гидратацией
  // Используем фиксированную локаль для одинакового форматирования на сервере и клиенте
  const formatNumber = (num: number): string => {
    // Используем 'en-US' для единообразного форматирования (запятые как разделители тысяч)
    return num.toLocaleString('en-US')
  }

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(dateString)
    
    // Форматируем дату в зависимости от языка
    const day = date.getDate()
    const monthNames: { [key: string]: string[] } = {
      uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
      ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    }
    
    const month = monthNames[currentLang][date.getMonth()]
    const year = date.getFullYear()

    let formattedDate = ''
    if (currentLang === 'uz') {
      formattedDate = `${day}-${month}, ${year}`
    } else if (currentLang === 'ru') {
      formattedDate = `${day} ${month} ${year}`
    } else {
      formattedDate = `${month} ${day}, ${year}`
    }

    return `${time}, ${formattedDate}`
  }

  const handleVideoClick = (videoId: number) => {
    setSelectedVideo(videoId)
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900 relative">
              {t.sections.videoReports}
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
                aria-label="Предыдущие видео"
                tabIndex={0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Следующие видео"
                tabIndex={0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </div>
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videoData.map((video, index) => (
              <article
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden card-hover flex-shrink-0 w-80 md:w-96 cursor-pointer animate-slide-in-right hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => handleVideoClick(video.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleVideoClick(video.id)
                  }
                }}
              >
                <div className="relative h-48 overflow-hidden group">
                  {(() => {
                    // Проверяем, что thumbnail не содержит VIDEO_ID
                    const isValidThumbnail = video.thumbnail && 
                      !video.thumbnail.includes('VIDEO_ID') && 
                      (video.thumbnail.startsWith('http://') || video.thumbnail.startsWith('https://'))
                    
                    const thumbnailUrl = isValidThumbnail 
                      ? video.thumbnail 
                      : 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop'
                    
                    return (
                      <Image
                        src={thumbnailUrl}
                        alt={video.title[currentLang]}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 320px, 384px"
                        unoptimized={!isValidThumbnail}
                      />
                    )
                  })()}
                  {/* Overlay с кнопкой воспроизведения */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-primary-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Длительность видео */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm font-semibold">
                      {video.duration}
                    </div>
                  )}
                </div>
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
                    {formatDate(video.date, video.time)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {video.title[currentLang]}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {video.description[currentLang]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{formatNumber(video.views)} просмотров</span>
                    </div>
                    <span className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors">
                      Смотреть →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для видео */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleCloseVideo}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Закрыть видео"
              tabIndex={0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {(() => {
              const video = videoData.find((v) => v.id === selectedVideo)
              if (!video) return null
              return (
                <div className="p-6">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    {video.videoUrl ? (
                      <iframe
                        src={`${video.videoUrl}?rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title[currentLang]}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <p>Видео недоступно</p>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{video.title[currentLang]}</h3>
                  <p className="text-gray-600 mb-4">{video.description[currentLang]}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDate(video.date, video.time)}
                    <span className="mx-2">•</span>
                    <span>{formatNumber(video.views)} просмотров</span>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}

export default VideoReportsSection

