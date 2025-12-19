/**
 * Telegram API клиент
 */

export type TelegramPost = {
  id: string
  text: string
  thumbnail: string | null
  publishedAt: string
  url: string
  hasMedia: boolean
  mediaType?: 'photo' | 'video' | 'document' | 'none'
  mediaUrl?: string | null // Прямая ссылка на медиа файл (видео или изображение)
  views?: number | null
  author?: string | null
}

/**
 * Получить посты из Telegram канала через наш API
 */
export const getTelegramPosts = async (): Promise<TelegramPost[]> => {
  try {
    const response = await fetch('/api/telegram', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Всегда получать свежие данные
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Telegram API HTTP error:', response.status, errorData)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.error) {
      console.warn('Telegram API error:', data.error)
    }
    
    return data.posts || []
  } catch (error) {
    console.error('Error fetching Telegram posts:', error)
    return []
  }
}

/**
 * Получить URL поста в Telegram
 */
export const getTelegramPostUrl = (channelUsername: string, messageId: number) => {
  const cleanUsername = channelUsername.replace('@', '')
  return `https://t.me/${cleanUsername}/${messageId}`
}

/**
 * Извлечь channel username и message ID из Telegram URL
 */
export const extractTelegramPostInfo = (url: string): { channel: string; messageId: number } | null => {
  const pattern = /t\.me\/([^\/]+)\/(\d+)/
  const match = url.match(pattern)
  
  if (match && match[1] && match[2]) {
    return {
      channel: match[1],
      messageId: parseInt(match[2], 10),
    }
  }
  
  return null
}

/**
 * Форматировать текст Telegram поста (убрать HTML теги, обработать ссылки)
 */
export const formatTelegramText = (text: string): string => {
  // Убираем HTML теги
  let formatted = text.replace(/<[^>]*>/g, '')
  
  // Декодируем HTML entities
  formatted = formatted
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
  
  return formatted.trim()
}

