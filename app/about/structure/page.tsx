'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

interface Department {
  name: {
    uz: string
    ru: string
    en: string
  }
  positions: string
  extraBudget?: boolean
}

interface DeputyDirector {
  name: {
    uz: string
    ru: string
    en: string
  }
  positions: string
  extraBudget?: boolean
  departments: Department[]
}

export default function StructurePage() {
  const { currentLang } = useLanguage()
  const t = getTranslation(currentLang)

  const structureData = {
    director: {
      uz: 'Direktor',
      ru: 'Директор',
      en: 'Director',
    },
    advisor: {
      uz: 'Direktor maslahatchisi',
      ru: 'Советник директора',
      en: 'Director\'s Advisor',
      positions: '2*',
      extraBudget: true,
    },
    assistant: {
      uz: 'Direktor yordamchisi',
      ru: 'Помощник директора',
      en: 'Director\'s Assistant',
    },
    deputyDirectors: [
      {
        name: {
          uz: 'Direktorning birinchi o\'rinbosari (bog\'dorchilikni tashkil etish bo\'yicha)',
          ru: 'Первый заместитель директора (по организации садоводства)',
          en: 'First Deputy Director (for organizing horticulture)',
        },
        positions: '1',
        departments: [
          {
            name: {
              uz: 'Sanoatlashgan intensiv bog\' va uzumzorlarni rivojlantirish boshqarmasi',
              ru: 'Управление по развитию промышленных интенсивных садов и виноградников',
              en: 'Department for the Development of Industrial Intensive Gardens and Vineyards',
            },
            positions: '4',
          },
          {
            name: {
              uz: 'Ko\'chatchilik xo\'jaliklarini muvofiqlashtirish va himoyasi bo\'limi',
              ru: 'Отдел координации и защиты питомниковых хозяйств',
              en: 'Department for Coordination and Protection of Nursery Farms',
            },
            positions: '3',
          },
          {
            name: {
              uz: 'Suv tejovchi texnologiyalarni rivojlantirish bo\'limi',
              ru: 'Отдел развития водосберегающих технологий',
              en: 'Department for the Development of Water-Saving Technologies',
            },
            positions: '2',
          },
          {
            name: {
              uz: 'Bog\' va uzumzor, issiqxona yerlaridan foydalanishni tashkil etish, yer axborot bazasini yuritish va tuproq unumdorligini aniqlash bo\'limi',
              ru: 'Отдел организации использования земель садов, виноградников, теплиц, ведения земельной информационной базы и определения плодородия почвы',
              en: 'Department for Organizing the Use of Garden, Vineyard, Greenhouse Lands, Maintaining Land Information Base, and Determining Soil Fertility',
            },
            positions: '3',
          },
          {
            name: {
              uz: 'Loyihalarni texnik-iqtisodiy asoslash boshqarmasi',
              ru: 'Управление технико-экономического обоснования проектов',
              en: 'Department for Technical and Economic Justification of Projects',
            },
            positions: '7 (3*)',
            extraBudget: true,
          },
        ],
      },
      {
        name: {
          uz: 'Direktor o\'rinbosari (qo\'shilgan qiymat zanjirini rivojlantirish bo\'yicha)',
          ru: 'Заместитель директора (по развитию цепочки добавленной стоимости)',
          en: 'Deputy Director (for developing the value chain)',
        },
        positions: '1',
        departments: [
          {
            name: {
              uz: 'Qayta ishlash va qo\'shilgan qiymatni rivojlantirish bo\'limi',
              ru: 'Отдел переработки и развития добавленной стоимости',
              en: 'Department for Processing and Value-Added Development',
            },
            positions: '3',
          },
          {
            name: {
              uz: 'Agrologistika va sovutgichli omborlarni rivojlantirish bo\'yicha bosh mutaxassis',
              ru: 'Главный специалист по развитию агрологистики и холодильных складов',
              en: 'Chief Specialist for Agrologistics and Cold Storage Development',
            },
            positions: '1',
          },
          {
            name: {
              uz: 'Issiqxona xo\'jaliklarini rivojlantirish bo\'limi',
              ru: 'Отдел развития тепличных хозяйств',
              en: 'Department for the Development of Greenhouse Farms',
            },
            positions: '3',
          },
          {
            name: {
              uz: 'Marketing va eksport bo\'limi',
              ru: 'Отдел маркетинга и экспорта',
              en: 'Marketing and Export Department',
    },
            positions: '2*',
            extraBudget: true,
          },
        ],
      },
      {
        name: {
          uz: 'Direktor o\'rinbosari (moliya-iqtisod masalalari bo\'yicha)',
          ru: 'Заместитель директора (по финансово-экономическим вопросам)',
          en: 'Deputy Director (for financial and economic issues)',
        },
        positions: '1*',
        extraBudget: true,
        departments: [
          {
            name: {
              uz: 'Moliyalashtirish, buxgalteriya hisobi va rejalashtirish bo\'limi',
              ru: 'Отдел финансирования, бухгалтерского учета и планирования',
              en: 'Department of Financing, Accounting, and Planning',
            },
            positions: '4',
          },
          {
            name: {
              uz: 'Jamg\'arma faoliyatini muvofiqlashtirish bo\'limi',
              ru: 'Отдел координации деятельности фонда',
              en: 'Department for Coordination of Fund Activities',
            },
            positions: '2',
          },
          {
            name: {
              uz: 'Moliyaviy qo\'llab-quvvatlash bo\'limi',
              ru: 'Отдел финансовой поддержки',
              en: 'Financial Support Department',
            },
            positions: '4',
          },
        ],
      },
    ],
    directDepartments: [
      {
        name: {
          uz: 'Axborot tahlil va strategik rejalashtirish va metodologiya bo\'limi',
          ru: 'Отдел информационного анализа, стратегического планирования и методологии',
          en: 'Department of Information Analysis, Strategic Planning, and Methodology',
        },
        positions: '2',
      },
      {
        name: {
          uz: 'Inson resurslarini rivojlantirish va boshqarish bo\'limi',
          ru: 'Отдел развития и управления человеческими ресурсами',
          en: 'Department for Human Resources Development and Management',
        },
        positions: '3',
      },
      {
        name: {
          uz: 'Ijro nazorati bo\'limi',
          ru: 'Отдел исполнительного контроля',
          en: 'Executive Control Department',
        },
        positions: '2',
      },
      {
        name: {
          uz: 'Devonxona va murojaatlar bilan ishlash bo\'yicha bosh mutaxassis',
          ru: 'Главный специалист по делопроизводству и работе с обращениями',
          en: 'Chief Specialist for Office Management and Handling Appeals',
        },
        positions: '1*',
        extraBudget: true,
      },
      {
        name: {
          uz: 'Yuridik ta\'minlash bo\'limi',
          ru: 'Отдел правового обеспечения',
          en: 'Legal Support Department',
        },
        positions: '3',
      },
      {
        name: {
          uz: 'AKT va raqamlashtirish bo\'limi',
          ru: 'Отдел ИКТ и цифровизации',
          en: 'ICT and Digitalization Department',
        },
        positions: '4',
      },
      {
        name: {
          uz: 'Korrupsiyaga qarshi kurashish bo\'limi',
          ru: 'Отдел борьбы с коррупцией',
          en: 'Anti-Corruption Department',
        },
        positions: '2',
      },
      {
        name: {
          uz: 'Investitsiyalar va xalqaro aloqalar bo\'limi',
          ru: 'Отдел инвестиций и международных связей',
          en: 'Investments and International Relations Department',
    },
        positions: '2',
      },
      {
        name: {
          uz: 'Ichki audit bo\'limi',
          ru: 'Отдел внутреннего аудита',
          en: 'Internal Audit Department',
        },
        positions: '6*',
        extraBudget: true,
      },
      {
        name: {
          uz: 'Axborot xizmatlari bo\'limi',
          ru: 'Отдел информационных услуг',
          en: 'Information Services Department',
        },
        positions: '4',
      },
    ],
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={t.about.structure.title}
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=600&fit=crop"
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
            <span className="text-gray-600">{t.about.structure.title}</span>
          </nav>
        </div>
      </section>

      {/* Structure Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Organizational Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 animate-fade-in overflow-x-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                {currentLang === 'uz' && 'Markaziy apparatining tuzilmasi'}
                {currentLang === 'ru' && 'Структура центрального аппарата'}
                {currentLang === 'en' && 'Central Apparatus Structure'}
              </h2>
              
              {/* Top Level: Advisor, Director, Assistant */}
              <div className="relative mb-16">
                {/* Connecting Lines */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0">
                  <div className="absolute left-1/3 w-1/3 h-full bg-primary-400"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
                  {/* Advisor */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto md:min-w-[220px]">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{structureData.advisor[currentLang]}</h3>
                    <div className="inline-flex items-center gap-1 bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <span>{structureData.advisor.positions}</span>
                      <span className="text-blue-600">*</span>
                    </div>
                  </div>

                  {/* Director - Central and Prominent */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl w-full md:w-auto md:min-w-[280px] order-first md:order-none">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <svg className="w-14 h-14 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-center mb-2">{structureData.director[currentLang]}</h3>
                    <div className="w-16 h-1 bg-white/50 rounded-full mx-auto"></div>
                  </div>

                  {/* Assistant */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto md:min-w-[220px]">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{structureData.assistant[currentLang]}</h3>
                  </div>
                </div>
              </div>

              {/* Deputy Directors */}
              <div className="space-y-8 mb-8">
                {structureData.deputyDirectors.map((deputy, index) => (
                  <div key={index} className="border-2 border-primary-200 rounded-lg p-6 bg-gray-50">
                    <div className="mb-6 pb-4 border-b-2 border-primary-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">
                          {deputy.name[currentLang]}
                        </h3>
                        <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded">
                          {deputy.positions} {deputy.extraBudget && '*'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Departments under Deputy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deputy.departments.map((dept, deptIndex) => (
                        <div
                          key={deptIndex}
                          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-400 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-900 flex-1 mr-2">
                              {dept.name[currentLang]}
                            </h4>
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded whitespace-nowrap">
                              {dept.positions}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Departments */}
              <div className="border-t-4 border-primary-400 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  {currentLang === 'uz' && 'Direktorga bevosita bo\'ysunuvchi bo\'limlar'}
                  {currentLang === 'ru' && 'Отделы, непосредственно подчиненные директору'}
                  {currentLang === 'en' && 'Departments directly reporting to Director'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {structureData.directDepartments.map((dept, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-primary-400 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900 flex-1 mr-2">
                          {dept.name[currentLang]}
                        </h4>
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded whitespace-nowrap">
                          {dept.positions}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

              {/* Footer Info */}
              <div className="mt-8 pt-6 border-t-2 border-gray-300">
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    {currentLang === 'uz' && 'Markaziy apparatining boshqaruv xodimlarining cheklangan umumiy soni 74 birlikni tashkil etadi.'}
                    {currentLang === 'ru' && 'Общее ограниченное количество управленческих кадров центрального аппарата составляет 74 единицы.'}
                    {currentLang === 'en' && 'The total limited number of management staff in the central apparatus is 74 units.'}
                  </p>
                  <p className="text-primary-600 font-semibold">
                    {currentLang === 'uz' && '* Yulduzcha (*) bilan belgilangan lavozimlar byudjetdan tashqari mablag\'lar hisobidan moliyalashtiriladi.'}
                    {currentLang === 'ru' && '* Должности, отмеченные звездочкой (*), финансируются за счет внебюджетных средств.'}
                    {currentLang === 'en' && '* Positions marked with an asterisk (*) are financed from extra-budgetary fund resources.'}
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
