import { Language } from './i18n'

/**
 * Добавляет параметр языка к URL
 */
export function addLangToUrl(url: string, lang: Language): string {
  // Если это внешняя ссылка, возвращаем как есть
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Если URL уже содержит параметры
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}lang=${lang}`
}

/**
 * Получает язык из URL параметров
 */
export function getLangFromUrl(searchParams: URLSearchParams): Language | null {
  const lang = searchParams.get('lang')
  if (lang && ['uz', 'ru', 'en'].includes(lang)) {
    return lang as Language
  }
  return null
}

