'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'
import Image from 'next/image'

export default function ManagementPage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  const managementData = {
    uz: [
      {
        name: 'ABDULLAYEV NURALI YUSUFALIYEVICH',
        position: 'O\'zbekiston Respublikasi Qishloq xo\'jaligi vazirligi huzuridagi Agrosanoatni rivojlantirish agentligi direktori',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/',
        photo: '/director.jpg',
      },
      {
        name: 'ERSUNGUR OZCAN',
        position: 'Direktor maslahatchisi',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/2.jpg',
        workingHours: 'Dushanba 10:00 dan 13:00 gacha',
      },
      {
        name: 'Yo\'ldoshev Mansur Murod o\'g\'li',
        position: 'Direktor maslahatchisi',
        bio: 'Biografiya',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/oz/agrosanoat',
        photo: '/4.png',
        workingHours: 'Juma 14:00 - 16:00',
      },
      {
        name: 'BOLTABOYEVA O\'G\'ILXON NABIJANOVNA',
        position: 'Agrosanoatni rivojlantirish agentligi Media bo\'limi boshlig\'i — Axborot xizmati boshlig\'i, direktor matbuot kotibi hamda axborot siyosati masalalari bo\'yicha maslahatchisi',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/3.png',
        workingHours: 'Dushanba 8:00 - 17:00',
      },
    ],
    ru: [
      {
        name: 'ABDULLAYEV NURALI YUSUFALIYEVICH',
        position: 'Директор Агентства по развитию агропромышленности при Министерстве сельского хозяйства Республики Узбекистан',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/',
        photo: '/director.jpg',
      },
      {
        name: 'ERSUNGUR OZCAN',
        position: 'Советник директора',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/2.jpg',
        workingHours: 'Понедельник с 10:00 до 13:00',
      },
      {
        name: 'Yo\'ldoshev Mansur Murod o\'g\'li',
        position: 'Советник директора',
        bio: 'Биография',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/oz/agrosanoat',
        photo: '/4.png',
        workingHours: 'Пятница 14:00 - 16:00',
      },
      {
        name: 'BOLTABOYEVA O\'G\'ILXON NABIJANOVNA',
        position: 'Начальник отдела медиа Агентства по развитию агропромышленности — Начальник информационной службы, пресс-секретарь директора и советник по вопросам информационной политики',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/3.png',
        workingHours: 'Понедельник 8:00 - 17:00',
      },
    ],
    en: [
      {
        name: 'ABDULLAYEV NURALI YUSUFALIYEVICH',
        position: 'Director of the Agency for the Development of Agro-Industry under the Ministry of Agriculture of the Republic of Uzbekistan',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/',
        photo: '/director.jpg',
      },
      {
        name: 'ERSUNGUR OZCAN',
        position: 'Director\'s Advisor',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/2.jpg',
        workingHours: 'Monday 10:00 to 13:00',
      },
      {
        name: 'Yo\'ldoshev Mansur Murod o\'g\'li',
        position: 'Director\'s Advisor',
        bio: 'Biography',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/oz/agrosanoat',
        photo: '/4.png',
        workingHours: 'Friday 14:00 - 16:00',
      },
      {
        name: 'BOLTABOYEVA O\'G\'ILXON NABIJANOVNA',
        position: 'Head of Media Department of the Agency for the Development of Agro-Industry — Head of Information Service, Director\'s Press Secretary and Advisor on Information Policy Issues',
        bio: '',
        email: 'garden@agro.uz',
        phone: '+998 (95) 450-59-50',
        website: 'https://gov.uz/uz/agrosanoat',
        photo: '/3.png',
        workingHours: 'Monday 8:00 - 17:00',
      },
    ],
  }

  const managers = managementData[currentLang]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <PageHeader
        currentLang={currentLang}
        title={t.about.management.title}
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=600&fit=crop"
      />

      {/* Breadcrumbs */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-800">
              {currentLang === 'uz' && 'Bosh sahifa'}
              {currentLang === 'ru' && 'Главная'}
              {currentLang === 'en' && 'Home'}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/about" className="text-primary-600 hover:text-primary-800">
              {t.about.title}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{t.about.management.title}</span>
          </nav>
        </div>
      </section>

      {/* Management Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {managers.map((manager, index) => {
                const [imageError, setImageError] = useState(false)
                
                return (
                <div
                  key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl animate-fade-in flex flex-col md:flex-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {/* Фотография слева */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-full md:w-64 flex-shrink-0 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
                      {manager.photo && !imageError ? (
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <img
                            src={manager.photo}
                            alt={manager.name}
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            onError={() => setImageError(true)}
                          />
                        </div>
                      ) : (
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-20 h-20 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                      )}
                  </div>
                    
                    {/* Информация справа */}
                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{manager.name}</h3>
                      <p className="text-primary-600 font-semibold mb-4 text-base leading-relaxed">{manager.position}</p>
                      {manager.bio && (
                    <p className="text-gray-700 mb-6">{manager.bio}</p>
                      )}
                      <div className="space-y-3">
                        {manager.email && (
                      <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                            <a href={`mailto:${manager.email}`} className="text-sm hover:text-primary-600 transition-colors break-all">
                              {manager.email}
                            </a>
                      </div>
                        )}
                        {manager.phone && (
                      <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                            <a href={`tel:${manager.phone.replace(/\s/g, '').replace(/[()]/g, '')}`} className="text-sm hover:text-primary-600 transition-colors">
                              {manager.phone}
                            </a>
                          </div>
                        )}
                        {manager.website && (
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <a 
                              href={manager.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm hover:text-primary-600 transition-colors break-all"
                            >
                              {manager.website}
                            </a>
                          </div>
                        )}
                        {manager.workingHours && (
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{manager.workingHours}</span>
                      </div>
                        )}
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}


