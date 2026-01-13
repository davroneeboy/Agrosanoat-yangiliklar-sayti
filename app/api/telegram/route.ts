import { NextResponse } from 'next/server'

// Кэширование на 30 минут (Telegram обновляется чаще)
export const revalidate = 1800

// Username канала (можно переопределить через переменную окружения)
const DEFAULT_CHANNEL_USERNAME = 'Agrosanoat_uz'
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

/**
 * Получить посты из публичного Telegram канала через парсинг HTML
 * Telegram предоставляет публичную страницу канала по адресу: https://t.me/s/channelname
 */
async function getTelegramPostsFromRSS(channelUsername: string): Promise<any[]> {
  try {
    // Убираем @ если есть
    const cleanUsername = channelUsername.replace('@', '')
    const channelUrl = `https://t.me/s/${cleanUsername}`
    
    // Парсим HTML страницы канала
    const response = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Парсим HTML для извлечения постов
    // Telegram использует структуру с data-post атрибутами и классами tgme_widget_message
    const posts: any[] = []
    const seenPosts = new Set<string>()

    // Ищем все сообщения через data-post атрибут
    // Используем более точный паттерн - ищем блок сообщения с классом tgme_widget_message
    // Важно: используем non-greedy match и ограничиваем до следующего сообщения
    // Изменяем паттерн, чтобы он правильно захватывал только один блок сообщения
    const messageRegex = /<div[^>]*class="[^"]*tgme_widget_message[^"]*"[^>]*data-post="([^"]+)"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*tgme_widget_message[^"]*"[^>]*data-post="|<\/body>|$)/g
    
    let match
    while ((match = messageRegex.exec(html)) !== null && posts.length < 10) {
      const postData = match[1]
      let messageHtml = match[2]
      
      if (seenPosts.has(postData)) continue
      seenPosts.add(postData)
      
      // КРИТИЧНО: Ограничиваем messageHtml только блоком текущего сообщения
      // Проблема была в том, что регулярное выражение захватывало слишком большой блок
      // и все посты получали медиа из первого найденного блока
      
      // Метод 1: Ищем следующий блок сообщения (более надежный способ)
      const nextMessagePattern = /<div[^>]*class="[^"]*tgme_widget_message[^"]*"[^>]*data-post="/
      const nextMessageIndex = messageHtml.search(nextMessagePattern)
      if (nextMessageIndex > 0 && nextMessageIndex < messageHtml.length) {
        messageHtml = messageHtml.substring(0, nextMessageIndex)
      }
      
      // Метод 2: Дополнительно ограничиваем по структуре закрывающих тегов
      // Ищем последний набор закрывающих тегов, который завершает блок сообщения
      // Но только если после него нет важного контента текущего сообщения
      const structureEndPattern = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/
      let lastValidEnd = -1
      let searchPos = 0
      
      while (searchPos < messageHtml.length) {
        const match = messageHtml.substring(searchPos).match(structureEndPattern)
        if (!match || !match.index) break
        
        const endPos = searchPos + match.index + match[0].length
        const afterEnd = messageHtml.substring(endPos, endPos + 200) // Проверяем 200 символов после
        
        // Если после закрытия нет элементов сообщения, это может быть конец блока
        if (!afterEnd.match(/<div[^>]*class="[^"]*tgme_widget_message_photo/) &&
            !afterEnd.match(/<div[^>]*class="[^"]*tgme_widget_message_video/) &&
            !afterEnd.match(/<div[^>]*class="[^"]*tgme_widget_message_text/)) {
          lastValidEnd = endPos
        }
        
        searchPos = endPos
      }
      
      // Используем найденное закрытие, если оно валидно
      if (lastValidEnd > 200 && lastValidEnd < messageHtml.length - 100) {
        messageHtml = messageHtml.substring(0, lastValidEnd)
      }

      // Извлекаем информацию о посте из data-post (формат: channel/messageId)
      const postIdMatch = postData.match(/([^\/]+)\/(\d+)/)
      if (!postIdMatch) continue

      const [, channel, messageId] = postIdMatch
      const postId = `${channel}_${messageId}`
      
      // Извлекаем текст поста - улучшенный метод
      let text = ''
      
      // Метод 1: Ищем через класс tgme_widget_message_text
      const textMatch1 = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      if (textMatch1) {
        text = textMatch1[1]
      } else {
        // Метод 2: Ищем любой div с текстом внутри сообщения
        const textMatch2 = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_text[^"]*">([\s\S]*?)(?=<\/div>)/i)
        if (textMatch2) {
          text = textMatch2[1]
        } else {
          // Метод 3: Ищем текст напрямую в HTML, исключая служебные элементы
          const textMatch3 = messageHtml.match(/<div[^>]*>([^<]+(?:<[^>]+>[^<]+)*)<\/div>/i)
          if (textMatch3) {
            text = textMatch3[1]
          }
        }
      }
      
      // Очищаем текст от HTML тегов и декодируем entities
      if (text) {
        text = text
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1') // Убираем ссылки, но оставляем текст
          .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '$1') // Убираем strong, но оставляем текст
          .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '$1') // Убираем b, но оставляем текст
          .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '$1') // Убираем em, но оставляем текст
          .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '$1') // Убираем i, но оставляем текст
          .replace(/<[^>]*>/g, '') // Убираем все остальные HTML теги
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
          .trim()
      }
      
      // Если текст все еще пустой, пробуем извлечь из всего HTML блока сообщения
      if (!text || text.trim().length === 0) {
        // Убираем все теги и оставляем только текст
        const cleanText = messageHtml
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<time[^>]*>[\s\S]*?<\/time>/gi, '') // Убираем время
          .replace(/<a[^>]*class="[^"]*tgme_widget_message_date[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '') // Убираем дату
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/\s+/g, ' ')
          .trim()
        
        // Берем первые 500 символов как текст, если есть что-то значимое
        if (cleanText.length > 10) {
          text = cleanText.substring(0, 500)
        }
      }

      // Извлекаем дату
      const dateMatch = messageHtml.match(/<time[^>]*datetime="([^"]+)"[^>]*>/)
      const publishedAt = dateMatch ? dateMatch[1] : new Date().toISOString()

      // Извлекаем медиа файлы (изображения и видео)
      // Важно: исключаем эмблему канала и аватары, ищем только медиа постов
      let thumbnail: string | null = null
      let mediaUrl: string | null = null // Прямая ссылка на медиа файл
      let mediaType: 'photo' | 'video' | 'document' | 'none' = 'none'
      
      // Метод 1: Ищем через класс tgme_widget_message_photo_wrap (основной метод для фото)
      // Важно: ищем только в текущем блоке messageHtml, не в общем контексте
      const imageMatch1 = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_photo_wrap[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i)
      if (imageMatch1 && !imageMatch1[1].includes('avatar') && !imageMatch1[1].includes('logo')) {
        thumbnail = imageMatch1[1]
        if (mediaType === 'none') {
          mediaUrl = imageMatch1[1]
          mediaType = 'photo'
        }
      }
      
      // Метод 2: Ищем через класс tgme_widget_message_photo (альтернативный метод)
      if (!thumbnail) {
        const imageMatch2 = messageHtml.match(/<img[^>]*class="[^"]*tgme_widget_message_photo[^"]*"[^>]*src="([^"]+)"/i)
        if (imageMatch2 && !imageMatch2[1].includes('avatar') && !imageMatch2[1].includes('logo')) {
          thumbnail = imageMatch2[1]
          if (mediaType === 'none') {
            mediaUrl = imageMatch2[1]
            mediaType = 'photo'
          }
        }
      }
      
      // Метод 3: Ищем изображения внутри блока сообщения, но исключаем аватары и эмблемы
      if (!thumbnail) {
        // Ищем img теги, которые находятся внутри блока сообщения, но не являются аватаром
        const imgRegex = /<img[^>]*src="(https:\/\/[^"]+)"[^>]*>/gi
        let imgMatch: RegExpExecArray | null
        while ((imgMatch = imgRegex.exec(messageHtml)) !== null) {
          const imgUrl = imgMatch[1]
          const fullMatch = imgMatch[0]
          
          // Пропускаем аватары, логотипы и эмблемы по URL
          if (imgUrl.includes('avatar') || imgUrl.includes('logo') || imgUrl.includes('icon') || 
              imgUrl.includes('channel') || imgUrl.includes('profile')) {
            continue
          }
          
          // Пропускаем изображения с классами, указывающими на аватар или эмблему
          if (fullMatch.includes('tgme_widget_message_user_photo') || 
              fullMatch.includes('tgme_widget_message_author') ||
              fullMatch.includes('avatar') ||
              fullMatch.includes('logo')) {
            continue
          }
          
          // Проверяем, что это изображение из поста (обычно содержит cdn или telesco.pe)
          if (imgUrl.includes('cdn') || imgUrl.includes('telesco.pe')) {
            // Проверяем, что это не маленькое изображение (аватар обычно маленький, меньше 200x200)
            const sizeMatch = imgUrl.match(/\/(\d+)x(\d+)\//)
            if (sizeMatch) {
              const width = parseInt(sizeMatch[1], 10)
              const height = parseInt(sizeMatch[2], 10)
              // Пропускаем маленькие изображения (вероятно аватары)
              if (width < 200 || height < 200) {
                continue
              }
            }
            thumbnail = imgUrl
            // Если это фото, используем его как медиа
            if (mediaType === 'none') {
              mediaUrl = imgUrl
              mediaType = 'photo'
            }
            break
          }
        }
      }
      
      // Метод 4: Ищем через background-image в style, но только для фото постов
      if (!thumbnail) {
        const bgMatch = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_photo[^"]*"[^>]*style="[^"]*background-image:\s*url\(['"]?([^'"]+)['"]?\)/i)
        if (bgMatch && bgMatch[1] && !bgMatch[1].includes('avatar') && !bgMatch[1].includes('logo')) {
          thumbnail = bgMatch[1]
          if (mediaType === 'none') {
            mediaUrl = bgMatch[1]
            mediaType = 'photo'
          }
        }
      }
      
      // Если нашли фото, но mediaUrl еще не установлен, используем thumbnail
      if (thumbnail && mediaType === 'none' && !mediaUrl) {
        mediaUrl = thumbnail
        mediaType = 'photo'
      }
      // Метод 1: Ищем прямую ссылку на видео файл
      const videoSrcMatch = messageHtml.match(/<video[^>]*src="([^"]+)"[^>]*>/i)
      if (videoSrcMatch) {
        mediaUrl = videoSrcMatch[1]
        mediaType = 'video'
        // Также берем poster как thumbnail
        const videoPosterMatch = messageHtml.match(/<video[^>]*poster="([^"]+)"[^>]*>/i)
        if (videoPosterMatch) {
          thumbnail = videoPosterMatch[1]
        }
      }
      
      // Метод 2: Ищем через класс tgme_widget_message_video
      if (!mediaUrl) {
        const videoMatch2 = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_video[^"]*"[^>]*>[\s\S]*?<video[^>]*src="([^"]+)"[^>]*>/i)
        if (videoMatch2) {
          mediaUrl = videoMatch2[1]
          mediaType = 'video'
          // Ищем poster для thumbnail
          const videoPosterMatch2 = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_video[^"]*"[^>]*>[\s\S]*?<video[^>]*poster="([^"]+)"[^>]*>/i)
          if (videoPosterMatch2) {
            thumbnail = videoPosterMatch2[1]
          } else {
            // Ищем img внутри video блока
            const videoImgMatch = messageHtml.match(/<div[^>]*class="[^"]*tgme_widget_message_video[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i)
            if (videoImgMatch) {
              thumbnail = videoImgMatch[1]
            }
          }
        }
      }
      
      // Метод 3: Ищем через data-video атрибут
      if (!mediaUrl) {
        const videoDataMatch = messageHtml.match(/data-video="([^"]+)"[^>]*>/i)
        if (videoDataMatch) {
          mediaUrl = videoDataMatch[1]
          mediaType = 'video'
        }
      }
      
      // Если нашли видео, но нет thumbnail, используем первую найденную картинку
      if (mediaType === 'video' && !thumbnail) {
        const videoThumbMatch = messageHtml.match(/<img[^>]*src="(https:\/\/cdn[^"]+)"[^>]*class="[^"]*tgme_widget_message_video[^"]*"/i)
        if (videoThumbMatch) {
          thumbnail = videoThumbMatch[1]
        }
      }

      // Тип медиа уже определен выше при извлечении файлов
      // Если тип еще не определен, определяем по наличию элементов
      if (mediaType === 'none') {
        if (messageHtml.includes('tgme_widget_message_video') || messageHtml.includes('<video')) {
          mediaType = 'video'
        } else if (messageHtml.includes('tgme_widget_message_photo') || 
                   messageHtml.includes('tgme_widget_message_photo_wrap')) {
          mediaType = 'photo'
        } else if (messageHtml.includes('tgme_widget_message_document')) {
          mediaType = 'document'
        } else if (thumbnail || mediaUrl) {
          mediaType = 'photo'
        }
      }

      // Проверяем наличие медиа
      const hasMedia = !!(thumbnail || messageHtml.includes('tgme_widget_message_photo') || messageHtml.includes('tgme_widget_message_video'))

      // Извлекаем количество просмотров (если доступно)
      let views: number | null = null
      const viewsMatch = messageHtml.match(/<span[^>]*class="[^"]*tgme_widget_message_views[^"]*"[^>]*>([\s\S]*?)<\/span>/i)
      if (viewsMatch) {
        const viewsText = viewsMatch[1].replace(/<[^>]*>/g, '').trim()
        // Парсим число из текста (например, "1.2K" -> 1200, "5.5M" -> 5500000)
        const viewsNum = viewsText.match(/([\d.]+)/)
        if (viewsNum) {
          const num = parseFloat(viewsNum[1])
          if (viewsText.includes('K') || viewsText.includes('к')) {
            views = Math.round(num * 1000)
          } else if (viewsText.includes('M') || viewsText.includes('м')) {
            views = Math.round(num * 1000000)
          } else {
            views = Math.round(num)
          }
        }
      }

      // Извлекаем автора поста (если есть)
      let author: string | null = null
      const authorMatch = messageHtml.match(/<a[^>]*class="[^"]*tgme_widget_message_owner_name[^"]*"[^>]*>([\s\S]*?)<\/a>/i)
      if (authorMatch) {
        author = authorMatch[1].replace(/<[^>]*>/g, '').trim()
      }

      // Ссылки больше не извлекаем, так как они не нужны

      // Если текст все еще пустой, пробуем извлечь из всего HTML блока сообщения
      if (!text || text.trim().length === 0) {
        // Убираем все теги и оставляем только текст
        const cleanText = messageHtml
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x27;/g, "'")
          .replace(/\s+/g, ' ')
          .trim()
        
        // Берем первые 500 символов как текст
        if (cleanText.length > 0) {
          text = cleanText.substring(0, 500)
        }
      }

      posts.push({
        id: postId,
        messageId: parseInt(messageId, 10),
        channel: channel,
        text: text || 'Без текста',
        publishedAt,
        thumbnail: thumbnail,
        url: `https://t.me/${channel}/${messageId}`,
        hasMedia,
        mediaType,
        mediaUrl: mediaUrl || null, // Прямая ссылка на медиа файл
        views,
        author,
      })
    }

    // Сортируем по дате (новые первыми)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return posts.slice(0, 10)
  } catch (error) {
    console.error('Error fetching Telegram posts from RSS:', error)
    throw error
  }
}

