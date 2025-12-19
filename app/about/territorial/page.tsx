'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

export default function TerritorialPage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  const regionsData = {
    uz: [
      { 
        name: 'Qoraqalpog\'iston Respublikasi bo\'limi', 
        city: 'Nukus', 
        phone: '+998 61 123 45 67',
        manager: {
          name: 'ACHILOV XALDAR TAJIMURATOVICH',
          position: 'Qoraqalpogʻiston Respublikasi boʻlim boshligʻi',
          photo: '/viloyat/ACHILOV XALDAR TAJIMURATOVICH.jpg',
        }
      },
      { 
        name: 'Andijon viloyati bo\'limi', 
        city: 'Andijon', 
        phone: '+99874 223 16 09',
        email: 'garden@agro.uz',
        workingHours: 'Har oyning uchinchi Dushanba 10:00-12:30',
        manager: {
          name: 'EGAMOV AVAZBEK RAXIMBERDIEVICH',
          position: 'Andijon viloyat bo\'lim boshlig\'i',
          photo: '/viloyat/EGAMOV AVAZBEK RAXIMBERDIEVICH.jpg',
        }
      },
      { 
        name: 'Buxoro viloyati bo\'limi', 
        city: 'Buxoro', 
        phone: '+998 65 123 45 67',
        manager: {
          name: 'ATOEV AKMAL ASXATOVICH',
          position: 'Buxoro viloyat boʻlim boshligʻi',
          photo: '/viloyat/ATOEV AKMAL ASXATOVICH.jpg',
        }
      },
      { 
        name: 'Jizzax viloyati bo\'limi', 
        city: 'Jizzax', 
        phone: '+998972 226 40 15',
        email: 'garden@agro.uz',
        workingHours: 'Har oyning uchinchi Dushanba 10:00-12:30',
        manager: {
          name: 'SALOHIDDINOV MAXMUR SALOHIDDINOVICH',
          position: 'Jizzax viloyat bo\'lim boshlig\'i',
          photo: '/viloyat/SALOHIDDINOV MAXMUR SALOHIDDINOVICH.jpg',
        }
      },
      { 
        name: 'Qashqadaryo viloyati bo\'limi', 
        city: 'Qarshi', 
        phone: '+998975 221 06 61',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'UMAROV MUXAMMAD MAXMUDOVICH',
          position: 'Qashqadaryo viloyati bo\'lim boshligi',
          photo: '/viloyat/UMAROV MUXAMMAD MAXMUDOVICH.jpg',
        }
      },
      { 
        name: 'Navoiy viloyati bo\'limi', 
        city: 'Navoiy', 
        phone: '+99879 532 34 60',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH',
          position: 'Navoiy viloyati bilim boshlig\'i',
          photo: '/viloyat/JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH.jpg',
        }
      },
      { 
        name: 'Namangan viloyati bo\'limi', 
        city: 'Namangan', 
        phone: '+99869 227 68 81',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'AXMADJANOV BEKTOSH MIRZAAKBAROVICH',
          position: 'Namangan viloyat boʻlim boshlig\'i',
          photo: '/viloyat/AXMADJANOV BEKTOSH MIRZAAKBAROVICH.jpg',
        }
      },
      { 
        name: 'Samarqand viloyati bo\'limi', 
        city: 'Samarqand', 
        phone: '+998 66 123 45 67',
        manager: {
          name: 'KUBAEV SHOXJAXON ABDUMUROD O\'G\'LI',
          position: 'Samarqand viloyati bo\'lim boshlig\'i',
          photo: "/viloyat/KUBAEV SHOXJAXON ABDUMUROD O'G'LI.jpg",
        }
      },
      { 
        name: 'Sirdaryo viloyati bo\'limi', 
        city: 'Guliston', 
        phone: '+99867 225 06 31',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'QULTOEV AKMAL BERDIALIYEVICH',
          position: 'Sirdaryo viloyati bo\'lim boshlig\'i',
          photo: '/viloyat/QULTOEV AKMAL BERDIALIYEVICH.jpg',
        }
      },
      { 
        name: 'Surxondaryo viloyati bo\'limi', 
        city: 'Termiz', 
        phone: '+99876 223 50 67',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'NARMAMATOV BAXTIYAR QURBONOVICH',
          position: 'Surxondaryo viloyati bo\'linma boshlig\'i',
          photo: '/viloyat/NARMAMATOV BAXTIYAR QURBONOVICH.jpg',
        }
      },
      { 
        name: 'Toshkent viloyati bo\'limi', 
        city: 'Toshkent', 
        phone: '+99817625507',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'YUSUPALIEV JAVLON DJURABAEVICH',
          position: 'Toshkent viloyati bo\'linma boshlig\'i',
          photo: '/viloyat/YUSUPALIEV JAVLON DJURABAEVICH.jpg',
        }
      },
      { 
        name: 'Farg\'ona viloyati bo\'limi', 
        city: 'Farg\'ona', 
        phone: '+99873 244 60 60',
        email: 'garden@agro.uz',
        workingHours: 'Har kuni 09:00 - 11:00',
        manager: {
          name: 'RO\'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH',
          position: 'Farg\'ona viloyati bo\'lim boshlig\'i',
          photo: "/viloyat/RO'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH.jpg",
        }
      },
      { 
        name: 'Xorazm viloyati bo\'limi', 
        city: 'Urganch', 
        phone: '+99862 228 82 84',
        email: 'garden@agro.uz',
        workingHours: 'Dushanba - Juma 09:00 - 12:00',
        manager: {
          name: 'YUSUPOV RO\'ZIBEK RUSTAMOVICH',
          position: 'Xorazm viloyati bo\'linma boshlig\'i',
          photo: "/viloyat/YUSUPOV RO'ZIBEK RUSTAMOVICH.jpg",
        }
      },
    ],
    ru: [
      { 
        name: 'Республика Каракалпакстан', 
        city: 'Нукус', 
        phone: '+998 61 123 45 67',
        manager: {
          name: 'ACHILOV XALDAR TAJIMURATOVICH',
          position: 'Руководитель отдела Республики Каракалпакстан',
          photo: '/viloyat/ACHILOV XALDAR TAJIMURATOVICH.jpg',
        }
      },
      { 
        name: 'Андижанская область', 
        city: 'Андижан', 
        phone: '+99874 223 16 09',
        email: 'garden@agro.uz',
        workingHours: 'Третий понедельник каждого месяца 10:00-12:30',
        manager: {
          name: 'EGAMOV AVAZBEK RAXIMBERDIEVICH',
          position: 'Руководитель отдела Андижанской области',
          photo: '/viloyat/EGAMOV AVAZBEK RAXIMBERDIEVICH.jpg',
        }
      },
      { 
        name: 'Бухарская область', 
        city: 'Бухара', 
        phone: '+998 65 123 45 67',
        manager: {
          name: 'ATOEV AKMAL ASXATOVICH',
          position: 'Руководитель отдела Бухарской области',
          photo: '/viloyat/ATOEV AKMAL ASXATOVICH.jpg',
        }
      },
      { 
        name: 'Джизакская область', 
        city: 'Джизак', 
        phone: '+998972 226 40 15',
        email: 'garden@agro.uz',
        workingHours: 'Третий понедельник каждого месяца 10:00-12:30',
        manager: {
          name: 'SALOHIDDINOV MAXMUR SALOHIDDINOVICH',
          position: 'Руководитель отдела Джизакской области',
          photo: '/viloyat/SALOHIDDINOV MAXMUR SALOHIDDINOVICH.jpg',
        }
      },
      { 
        name: 'Кашкадарьинская область', 
        city: 'Карши', 
        phone: '+998975 221 06 61',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'UMAROV MUXAMMAD MAXMUDOVICH',
          position: 'Руководитель отдела Кашкадарьинской области',
          photo: '/viloyat/UMAROV MUXAMMAD MAXMUDOVICH.jpg',
        }
      },
      { 
        name: 'Навоийская область', 
        city: 'Навои', 
        phone: '+99879 532 34 60',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH',
          position: 'Руководитель отдела Навоийской области',
          photo: '/viloyat/JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH.jpg',
        }
      },
      { 
        name: 'Наманганская область', 
        city: 'Наманган', 
        phone: '+99869 227 68 81',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'AXMADJANOV BEKTOSH MIRZAAKBAROVICH',
          position: 'Руководитель отдела Наманганской области',
          photo: '/viloyat/AXMADJANOV BEKTOSH MIRZAAKBAROVICH.jpg',
        }
      },
      { 
        name: 'Самаркандская область', 
        city: 'Самарканд', 
        phone: '+998 66 123 45 67',
        manager: {
          name: 'KUBAEV SHOXJAXON ABDUMUROD O\'G\'LI',
          position: 'Руководитель отдела Самаркандской области',
          photo: "/viloyat/KUBAEV SHOXJAXON ABDUMUROD O'G'LI.jpg",
        }
      },
      { 
        name: 'Сырдарьинская область', 
        city: 'Гулистан', 
        phone: '+99867 225 06 31',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'QULTOEV AKMAL BERDIALIYEVICH',
          position: 'Руководитель отдела Сырдарьинской области',
          photo: '/viloyat/QULTOEV AKMAL BERDIALIYEVICH.jpg',
        }
      },
      { 
        name: 'Сурхандарьинская область', 
        city: 'Термез', 
        phone: '+99876 223 50 67',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'NARMAMATOV BAXTIYAR QURBONOVICH',
          position: 'Руководитель отдела Сурхандарьинской области',
          photo: '/viloyat/NARMAMATOV BAXTIYAR QURBONOVICH.jpg',
        }
      },
      { 
        name: 'Ташкентская область', 
        city: 'Ташкент', 
        phone: '+99817625507',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'YUSUPALIEV JAVLON DJURABAEVICH',
          position: 'Руководитель отдела Ташкентской области',
          photo: '/viloyat/YUSUPALIEV JAVLON DJURABAEVICH.jpg',
        }
      },
      { 
        name: 'Ферганская область', 
        city: 'Фергана', 
        phone: '+99873 244 60 60',
        email: 'garden@agro.uz',
        workingHours: 'Ежедневно 09:00 - 11:00',
        manager: {
          name: 'RO\'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH',
          position: 'Руководитель отдела Ферганской области',
          photo: "/viloyat/RO'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH.jpg",
        }
      },
      { 
        name: 'Хорезмская область', 
        city: 'Ургенч', 
        phone: '+99862 228 82 84',
        email: 'garden@agro.uz',
        workingHours: 'Понедельник - Пятница 09:00 - 12:00',
        manager: {
          name: 'YUSUPOV RO\'ZIBEK RUSTAMOVICH',
          position: 'Руководитель отдела Хорезмской области',
          photo: "/viloyat/YUSUPOV RO'ZIBEK RUSTAMOVICH.jpg",
        }
      },
    ],
    en: [
      { 
        name: 'Republic of Karakalpakstan', 
        city: 'Nukus', 
        phone: '+998 61 123 45 67',
        manager: {
          name: 'ACHILOV XALDAR TAJIMURATOVICH',
          position: 'Head of Karakalpakstan Republic Department',
        }
      },
      { 
        name: 'Andijan Region', 
        city: 'Andijan', 
        phone: '+99874 223 16 09',
        email: 'garden@agro.uz',
        workingHours: 'Third Monday of each month 10:00-12:30',
        manager: {
          name: 'EGAMOV AVAZBEK RAXIMBERDIEVICH',
          position: 'Head of Andijan Region Department',
          photo: '/viloyat/EGAMOV AVAZBEK RAXIMBERDIEVICH.jpg',
        }
      },
      { 
        name: 'Bukhara Region', 
        city: 'Bukhara', 
        phone: '+998 65 123 45 67',
        manager: {
          name: 'ATOEV AKMAL ASXATOVICH',
          position: 'Head of Bukhara Region Department',
          photo: '/viloyat/ATOEV AKMAL ASXATOVICH.jpg',
        }
      },
      { 
        name: 'Jizzakh Region', 
        city: 'Jizzakh', 
        phone: '+998972 226 40 15',
        email: 'garden@agro.uz',
        workingHours: 'Third Monday of each month 10:00-12:30',
        manager: {
          name: 'SALOHIDDINOV MAXMUR SALOHIDDINOVICH',
          position: 'Head of Jizzakh Region Department',
          photo: '/viloyat/SALOHIDDINOV MAXMUR SALOHIDDINOVICH.jpg',
        }
      },
      { 
        name: 'Kashkadarya Region', 
        city: 'Karshi', 
        phone: '+998975 221 06 61',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'UMAROV MUXAMMAD MAXMUDOVICH',
          position: 'Head of Kashkadarya Region Department',
          photo: '/viloyat/UMAROV MUXAMMAD MAXMUDOVICH.jpg',
        }
      },
      { 
        name: 'Navoi Region', 
        city: 'Navoi', 
        phone: '+99879 532 34 60',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH',
          position: 'Head of Navoi Region Department',
          photo: '/viloyat/JUMAQULOV SHAROFIDDIN MAXAMMADIEVICH.jpg',
        }
      },
      { 
        name: 'Namangan Region', 
        city: 'Namangan', 
        phone: '+99869 227 68 81',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'AXMADJANOV BEKTOSH MIRZAAKBAROVICH',
          position: 'Head of Namangan Region Department',
          photo: '/viloyat/AXMADJANOV BEKTOSH MIRZAAKBAROVICH.jpg',
        }
      },
      { 
        name: 'Samarkand Region', 
        city: 'Samarkand', 
        phone: '+998 66 123 45 67',
        manager: {
          name: 'KUBAEV SHOXJAXON ABDUMUROD O\'G\'LI',
          position: 'Head of Samarkand Region Department',
          photo: "/viloyat/KUBAEV SHOXJAXON ABDUMUROD O'G'LI.jpg",
        }
      },
      { 
        name: 'Sirdarya Region', 
        city: 'Gulistan', 
        phone: '+99867 225 06 31',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'QULTOEV AKMAL BERDIALIYEVICH',
          position: 'Head of Sirdarya Region Department',
          photo: '/viloyat/QULTOEV AKMAL BERDIALIYEVICH.jpg',
        }
      },
      { 
        name: 'Surkhandarya Region', 
        city: 'Termez', 
        phone: '+99876 223 50 67',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'NARMAMATOV BAXTIYAR QURBONOVICH',
          position: 'Head of Surkhandarya Region Department',
          photo: '/viloyat/NARMAMATOV BAXTIYAR QURBONOVICH.jpg',
        }
      },
      { 
        name: 'Tashkent Region', 
        city: 'Tashkent', 
        phone: '+99817625507',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'YUSUPALIEV JAVLON DJURABAEVICH',
          position: 'Head of Tashkent Region Department',
          photo: '/viloyat/YUSUPALIEV JAVLON DJURABAEVICH.jpg',
        }
      },
      { 
        name: 'Fergana Region', 
        city: 'Fergana', 
        phone: '+99873 244 60 60',
        email: 'garden@agro.uz',
        workingHours: 'Daily 09:00 - 11:00',
        manager: {
          name: 'RO\'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH',
          position: 'Head of Fergana Region Department',
          photo: "/viloyat/RO'ZIBOYEV RAVSHANBEK TURSUNBOYEVICH.jpg",
        }
      },
      { 
        name: 'Khorezm Region', 
        city: 'Urgench', 
        phone: '+99862 228 82 84',
        email: 'garden@agro.uz',
        workingHours: 'Monday - Friday 09:00 - 12:00',
        manager: {
          name: 'YUSUPOV RO\'ZIBEK RUSTAMOVICH',
          position: 'Head of Khorezm Region Department',
          photo: "/viloyat/YUSUPOV RO'ZIBEK RUSTAMOVICH.jpg",
        }
      },
    ],
  }

  const regions = regionsData[currentLang]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={t.about.territorial.title}
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop"
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
            <span className="text-gray-600">{t.about.territorial.title}</span>
          </nav>
        </div>
      </section>

      {/* Territorial Offices Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{region.name}</h3>
                  
                  {/* Manager Info */}
                  {region.manager && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      {region.manager.photo && (
                        <div className="mb-3 flex justify-center">
                          <img
                            src={region.manager.photo.replace(/'/g, '\u2018').replace(/'/g, '\u2019')}
                            alt={region.manager.name}
                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 text-center">{region.manager.name}</h4>
                      <p className="text-sm text-primary-600 mb-3 text-center">{region.manager.position}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{region.city}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${region.phone.replace(/\s/g, '').replace(/[()]/g, '')}`} className="text-sm hover:text-primary-600 transition-colors">
                        {region.phone}
                      </a>
                    </div>
                    {region.email && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${region.email}`} className="text-sm hover:text-primary-600 transition-colors break-all">
                          {region.email}
                        </a>
                      </div>
                    )}
                    {region.website && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <a href={region.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary-600 transition-colors break-all">
                          {region.website}
                        </a>
                      </div>
                    )}
                    {region.workingHours && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{region.workingHours}</span>
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Qo\'shimcha ma\'lumot'}
                {currentLang === 'ru' && 'Дополнительная информация'}
                {currentLang === 'en' && 'Additional Information'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentLang === 'uz' && 'Hududiy boshqarmalar agentlikning barcha viloyatlarda faoliyatini ta\'minlaydi va mahalliy agrosanoat loyihalarini qo\'llab-quvvatlaydi.'}
                {currentLang === 'ru' && 'Территориальные управления обеспечивают деятельность агентства во всех регионах и поддерживают местные агропромышленные проекты.'}
                {currentLang === 'en' && 'Territorial departments ensure the agency\'s activities in all regions and support local agro-industrial projects.'}
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


