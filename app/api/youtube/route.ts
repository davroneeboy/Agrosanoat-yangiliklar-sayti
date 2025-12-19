import { NextResponse } from 'next/server'

// Кэширование на 1 час
export const revalidate = 3600

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
// Channel ID канала (можно переопределить через переменную окружения)
const DEFAULT_CHANNEL_ID = 'UC9fTKHUcaZOC9NO9xlVKldg'
const YOUTUBE_CHANNEL_USERNAME = 'Agrosanoat_uz' // Используется как fallback для поиска

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured', videos: [] },
      { status: 200 } // Возвращаем пустой массив вместо ошибки
    )
  }

  try {
    // Сначала получаем channelId из переменной окружения, иначе используем дефолтный
    let channelId = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID

    // Если channelId не указан, пытаемся найти через поиск (fallback)
    if (!channelId || channelId === DEFAULT_CHANNEL_ID) {
      // Используем поиск для получения channelId по username (forUsername устарел)
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=@${YOUTUBE_CHANNEL_USERNAME}&type=channel&part=snippet&maxResults=1`
      )

      if (searchResponse.ok) {
        const searchData = await searchResponse.json()
        if (searchData.items && searchData.items.length > 0) {
          channelId = searchData.items[0].id.channelId
        }
      }

      // Если не получилось, пробуем без @
      if (!channelId || channelId === DEFAULT_CHANNEL_ID) {
        const searchResponse2 = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${YOUTUBE_CHANNEL_USERNAME}&type=channel&part=snippet&maxResults=1`
        )
        if (searchResponse2.ok) {
          const searchData2 = await searchResponse2.json()
          if (searchData2.items && searchData2.items.length > 0) {
            channelId = searchData2.items[0].id.channelId
          }
        }
      }
    }

    if (!channelId) {
      console.error('YouTube API: Channel ID not found')
      return NextResponse.json(
        { error: 'Channel ID not found', videos: [] },
        { status: 200 }
      )
    }

    // Получаем последние видео с канала
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('YouTube API search error:', response.status, errorText)
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      console.warn('YouTube API: No videos found')
      return NextResponse.json({ videos: [] })
    }

    // Получаем детальную информацию о видео (просмотры, длительность)
    const videoIds = data.items.map((item: any) => item.id.videoId).filter(Boolean).join(',')
    
    let videoDetails: any = {}
    if (videoIds) {
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`
    )

    if (videoDetailsResponse.ok) {
      const detailsData = await videoDetailsResponse.json()
      if (detailsData.items) {
        detailsData.items.forEach((item: any) => {
          videoDetails[item.id] = {
              viewCount: parseInt(item.statistics?.viewCount || '0', 10),
              duration: item.contentDetails?.duration,
          }
        })
        }
      } else {
        console.warn('YouTube API: Failed to fetch video details')
      }
    }

    // Форматируем длительность (ISO 8601 -> MM:SS)
    const formatDuration = (isoDuration: string): string => {
      const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
      if (!match) return ''
      const hours = (match[1] || '').replace('H', '')
      const minutes = (match[2] || '').replace('M', '')
      const seconds = (match[3] || '').replace('S', '')
      if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
      }
      return `${minutes}:${seconds.padStart(2, '0')}`
    }

    const videos = data.items
      .filter((item: any) => item.id?.videoId) // Фильтруем только валидные видео
      .map((item: any) => {
      const details = videoDetails[item.id.videoId] || {}
      return {
        id: item.id.videoId,
          title: item.snippet?.title || 'Без названия',
          description: item.snippet?.description || '',
        thumbnail:
            item.snippet?.thumbnails?.maxres?.url ||
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
          publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
          channelTitle: item.snippet?.channelTitle || '',
        viewCount: details.viewCount || 0,
        duration: details.duration ? formatDuration(details.duration) : undefined,
      }
    })

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('YouTube API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos', videos: [] },
      { status: 200 }
    )
  }
}

