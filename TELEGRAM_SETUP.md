# Настройка Telegram канала

Этот документ описывает, как настроить интеграцию с публичным Telegram каналом для отображения постов на сайте.

## Требования

1. Публичный Telegram канал (не приватный)
2. Username канала (например, `@channelname` или просто `channelname`)

## Настройка

### 1. Получите username вашего Telegram канала

- Откройте ваш Telegram канал
- Скопируйте username канала (например, `@Agrosanoat_uz` или `Agrosanoat_uz`)

### 2. Настройте переменные окружения

Создайте или обновите файл `.env.local` в корне проекта:

```env
# Telegram канал username (без @ или с @)
TELEGRAM_CHANNEL_USERNAME=Agrosanoat_uz

# Опционально: Telegram Bot Token (если хотите использовать Bot API)
# TELEGRAM_BOT_TOKEN=your_bot_token_here
```

**Примечание:** 
- Если у вас есть Telegram Bot Token, вы можете его добавить для более надежной работы
- Для получения Bot Token создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
- Бот должен быть добавлен в канал как администратор для работы через Bot API

### 3. Использование компонента

Компонент `TelegramPostsSection` можно добавить на любую страницу:

```tsx
import TelegramPostsSection from '@/components/TelegramPostsSection'

// В вашем компоненте:
<TelegramPostsSection currentLang={currentLang} />
```

### 4. Добавление на главную страницу

Чтобы добавить Telegram посты на главную страницу, откройте `app/page.tsx` и добавьте:

```tsx
import TelegramPostsSection from '@/components/TelegramPostsSection'

// В компоненте Home:
<TelegramPostsSection currentLang={currentLang} />
```

## Как это работает

1. **Парсинг HTML**: По умолчанию система парсит публичную HTML страницу канала (`https://t.me/s/channelname`)
2. **Bot API** (опционально): Если указан `TELEGRAM_BOT_TOKEN`, система попытается использовать Telegram Bot API

## Ограничения

- Канал должен быть публичным
- Парсинг HTML может быть менее надежным, чем Bot API
- Для Bot API бот должен быть администратором канала
- Максимум 10 последних постов

## Устранение неполадок

### Посты не загружаются

1. Проверьте, что канал публичный
2. Убедитесь, что `TELEGRAM_CHANNEL_USERNAME` указан правильно (без лишних символов)
3. Проверьте консоль браузера на наличие ошибок
4. Убедитесь, что канал существует и доступен

### Изображения не отображаются

1. Проверьте, что домены `cdn4.telesco.pe` и `cdn5.telesco.pe` добавлены в `next.config.js` (уже добавлены)
2. Убедитесь, что посты содержат медиа (фото/видео)

### Bot API не работает

1. Убедитесь, что бот добавлен в канал как администратор
2. Проверьте правильность Bot Token
3. Система автоматически переключится на парсинг HTML, если Bot API недоступен

