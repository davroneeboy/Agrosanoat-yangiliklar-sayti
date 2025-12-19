'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

export default function ContactsPage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: 'Kontaktlar',
          ru: 'Контакты',
          en: 'Contacts'
        }}
        backgroundImage="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=600&fit=crop"
      />

      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-800">
              {currentLang === 'uz' && 'Bosh sahifa'}
              {currentLang === 'ru' && 'Главная'}
              {currentLang === 'en' && 'Home'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">
              {currentLang === 'uz' && 'Kontaktlar'}
              {currentLang === 'ru' && 'Контакты'}
              {currentLang === 'en' && 'Contacts'}
            </span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentLang === 'uz' && 'Aloqa ma\'lumotlari'}
                  {currentLang === 'ru' && 'Контактная информация'}
                  {currentLang === 'en' && 'Contact Information'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {currentLang === 'uz' && 'Manzil'}
                        {currentLang === 'ru' && 'Адрес'}
                        {currentLang === 'en' && 'Address'}
                      </p>
                      <p className="text-gray-600">
                        {currentLang === 'uz' && 'Toshkent shahri, Mirzo-Ulug\'bek tumani, Sodiq Azimov ko\'chasi, 42-uy'}
                        {currentLang === 'ru' && 'г. Ташкент, Мирзо-Улугбекский район, улица Содика Азимова, дом 42'}
                        {currentLang === 'en' && 'Tashkent, Mirzo-Ulugbek district, Sodiq Azimov street, house 42'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {currentLang === 'uz' && 'Telefon'}
                        {currentLang === 'ru' && 'Телефон'}
                        {currentLang === 'en' && 'Phone'}
                      </p>
                      <a href="tel:+998954505950" className="text-primary-600 hover:text-primary-800">+998 (95) 450-59-50</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:info@agrodev.uz" className="text-primary-600 hover:text-primary-800">info@agrodev.uz</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentLang === 'uz' && 'Ish vaqti'}
                  {currentLang === 'ru' && 'Время работы'}
                  {currentLang === 'en' && 'Working Hours'}
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {currentLang === 'uz' && 'Dushanba - Juma'}
                      {currentLang === 'ru' && 'Понедельник - Пятница'}
                      {currentLang === 'en' && 'Monday - Friday'}
                    </p>
                    <p className="text-gray-600">09:00 - 18:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {currentLang === 'uz' && 'Shanba - Yakshanba'}
                      {currentLang === 'ru' && 'Суббота - Воскресенье'}
                      {currentLang === 'en' && 'Saturday - Sunday'}
                    </p>
                    <p className="text-gray-600">
                      {currentLang === 'uz' && 'Yopiq'}
                      {currentLang === 'ru' && 'Выходной'}
                      {currentLang === 'en' && 'Closed'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Яндекс карта */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Bizning manzilimiz'}
                {currentLang === 'ru' && 'Наше местоположение'}
                {currentLang === 'en' && 'Our Location'}
              </h2>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <iframe
                  src="https://yandex.com/map-widget/v1/?ll=69.291515%2C41.311184&z=16&pt=69.291515%2C41.311184&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0 }}
                  title="Yandex Map"
                />
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                {currentLang === 'uz' && 'Toshkent shahri, Mirzo-Ulug\'bek tumani, Sodiq Azimov ko\'chasi, 42-uy'}
                {currentLang === 'ru' && 'г. Ташкент, Мирзо-Улугбекский район, улица Содика Азимова, дом 42'}
                {currentLang === 'en' && 'Tashkent, Mirzo-Ulugbek district, Sodiq Azimov street, house 42'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

