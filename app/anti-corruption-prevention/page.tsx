'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import PageHeader from '@/components/PageHeader'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/lib/useLanguage'
import Link from 'next/link'

export default function AntiCorruptionPreventionPage() {
  const { currentLang } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const t = getTranslation(currentLang)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader
        currentLang={currentLang}
        title={{
          uz: 'Korrupsiyani oldini olish bo\'yicha murojaat',
          ru: 'Обращение по предупреждению коррупции',
          en: 'Anti-Corruption Prevention Appeal'
        }}
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop"
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
              {currentLang === 'uz' && 'Korrupsiyani oldini olish'}
              {currentLang === 'ru' && 'Предупреждение коррупции'}
              {currentLang === 'en' && 'Anti-Corruption Prevention'}
            </span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {currentLang === 'uz' && 'Korrupsiyani oldini olish'}
                {currentLang === 'ru' && 'Предупреждение коррупции'}
                {currentLang === 'en' && 'Anti-Corruption Prevention'}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  {currentLang === 'uz' && 'Agar siz korrupsiya holatlarini oldini olish yoki bunday holatlar haqida ma\'lumotga egasiz, iltimos, bizga murojaat qiling. Barcha murojaatlar maxfiy saqlanadi va tekshiriladi.'}
                  {currentLang === 'ru' && 'Если вы хотите предотвратить коррупцию или имеете информацию о таких случаях, пожалуйста, обратитесь к нам. Все обращения конфиденциальны и будут рассмотрены.'}
                  {currentLang === 'en' && 'If you want to prevent corruption or have information about such cases, please contact us. All appeals are confidential and will be reviewed.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {currentLang === 'uz' && 'Murojaat yuborish'}
                {currentLang === 'ru' && 'Отправить обращение'}
                {currentLang === 'en' && 'Submit Appeal'}
              </h3>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                  {currentLang === 'uz' && 'Murojaatingiz muvaffaqiyatli yuborildi!'}
                  {currentLang === 'ru' && 'Ваше обращение успешно отправлено!'}
                  {currentLang === 'en' && 'Your appeal has been successfully submitted!'}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {currentLang === 'uz' && 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'}
                  {currentLang === 'ru' && 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'}
                  {currentLang === 'en' && 'An error occurred. Please try again.'}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLang === 'uz' && 'Ism Familiya'}
                      {currentLang === 'ru' && 'Имя Фамилия'}
                      {currentLang === 'en' && 'Full Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLang === 'uz' && 'Telefon'}
                    {currentLang === 'ru' && 'Телефон'}
                    {currentLang === 'en' && 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLang === 'uz' && 'Mavzu'}
                    {currentLang === 'ru' && 'Тема'}
                    {currentLang === 'en' && 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLang === 'uz' && 'Xabar'}
                    {currentLang === 'ru' && 'Сообщение'}
                    {currentLang === 'en' && 'Message'}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      {currentLang === 'uz' && 'Yuborilmoqda...'}
                      {currentLang === 'ru' && 'Отправка...'}
                      {currentLang === 'en' && 'Submitting...'}
                    </>
                  ) : (
                    <>
                      {currentLang === 'uz' && 'Yuborish'}
                      {currentLang === 'ru' && 'Отправить'}
                      {currentLang === 'en' && 'Submit'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
      <FloatingButtons />
    </main>
  )
}