/**
 * Получить посты через Telegram Bot API (если есть токен)
 */
async function getTelegramPostsFromBotAPI(channelUsername: string): Promise<any[] | null> {
  if (!TELEGRAM_BOT_TOKEN) {
    return null
  }

  try {
    // Убираем @ если есть
    const cleanUsername = channelUsername.replace('@', '')
    
    // Получаем информацию о канале
    const chatResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=@${cleanUsername}`
    )

    if (!chatResponse.ok) {
      return null
    }

    const chatData = await chatResponse.json()
    if (!chatData.ok) {
      return null
    }

    // Получаем последние сообщения из канала
    // Для этого нужен chat_id канала (обычно начинается с -100)
    const channelId = chatData.result.id
    
    // Используем getUpdates или forwardMessage для получения постов
    // Но для каналов это сложнее, поэтому используем RSS как fallback
    return null
  } catch (error) {
    console.error('Error fetching Telegram posts from Bot API:', error)
    return null
  }
}

export async function GET() {
  try {
    const channelUsername = process.env.TELEGRAM_CHANNEL_USERNAME || DEFAULT_CHANNEL_USERNAME

    // Пытаемся получить через Bot API, если доступен
    let posts: any[] | null = await getTelegramPostsFromBotAPI(channelUsername)
    
    // Если Bot API не работает, используем RSS парсинг
    if (posts === null) {
      posts = await getTelegramPostsFromRSS(channelUsername)
    } else if (posts.length === 0) {
      posts = await getTelegramPostsFromRSS(channelUsername)
    }

    if (posts === null || posts.length === 0) {
      console.warn('Telegram API: No posts found')
      return NextResponse.json({ posts: [] })
    }

    // Форматируем посты
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      text: post.text,
      thumbnail: post.thumbnail,
      publishedAt: post.publishedAt,
      url: post.url,
      hasMedia: post.hasMedia,
      mediaType: post.mediaType,
      mediaUrl: post.mediaUrl, // Прямая ссылка на медиа файл
      views: post.views,
      author: post.author,
    }))

    return NextResponse.json({ posts: formattedPosts })
  } catch (error) {
    console.error('Telegram API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Telegram posts', posts: [] },
      { status: 200 }
    )
  }
}

