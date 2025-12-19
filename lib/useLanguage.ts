'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Language } from './i18n'

export function useLanguage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentLang, setCurrentLangState] = useState<Language>('ru')
  const [isInitialized, setIsInitialized] = useState(false)

  const updateUrl = useCallback((lang: Language) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pathname, searchParams, router])

  // Читаем язык из URL при загрузке
  useEffect(() => {
    if (isInitialized) return

    const langParam = searchParams.get('lang') as Language | null
    if (langParam && ['uz', 'ru', 'en'].includes(langParam)) {
      setCurrentLangState(langParam)
      localStorage.setItem('language', langParam)
      setIsInitialized(true)
    } else {
      // Если языка нет в URL, проверяем localStorage
      const savedLang = localStorage.getItem('language') as Language | null
      if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
        setCurrentLangState(savedLang)
        // Обновляем URL только если мы на клиенте
        if (typeof window !== 'undefined') {
          updateUrl(savedLang)
        }
      } else {
        // По умолчанию русский
        setCurrentLangState('ru')
        // Обновляем URL только если мы на клиенте
        if (typeof window !== 'undefined') {
          updateUrl('ru')
        }
      }
      setIsInitialized(true)
    }
  }, [searchParams, isInitialized, updateUrl])

  // Обновляем язык при изменении параметра в URL
  useEffect(() => {
    if (!isInitialized) return
    
    const langParam = searchParams.get('lang') as Language | null
    if (langParam && ['uz', 'ru', 'en'].includes(langParam) && langParam !== currentLang) {
      setCurrentLangState(langParam)
      localStorage.setItem('language', langParam)
    }
  }, [searchParams, isInitialized, currentLang])

  const setCurrentLang = useCallback((lang: Language) => {
    setCurrentLangState(lang)
    localStorage.setItem('language', lang)
    updateUrl(lang)
  }, [updateUrl])

  return { currentLang, setCurrentLang }
}

