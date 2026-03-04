# РынокСтартапов — Mini App

## Быстрый деплой на Vercel (30 минут)

### 1. Установи зависимости
```bash
npm install
```

### 2. Проверь локально
```bash
npm run dev
# открой http://localhost:5173
```

### 3. Задеплой на Vercel
```bash
# Установи Vercel CLI (один раз)
npm install -g vercel

# Задеплой
vercel

# Отвечай на вопросы:
# Set up and deploy? → Y
# Which scope? → выбери свой аккаунт
# Link to existing project? → N
# Project name → startup-market
# In which directory is your code? → ./
# Override settings? → N
```

После деплоя получишь URL: https://startup-market-xxx.vercel.app

### 4. Подключи к Telegram

1. Открой @BotFather в Telegram
2. Создай бота: /newbot → введи имя → получи токен
3. Создай Mini App: /newapp → выбери бота → введи URL из Vercel
4. Готово! Открой бота и нажми кнопку запуска

---

## Структура проекта
```
src/
  App.jsx      — весь код приложения
  main.jsx     — точка входа + Telegram SDK init
  index.css    — стили Tailwind
index.html     — HTML с Telegram Web App SDK
```

## Функционал MVP
- ✅ Онбординг: выбор роли (Инвестор / Стартап)
- ✅ Пошаговая регистрация с прогресс-баром
- ✅ Каталог стартапов с поиском и фильтрами
- ✅ Каталог инвесторов с поиском
- ✅ Детальные страницы стартапов и инвесторов
- ✅ Запрос контакта с формой сообщения
- ✅ Аналитика рынка
- ✅ Личный кабинет (инвестор / стартап)
- ✅ 6 тестовых стартапов для демонстрации
- ✅ 3 тестовых инвестора
