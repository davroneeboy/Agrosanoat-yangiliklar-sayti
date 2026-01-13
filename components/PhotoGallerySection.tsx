'use client'

import { useState } from 'react'
import { Language, getTranslation } from '@/lib/i18n'
import Image from 'next/image'

type PhotoGallerySectionProps = {
  currentLang: Language
}

const PhotoGallerySection = ({ currentLang }: PhotoGallerySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const t = getTranslation(currentLang)

  const photos = [
    // Сады (Bog'lar)
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop',
      title: {
        uz: 'Mevali bog\'',
        ru: 'Фруктовый сад',
        en: 'Fruit orchard',
      },
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop',
      title: {
        uz: 'Olma bog\'i',
        ru: 'Яблоневый сад',
        en: 'Apple orchard',
      },
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
      title: {
        uz: 'Meva yig\'ish',
        ru: 'Сбор фруктов',
        en: 'Fruit harvesting',
      },
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
      title: {
        uz: 'Meva-sabzavot bog\'i',
        ru: 'Сад фруктов и овощей',
        en: 'Fruit and vegetable garden',
      },
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
      title: {
        uz: 'Qishloq xo\'jaligi bog\'lari',
        ru: 'Сельскохозяйственные сады',
        en: 'Agricultural gardens',
      },
    },
    // Виноградники (Tokzorlar)
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      title: {
        uz: 'Tokzor',
        ru: 'Виноградник',
        en: 'Vineyard',
      },
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop',
      title: {
        uz: 'Uzum yetishtirish',
        ru: 'Выращивание винограда',
        en: 'Grape cultivation',
      },
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
      title: {
        uz: 'Uzum yig\'ish',
        ru: 'Сбор винограда',
        en: 'Grape harvesting',
      },
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      title: {
        uz: 'Tokzor maydoni',
        ru: 'Виноградное поле',
        en: 'Vineyard field',
      },
    },
    // Теплицы (Issiqxonalar)
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      title: {
        uz: 'Zamonaviy issiqxona',
        ru: 'Современная теплица',
        en: 'Modern greenhouse',
      },
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
      title: {
        uz: 'Issiqxonada sabzavot yetishtirish',
        ru: 'Выращивание овощей в теплице',
        en: 'Vegetable cultivation in greenhouse',
      },
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
      title: {
        uz: 'Issiqxona kompleksi',
        ru: 'Тепличный комплекс',
        en: 'Greenhouse complex',
      },
    },
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      title: {
        uz: 'Issiqxonada gidroponika',
        ru: 'Гидропоника в теплице',
        en: 'Hydroponics in greenhouse',
      },
    },
    {
      id: 14,
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop',
      title: {
        uz: 'Issiqxona texnologiyasi',
        ru: 'Тепличные технологии',
        en: 'Greenhouse technology',
      },
    },
    {
      id: 15,
      url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
      title: {
        uz: 'Yil davomida issiqxona',
        ru: 'Круглогодичная теплица',
        en: 'Year-round greenhouse',
      },
    },
  ]

  const handleImageClick = (url: string) => {
    setSelectedImage(url)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 relative inline-block">
            {t.sections.photoGallery}
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-primary-600"></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => handleImageClick(photo.url)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleImageClick(photo.url)
                  }
                }}
              >
                <Image
                  src={photo.url}
                  alt={photo.title[currentLang]}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-semibold">{photo.title[currentLang]}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для просмотра фото */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors animate-glow"
            aria-label="Закрыть"
            tabIndex={0}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-6xl max-h-[90vh] animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Увеличенное фото"
              width={1200}
              height={800}
              className="rounded-lg shadow-2xl"
              style={{ maxHeight: '90vh', width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallerySection


