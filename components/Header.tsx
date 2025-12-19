'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Language, getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import { addLangToUrl } from '@/lib/urlUtils'
import Image from 'next/image'
import ImageSlider from './ImageSlider'

type DropdownItem = {
  label: string
  href: string
  external?: boolean
}

type MenuItem = {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

const Header = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { currentLang, setCurrentLang } = useLanguage()
  const isHomePage = pathname === '/'
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const t = getTranslation(currentLang)

  // Навигация на основе существующих страниц
  const menuItems: MenuItem[] = [
    {
      label: currentLang === 'uz' ? 'AGENTLIK HAQIDA' : currentLang === 'ru' ? 'О АГЕНТСТВЕ' : 'ABOUT AGENCY',
      href: '/about',
      dropdown: [
        { label: currentLang === 'uz' ? 'Agentlik haqida' : currentLang === 'ru' ? 'Об агентстве' : 'About', href: '/about' },
        { label: currentLang === 'uz' ? 'Tashkilot tuzilmasi' : currentLang === 'ru' ? 'Структура организации' : 'Organizational Structure', href: '/about/structure' },
        { label: currentLang === 'uz' ? 'Rahbariyat' : currentLang === 'ru' ? 'Руководство' : 'Management', href: '/about/management' },
        { label: currentLang === 'uz' ? 'Markaziy apparat' : currentLang === 'ru' ? 'Центральный аппарат' : 'Central Office', href: '/about/central' },
        { label: currentLang === 'uz' ? 'Hududiy boshqarmalar' : currentLang === 'ru' ? 'Территориальные управления' : 'Territorial Departments', href: '/about/territorial' },
      ],
    },
    {
      label: currentLang === 'uz' ? 'RAQAMLI HUKUMAT' : currentLang === 'ru' ? 'ЦИФРОВОЕ ПРАВИТЕЛЬСТВО' : 'DIGITAL GOVERNMENT',
      href: '/digital-gov',
      dropdown: [
        { label: currentLang === 'uz' ? 'Raqamli hukumat' : currentLang === 'ru' ? 'Цифровое правительство' : 'Digital Government', href: '/digital-gov' },
        { label: currentLang === 'uz' ? 'Vakansiyalar' : currentLang === 'ru' ? 'Вакансии' : 'Vacancies', href: 'https://vacancy.gov.uz/', external: true },
        { label: currentLang === 'uz' ? 'Korrupsiyaga qarshi kurashish bo\'yicha murojaat' : currentLang === 'ru' ? 'Обращение по противодействию коррупции' : 'Anti-Corruption Appeal', href: '/anti-corruption' },
      ],
    },
    {
      label: currentLang === 'uz' ? 'AXBOROT XIZMATI' : currentLang === 'ru' ? 'ИНФОРМАЦИОННЫЙ СЕРВИС' : 'INFORMATION SERVICE',
      href: '/info-service',
      dropdown: [
        { label: currentLang === 'uz' ? 'Axborot xizmati' : currentLang === 'ru' ? 'Информационный сервис' : 'Information Service', href: '/info-service' },
        { label: currentLang === 'uz' ? 'Press-relizlar' : currentLang === 'ru' ? 'Пресс-релизы' : 'Press Releases', href: '/press-releases' },
        { label: currentLang === 'uz' ? 'Matbuot anjumanlari' : currentLang === 'ru' ? 'Пресс-конференции' : 'Press Conferences', href: '/press-conferences' },
        { label: currentLang === 'uz' ? 'Majlislar' : currentLang === 'ru' ? 'Заседания' : 'Meetings', href: '/meetings' },
        { label: currentLang === 'uz' ? 'Voqealar taqvimi' : currentLang === 'ru' ? 'Календарь событий' : 'Event Calendar', href: '/events' },
        { label: currentLang === 'uz' ? 'Rahbariyatning bayonotlari va nutqlari' : currentLang === 'ru' ? 'Заявления и выступления руководства' : 'Management Statements and Speeches', href: '/statements' },
        { label: currentLang === 'uz' ? 'Yangiliklar' : currentLang === 'ru' ? 'Новости' : 'News', href: '/news' },
      ],
    },
    {
      label: currentLang === 'uz' ? 'BOG\'LANISH' : currentLang === 'ru' ? 'СВЯЗЬ' : 'CONTACT',
      href: '/contacts',
      dropdown: [
        { label: currentLang === 'uz' ? 'Kontaktlar' : currentLang === 'ru' ? 'Контакты' : 'Contacts', href: '/contacts' },
        { label: currentLang === 'uz' ? 'So\'rovnomalar' : currentLang === 'ru' ? 'Опросы' : 'Surveys', href: '/surveys' },
        { label: currentLang === 'uz' ? 'Qayta aloqa' : currentLang === 'ru' ? 'Обратная связь' : 'Feedback', href: '/feedback' },
        { label: currentLang === 'uz' ? 'Korrupsiyani oldini olish bo\'yicha murojaat' : currentLang === 'ru' ? 'Обращение по предупреждению коррупции' : 'Anti-Corruption Prevention Appeal', href: '/anti-corruption-prevention' },
      ],
    },
  ]

  const languages: Language[] = ['uz', 'ru', 'en']
  const languageLabels: { [key in Language]: string } = {
    uz: 'UZ',
    ru: 'RU',
    en: 'EN',
  }

  const socialLinks = [
    {
      name: 'Telegram',
      href: 'https://t.me/agrosanoat_uz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/agrosanoat_uz/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@Agrosanoat_uz/videos',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C6.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/uz.agrosanoat/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  const handleMouseEnter = (itemLabel: string) => {
    if (menuItems.find((item) => item.label === itemLabel)?.dropdown) {
      setActiveDropdown(itemLabel)
    }
  }

  const handleMouseLeave = (itemLabel: string) => {
    setActiveDropdown(null)
  }

  const handleClick = (itemLabel: string) => {
    const item = menuItems.find((item) => item.label === itemLabel)
    if (item?.dropdown) {
      setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel)
    } else {
      setActiveDropdown(null)
      setIsMobileMenuOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, itemLabel: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(itemLabel)
    } else if (e.key === 'Escape') {
      setActiveDropdown(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown]
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  const renderMenuItem = (item: MenuItem) => {
  return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={() => handleMouseLeave(item.label)}
              >
        {item.dropdown ? (
                <button
            className={`px-3 py-2 rounded transition-colors text-sm font-semibold uppercase whitespace-nowrap ${
                    activeDropdown === item.label
                      ? 'bg-primary-700 text-white'
                : isHomePage
                ? 'text-white hover:bg-white/20 drop-shadow-md'
                : 'text-gray-800 hover:bg-primary-100'
                  }`}
                  onClick={() => handleClick(item.label)}
                  onKeyDown={(e) => handleKeyDown(e, item.label)}
                  aria-label={item.label}
                  aria-expanded={activeDropdown === item.label}
                  tabIndex={0}
                >
                  {item.label}
                    <span className="ml-1 inline-block">▾</span>
                </button>
        ) : (
          <Link
            href={addLangToUrl(item.href, currentLang)}
            className={`px-3 py-2 rounded transition-colors text-sm font-semibold uppercase whitespace-nowrap ${
              isHomePage
                ? 'text-white hover:bg-white/20 drop-shadow-md'
                : 'text-gray-800 hover:bg-primary-100'
            }`}
            onClick={() => {
              setActiveDropdown(null)
              setIsMobileMenuOpen(false)
            }}
          >
            {item.label}
          </Link>
        )}

                {item.dropdown && activeDropdown === item.label && (
                  <div
            ref={(el) => {
              dropdownRefs.current[item.label] = el
            }}
            className="absolute top-full left-0 pt-1 w-56 z-50"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={() => handleMouseLeave(item.label)}
          >
            <div className="bg-primary-700 rounded-lg shadow-xl py-2">
                    {item.dropdown.map((dropdownItem) => (
                dropdownItem.external ? (
                  <a
                    key={dropdownItem.label}
                    href={dropdownItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-white hover:bg-primary-600 transition-colors text-sm"
                    onClick={() => {
                      setActiveDropdown(null)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {dropdownItem.label}
                  </a>
                ) : (
                      <Link
                        key={dropdownItem.label}
                        href={addLangToUrl(dropdownItem.href, currentLang)}
                    className="block px-4 py-2 text-white hover:bg-primary-600 transition-colors text-sm"
                        onClick={() => {
                          setActiveDropdown(null)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        {dropdownItem.label}
                      </Link>
                )
                    ))}
                  </div>
                  </div>
                )}
      </div>
    )
  }

  return (
    <header className={`${isHomePage ? 'bg-transparent' : 'bg-white shadow-md'} sticky top-0 z-50`}>
      <div className={`${isHomePage ? 'absolute top-0 left-0 right-0 z-50' : ''}`}>
        <div className="container mx-auto px-4">
          {/* Top Section: Logo, Title, Phone, Social, Languages */}
          <div className={`flex flex-col py-3 ${isHomePage ? 'border-b border-white/20' : 'border-b border-gray-200 bg-white/95 backdrop-blur-sm'}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo and Title */}
            <Link href={addLangToUrl('/', currentLang)} className="flex items-center flex-1 min-w-0 hover:opacity-80 transition-opacity">
              <Image
                src="/icon.png"
                alt="Герб Узбекистана"
                width={52}
                height={52}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 object-contain"
                priority
              />
              <div className="ml-3 flex-1 min-w-0">
                <h1 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase leading-tight ${isHomePage ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                  {currentLang === 'uz' && (
                    <>
                      <span className="block">QISHLOQ XO'JALIGI VAZIRLIGI HUZURIDAGI</span>
                      <span className="block">AGROSANOATNI RIVOJLANTIRISH AGENTLIGI</span>
                    </>
                  )}
                  {currentLang === 'ru' && (
                    <>
                      <span className="block">АГЕНТСТВО ПО РАЗВИТИЮ АГРОПРОМЫШЛЕННОСТИ</span>
                      <span className="block">ПРИ МИНИСТЕРСТВЕ СЕЛЬСКОГО ХОЗЯЙСТВА</span>
                    </>
                  )}
                  {currentLang === 'en' && (
                    <>
                      <span className="block">AGENCY FOR THE DEVELOPMENT OF AGRO-INDUSTRY</span>
                      <span className="block">UNDER THE MINISTRY OF AGRICULTURE</span>
                    </>
                  )}
                </h1>
              </div>
            </Link>

            {/* Right Section: Phone, Social, Languages */}
            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
              {/* Trust Phone */}
              <div className="flex items-center space-x-2 text-sm">
                <span className={`font-medium ${isHomePage ? 'text-white/90 drop-shadow-md' : 'text-gray-700'}`}>
                  {currentLang === 'uz' && 'Ishonch telefoni:'}
                  {currentLang === 'ru' && 'Телефон доверия:'}
                  {currentLang === 'en' && 'Trust phone:'}
                </span>
                <a href="tel:+998954505950" className={`font-bold hover:opacity-80 transition-opacity ${isHomePage ? 'text-white drop-shadow-md' : 'text-primary-700 hover:text-primary-800'}`}>
                  +99895 450-59-50
                </a>
              </div>

              {/* Social Media and Languages */}
              <div className="flex items-center space-x-4">
                {/* Social Media Icons */}
                <div className="flex items-center space-x-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`hover:opacity-80 transition-opacity ${isHomePage ? 'text-white drop-shadow-md' : 'text-gray-700 hover:text-primary-600'}`}
                      aria-label={social.name}
                      tabIndex={0}
                    >
                      {social.icon}
                    </a>
            ))}
                </div>

          {/* Language Switcher */}
                <div className={`flex items-center space-x-1 pl-4 ${isHomePage ? 'border-l border-white/30' : 'border-l border-gray-300'}`}>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                      className={`px-2 py-1 rounded transition-colors text-xs sm:text-sm font-medium ${
                  currentLang === lang
                    ? 'bg-primary-600 text-white'
                          : isHomePage
                          ? 'text-white/90 hover:bg-white/20'
                    : 'text-gray-700 hover:bg-primary-100'
                }`}
                aria-label={`Switch to ${lang.toUpperCase()}`}
                tabIndex={0}
              >
                {languageLabels[lang]}
              </button>
            ))}
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <nav className={`flex items-center justify-center space-x-1 py-3 flex-wrap ${isHomePage ? 'bg-white/10 backdrop-blur-sm rounded-lg px-2' : ''}`}>
              {menuItems.map(renderMenuItem)}
            </nav>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <button
          className={`lg:hidden w-full py-3 flex items-center justify-between ${isHomePage ? 'text-white border-t border-white/20 bg-black/30' : 'text-gray-700 border-t border-gray-200 bg-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            tabIndex={0}
          >
          <span className="font-semibold uppercase">
            {currentLang === 'uz' && 'MENYU'}
            {currentLang === 'ru' && 'МЕНЮ'}
            {currentLang === 'en' && 'MENU'}
          </span>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t max-h-[calc(100vh-200px)] overflow-y-auto ${isHomePage ? 'bg-black/40 backdrop-blur-sm' : 'bg-white'}`}>
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                  <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between font-semibold uppercase ${
                        isHomePage
                          ? 'text-white hover:bg-white/20'
                          : 'text-gray-700 hover:bg-primary-100'
                      }`}
                    onClick={() => handleClick(item.label)}
                    onKeyDown={(e) => handleKeyDown(e, item.label)}
                    aria-label={item.label}
                    aria-expanded={activeDropdown === item.label}
                    tabIndex={0}
                  >
                    <span>{item.label}</span>
                      <span className={isHomePage ? 'text-white' : 'text-primary-600'}>▾</span>
                  </button>
                  ) : (
                    <Link
                      href={addLangToUrl(item.href, currentLang)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-semibold uppercase ${
                        isHomePage
                          ? 'text-white hover:bg-white/20'
                          : 'text-gray-700 hover:bg-primary-100'
                      }`}
                      onClick={() => {
                        setActiveDropdown(null)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className={`mt-1 ml-4 rounded-lg py-2 ${isHomePage ? 'bg-white/20' : 'bg-primary-50'}`}>
                      {item.dropdown.map((dropdownItem) => (
                        dropdownItem.external ? (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-4 py-2 rounded transition-colors ${
                              isHomePage
                                ? 'text-white hover:bg-white/20'
                                : 'text-gray-700 hover:bg-primary-100'
                            }`}
                            onClick={() => {
                              setActiveDropdown(null)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            {dropdownItem.label}
                          </a>
                        ) : (
                        <Link
                          key={dropdownItem.label}
                          href={addLangToUrl(dropdownItem.href, currentLang)}
                            className={`block px-4 py-2 rounded transition-colors ${
                              isHomePage
                                ? 'text-white hover:bg-white/20'
                                : 'text-gray-700 hover:bg-primary-100'
                            }`}
                          onClick={() => {
                            setActiveDropdown(null)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {dropdownItem.label}
                        </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
      
      {/* Баннер (слайдер) - только на главной странице */}
      {isHomePage && (
        <div className="relative -mt-1">
          <ImageSlider currentLang={currentLang} />
        </div>
      )}
    </header>
  )
}

export default Header
