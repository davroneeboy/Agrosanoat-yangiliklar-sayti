'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Language } from './i18n'

export function useLanguage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Синхронно читаем язык из URL для одинакового начального состояния на сервере и клиенте
  const initialLang = useMemo(() => {
    const langParam = searchParams.get('lang') as Language | null
    if (langParam && ['uz', 'ru', 'en'].includes(langParam)) {
      return langParam
    }
    // На сервере localStorage недоступен, поэтому всегда возвращаем 'uz'
    if (typeof window === 'undefined') {
      return 'uz'
    }
    // На клиенте проверяем localStorage
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
      return savedLang
    }
    return 'uz'
  }, [searchParams])
  
  const [currentLang, setCurrentLangState] = useState<Language>(initialLang)
  const [isInitialized, setIsInitialized] = useState(false)

  const updateUrl = useCallback((lang: Language) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pathname, searchParams, router])

  // Синхронизируем состояние с URL и localStorage после монтирования
  useEffect(() => {
    if (isInitialized) return

    const langParam = searchParams.get('lang') as Language | null
    if (langParam && ['uz', 'ru', 'en'].includes(langParam)) {
      if (langParam !== currentLang) {
        setCurrentLangState(langParam)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', langParam)
      }
      setIsInitialized(true)
    } else {
      // Если языка нет в URL, проверяем localStorage
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('language') as Language | null
        if (savedLang && ['uz', 'ru', 'en'].includes(savedLang) && savedLang !== currentLang) {
          setCurrentLangState(savedLang)
          updateUrl(savedLang)
        } else {
          // Если нет сохраненного языка, устанавливаем 'uz' по умолчанию и добавляем в URL
          if (currentLang !== 'uz') {
            setCurrentLangState('uz')
          }
          updateUrl('uz')
        }
      }
      setIsInitialized(true)
    }
  }, [searchParams, isInitialized, currentLang, updateUrl])

  // Обновляем язык при изменении параметра в URL
  useEffect(() => {
    if (!isInitialized) return
    
    const langParam = searchParams.get('lang') as Language | null
    if (langParam && ['uz', 'ru', 'en'].includes(langParam) && langParam !== currentLang) {
      setCurrentLangState(langParam)
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', langParam)
      }
    }
  }, [searchParams, isInitialized, currentLang])

  const setCurrentLang = useCallback((lang: Language) => {
    setCurrentLangState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
    updateUrl(lang)
  }, [updateUrl])

  return { currentLang, setCurrentLang }
}

