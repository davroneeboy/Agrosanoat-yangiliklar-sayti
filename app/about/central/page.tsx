'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

export default function CentralPage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  const departmentsData = {
    uz: [
      { name: 'Direktor yordamchisi' },
      { name: 'Sanoatlashgan intensiv bog\' va uzumzorlarni rivojlantirish boshqarmasi' },
      { name: 'Qayta ishlash va qo\'shilgan qiymatni rivojlantirish bo\'limi' },
      { name: 'Loyihalarni texnik-iqtisodiy asoslash boshqarmasi' },
      { name: 'Inson resurslarini rivojlantirish va boshqarish bo\'limi' },
      { name: 'Ko\'chatchilik xo\'jaliklarini muvofiqlashtirish va himoyasi bo\'limi' },
      { name: 'Suv tejavchi texnologiyalarni rivojlanitirish bo\'limi' },
      { name: 'Marketing va eksport bo\'limi' },
      { name: 'Moliyalashtirish, buxgalteriya hisobi va rejalashtirish bo\'limi' },
      { name: 'Moliyaviy qo\'llab-quvvatlash bo\'limi' },
      { name: 'Bo\'g\' va uzumzor, issiqxona yerlaridan foydalanishni tashkil etish, yer axborot bazasini yuritish va tuproq unumdorligini aniqlash bo\'limi' },
      { name: 'Investitsiyalar va xalqaro aloqalar bo\'limi' },
      { name: 'Devonxona va murojaatlar bilan ishlash bo\'yicha bo\'limi' },
      { name: 'Axborot-tahlil va strategik rivojlanish va metodologiya bo\'limi' },
      { name: 'AKT va raqamlashtirish bo\'limi' },
      { name: 'Korrupsiyaga qarshi kurashish bo\'limi' },
      { name: 'Ichki audit bo\'limi' },
      { name: 'Ijro nazorati bo\'limi' },
      { name: 'Yuridik ta\'minlash bo\'limi' },
      { name: 'Agrologistika va sovutkichli omborlarni rivojlantirish bo\'yicha bo\'limi' },
      { name: 'Texnologiya va standartlashtirish bo\'limi' },
      { name: 'Issiqxona xo\'jaliklarini rivojlantirish bo\'limi' },
      { name: 'Jamg\'arma faoliyatini muvofiqlashtirish bo\'limi' },
    ],
    ru: [
      { name: 'Помощник директора' },
      { name: 'Управление по развитию промышленных интенсивных садов и виноградников' },
      { name: 'Отдел переработки и развития добавленной стоимости' },
      { name: 'Управление технико-экономического обоснования проектов' },
      { name: 'Отдел развития и управления человеческими ресурсами' },
      { name: 'Отдел координации и защиты питомниковых хозяйств' },
      { name: 'Отдел развития водосберегающих технологий' },
      { name: 'Отдел маркетинга и экспорта' },
      { name: 'Отдел финансирования, бухгалтерского учета и планирования' },
      { name: 'Отдел финансовой поддержки' },
      { name: 'Отдел организации использования земель садов, виноградников, теплиц, ведения земельной информационной базы и определения плодородия почвы' },
      { name: 'Отдел инвестиций и международных связей' },
      { name: 'Отдел делопроизводства и работы с обращениями' },
      { name: 'Отдел информационного анализа, стратегического развития и методологии' },
      { name: 'Отдел ИКТ и цифровизации' },
      { name: 'Отдел борьбы с коррупцией' },
      { name: 'Отдел внутреннего аудита' },
      { name: 'Отдел исполнительного контроля' },
      { name: 'Отдел правового обеспечения' },
      { name: 'Отдел развития агрологистики и холодильных складов' },
      { name: 'Отдел технологий и стандартизации' },
      { name: 'Отдел развития тепличных хозяйств' },
      { name: 'Отдел координации деятельности фонда' },
    ],
    en: [
      { name: 'Director\'s Assistant' },
      { name: 'Department for the Development of Industrial Intensive Gardens and Vineyards' },
      { name: 'Department for Processing and Value-Added Development' },
      { name: 'Department for Technical and Economic Justification of Projects' },
      { name: 'Department for Human Resources Development and Management' },
      { name: 'Department for Coordination and Protection of Nursery Farms' },
      { name: 'Department for the Development of Water-Saving Technologies' },
      { name: 'Marketing and Export Department' },
      { name: 'Department of Financing, Accounting, and Planning' },
      { name: 'Financial Support Department' },
      { name: 'Department for Organizing the Use of Garden, Vineyard, Greenhouse Lands, Maintaining Land Information Base, and Determining Soil Fertility' },
      { name: 'Investments and International Relations Department' },
      { name: 'Department for Office Management and Handling Appeals' },
      { name: 'Department of Information Analysis, Strategic Development, and Methodology' },
      { name: 'ICT and Digitalization Department' },
      { name: 'Anti-Corruption Department' },
      { name: 'Internal Audit Department' },
      { name: 'Executive Control Department' },
      { name: 'Legal Support Department' },
      { name: 'Department for Agrologistics and Cold Storage Development' },
      { name: 'Technology and Standardization Department' },
      { name: 'Department for the Development of Greenhouse Farms' },
      { name: 'Department for Coordination of Fund Activities' },
    ],
  }

  const departments = departmentsData[currentLang]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <PageHeader
        currentLang={currentLang}
        title={t.about.central.title}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop"
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
            <span className="text-gray-600">{t.about.central.title}</span>
          </nav>
        </div>
      </section>

      {/* Central Office Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Markaziy apparat bo\'limlari'}
                {currentLang === 'ru' && 'Отделы центрального аппарата'}
                {currentLang === 'en' && 'Central Office Departments'}
              </h2>
              <div className="space-y-3">
              {departments.map((dept, index) => (
                <div
                  key={index}
                    className="flex items-start p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-primary-600 font-semibold mr-4 min-w-[30px]">{index + 1}.</span>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 flex-1">{dept.name}</h3>
                </div>
              ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Aloqa ma\'lumotlari'}
                {currentLang === 'ru' && 'Контактная информация'}
                {currentLang === 'en' && 'Contact Information'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentLang === 'uz' && 'Manzil'}
                    {currentLang === 'ru' && 'Адрес'}
                    {currentLang === 'en' && 'Address'}
                  </h3>
                  <p className="text-gray-700">
                    {currentLang === 'uz' && 'Toshkent shahri, Yunusobod tumani'}
                    {currentLang === 'ru' && 'г. Ташкент, Юнусабадский район'}
                    {currentLang === 'en' && 'Tashkent city, Yunusabad district'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentLang === 'uz' && 'Telefon'}
                    {currentLang === 'ru' && 'Телефон'}
                    {currentLang === 'en' && 'Phone'}
                  </h3>
                  <p className="text-gray-700">+998 71 123 45 67</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentLang === 'uz' && 'Email'}
                    {currentLang === 'ru' && 'Email'}
                    {currentLang === 'en' && 'Email'}
                  </h3>
                  <p className="text-gray-700">info@agro.uz</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentLang === 'uz' && 'Ish vaqti'}
                    {currentLang === 'ru' && 'Режим работы'}
                    {currentLang === 'en' && 'Working Hours'}
                  </h3>
                  <p className="text-gray-700">
                    {currentLang === 'uz' && 'Dushanba - Juma: 9:00 - 18:00'}
                    {currentLang === 'ru' && 'Понедельник - Пятница: 9:00 - 18:00'}
                    {currentLang === 'en' && 'Monday - Friday: 9:00 - 18:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}


