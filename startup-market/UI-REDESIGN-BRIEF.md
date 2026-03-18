# UI Redesign Brief — РынокСтартапов (Telegram Mini App)

Проект: `C:\Users\павел\Documents\GitHub\kjpjktrt\startup-market`
Стек: React 18 + Tailwind CSS + Vite, весь UI в `src/App.jsx` (1077 строк)

---

## АУДИТ: ТЕКУЩИЕ ПРОБЛЕМЫ

- **Монотонность** — весь интерфейс = `slate-800/60` карточки с `border-slate-700/50`. Нет визуальной иерархии.
- **Эмодзи вместо графики** — логотипы и аватары это эмодзи в серых квадратах. Выглядит как прототип.
- **Нет фокусных точек** — каждая карточка одинакового веса, глаз не знает куда идти.
- **Один и тот же градиент** `from-blue-600 to-purple-600` везде без семантики.
- **Нет анимаций** — единственная "анимация" это `active:scale-[0.98]`.
- **Bottom nav** написана через inline `style={}` вместо Tailwind.
- **Accessibility** — `text-slate-500` на `bg-slate-950` не проходит WCAG AA.
- **Touch targets** — кнопки фильтров слишком маленькие для мобильного.

---

## ЭКРАН 1: ONBOARDING (строки 254-390)

**Сейчас**: Два шага — выбор роли + пошаговая форма. Фон почти однотонный. Эмодзи-ракета как логотип. Кнопки выбора роли еле видны.

| | Вариант A — Polish | Вариант B — Glassmorphism | Вариант C — Premium |
|---|---|---|---|
| Фон | Оставить, усилить gradient-text на заголовке | Aurora-пятна: два `div` с `blur-3xl` (blue-600/20 и purple-600/15) | Чёрный `bg-black` + CSS grid-pattern |
| Кнопки ролей | `border-blue-500/60 bg-blue-500/15` + `shadow-lg shadow-blue-500/10` | `bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl` | Большие карточки h-40 с gradient-mesh. Инвестор=золото, Стартап=изумруд |
| Инпуты | `focus:ring-2 focus:ring-blue-500/20` | `bg-white/5 border-white/10 focus:border-blue-400/50` | Те же + числовой прогресс `01/08` крупно на фоне |
| Анимации | Нет | CSS fade-in при смене шагов (slideUp) | Каждый шаг через `animate-[fadeSlide_0.4s_ease]` |
| CTA | `shadow-lg shadow-blue-600/25` | Без изменений | `text-4xl font-black` заголовки |

---

## ЭКРАН 2: КАТАЛОГ СТАРТАПОВ (строки 392-434, 954-1012)

**Сейчас**: Список карточек + поиск + фильтры. Все карточки одинакового веса, информационная перегрузка.

| | Вариант A — Polish | Вариант B — Glassmorphism | Вариант C — Premium |
|---|---|---|---|
| Карточки | Первая выделена `ring-1 ring-blue-500/20`. SVG-иконки вместо emoji | `bg-white/5 backdrop-blur-sm border-white/10 rounded-3xl` + hover | Card-grid: 1 крупная + 2 маленькие (masonry) |
| Featured | Нет | Горизонтальный скролл увеличенных карточек `w-72` | Каждому сектору свой акцентный цвет фона |
| Метрики | Зелёная стрелка у роста | Pill-badges `bg-emerald-500/10 rounded-full` | Только logo + name + stage + growth |
| Фильтры | Fade-gradient на правый край скролла | `backdrop-blur-sm bg-white/5` pill-кнопки | Иконки секторов вместо текста |
| Поиск | `shadow-inner` | `bg-white/5 border-0 rounded-2xl` + SVG icon | Скрыт по умолчанию, показ по tap |

---

## ЭКРАН 3: КАТАЛОГ ИНВЕСТОРОВ (строки 436-474, 1014-1028)

**Сейчас**: Поиск + список. Нет фильтров. Визуально неотличим от стартапов.

| | Вариант A — Polish | Вариант B — Glassmorphism | Вариант C — Premium |
|---|---|---|---|
| Аватар | `rounded-full` (отличие от стартапов) | Gradient ring как stories | Крупное имя + маленький фонд |
| Верификация | Иконка-щит `bg-blue-500 rounded-full w-5 h-5` | Animated pulse зелёная точка | Golden checkmark `text-amber-400` |
| Фильтры | Добавить (по секторам/стадиям) | Добавить + glassmorphism | Не нужны |
| Формат | Список | Переключатель list/card + stories вверху | "Визитки" horizontal `aspect-[2/1]` с golden border |
| Ключевая метрика | Увеличить чек до `text-sm font-semibold` | Animated counters | Одна цифра "$45M" крупно `text-3xl font-light` |

---

## ЭКРАН 4: STARTUP DETAIL (строки 476-611)

**Сейчас**: Sticky header, hero, метрики 2x2, условия, теги, материалы, основатель, CTA внизу. Всё однообразно.

| | Вариант A — Polish | Вариант B — Glassmorphism | Вариант C — Premium |
|---|---|---|---|
| Hero | Усилить gradient `from-blue-950/50` | `h-56` gradient mesh + цветные пятна по сектору | Full-bleed `h-screen/2` + AI-фон |
| Метрики | SVG-иконки перед label | Горизонтальный скролл pill-cards | Одна метрика (MRR) крупно `text-5xl font-thin` |
| Привлечение | Выделить мин. инвестицию зелёным | Progress bar raised/raise | Два CTA: "Написать" + "Сохранить" |
| CTA | `shadow-xl shadow-blue-600/30` | `bg-white text-black font-bold` (инверсия) | Два CTA |
| Материалы | Hover state + стрелка | Preview-карточки с gradient placeholder | С превью |
| Анимации | Нет | Staggered appearance секций | Нет |

---

## ЭКРАН 5: INVESTOR DETAIL (строки 613-669)

**Сейчас**: Аналог Startup Detail, но проще. Нет CTA кнопки.

| | Вариант A | Вариант B | Вариант C |
|---|---|---|---|
| CTA | Добавить "Предложить проект" | + "Добавить в избранное" | Есть |
| Портфель | Кликабельные компании | Горизонтальный скролл мини-карточек | Мини-кейсы с ROI |
| Стиль | Polish + gradient ring аватар | Profile-card (аватар по центру) | "Digital business card" + gold accent |

---

## ЭКРАН 6: ANALYTICS (строки 671-744)

**Сейчас**: 4 KPI карточки, progress bars секторов, текстовые тренды.

| | Вариант A | Вариант B | Вариант C |
|---|---|---|---|
| Hero | "$48M" на полную ширину `col-span-2` | "$48M" `text-6xl font-black` + count-up | Bento grid dashboard |
| Секторы | Числа справа от баров | CSS donut chart через `conic-gradient` | Treemap визуализация |
| Тренды | Зелёный цвет для позитивных чисел | Gradient border карточки с иконками | Ticker-лента с автоскроллом |
| Период | Pill-переключатель Неделя/Месяц/Год | Segmented control | Есть |

---

## ЭКРАН 7: PROFILE (строки 746-834)

**Сейчас**: Gradient карточка, emoji-аватар, метрики "0, 0, $0", кнопка "Редактировать" = полный ре-онбординг.

| | Вариант A | Вариант B | Вариант C |
|---|---|---|---|
| Аватар | Инициалы вместо emoji | По центру + gradient ring | Cover-image + аватар поверх |
| Нулевые метрики | "--" + подпись | Animated pills | Крупные числа в ряд |
| Навигация | Кнопки "Настройки" и "Выйти" | Tab-переключатель "О себе / Активность / Настройки" | Отдельный подэкран настроек |
| Фишка | Нет | Glassmorphism карточки | QR-код профиля для шеринга |

---

## ЦВЕТОВЫЕ ПАЛИТРЫ (выбери одну)

### Палитра 1: Refined Dark (улучшение текущей)
```
Background:  #030712 (gray-950, чуть теплее)
Surface:     slate-800/70
Border:      slate-700/40
Primary:     blue-500 (#3b82f6)
Secondary:   violet-500 (#8b5cf6)
Success:     emerald-400
Text:        slate-50 / slate-400 / slate-500
```

### Палитра 2: Vibrant Tech (яркие акценты)
```
Background:  #09090b (zinc-950)
Surface:     zinc-800/50
Border:      zinc-700/40
Primary:     indigo-500 (#6366f1)
Accent 1:    cyan-500 (#06b6d4)
Accent 2:    rose-500 (#f43f5e)
Success:     green-500
Gradient:    from-indigo-500 via-cyan-500 to-indigo-500
Text:        zinc-50 / zinc-400
```

### Палитра 3: Luxury Minimal (золото/серебро)
```
Background:  #000000 (black)
Surface:     neutral-900/80
Border:      neutral-700/30
Primary:     #d4a574 (gold custom)
Silver:      slate-400
Success:     green-300
Gradient:    from-amber-200/20 to-amber-900/5
Text:        gray-200 / gray-500
```

---

## ТИПОГРАФИКА (выбери одну)

### Комбо 1: Playfair Display + Inter (текущее, улучшенное)
- Playfair — только h1 заголовки экранов
- Inter — всё остальное, `font-medium` (500) для body

### Комбо 2: Inter + JetBrains Mono
- Inter — заголовки и body
- JetBrains Mono — числа, метрики, финансовые данные ($2M, +23%)
- Tech dashboard ощущение

### Комбо 3: Manrope + Inter
- Manrope — заголовки, `font-extrabold tracking-tight`
- Inter — body
- Современный geometric sans, отличная кириллица

---

## ПРОМПТЫ ДЛЯ ГЕНЕРАЦИИ ФОТО

### 1. Hero-фон Onboarding (9:16)
```
Dark abstract technology background, deep navy blue and purple gradient, subtle glowing grid lines, scattered bright dots like stars, minimalist geometric shapes, soft bokeh light effects, futuristic startup atmosphere, no text, 9:16 aspect ratio, 4K quality
```

### 2. Gradient mesh для карточки стартапа (16:9)
```
Abstract soft gradient mesh background, dark theme, blurred colorful light orbs in blue cyan and purple tones, smooth flowing shapes, corporate tech aesthetic, no text no objects, clean minimal, suitable for dark UI overlay, 16:9 aspect ratio
```

### 3. Аватар инвестора — мужской (1:1)
```
Professional business portrait, male executive, dark background, dramatic side lighting, wearing dark formal attire, confident expression, shallow depth of field, corporate headshot style, 1:1 square format, high quality studio photography look
```

### 4. Аватар инвестора — женский (1:1)
```
Professional business portrait, female executive, dark background, dramatic side lighting, wearing dark formal attire, confident expression, shallow depth of field, corporate headshot style, 1:1 square format, high quality studio photography look
```

### 5. Фон Analytics dashboard (16:9)
```
Abstract dark data visualization background, floating holographic charts and graphs, blue and cyan glowing lines on black, scatter plot dots, bar chart silhouettes, futuristic dashboard aesthetic, no readable text, depth of field blur, 16:9 aspect ratio
```

### 6. Cover-image профиля (3:1)
```
Elegant abstract dark banner, subtle gold and silver gradient streaks on black background, minimal luxury aesthetic, soft metallic reflections, no text, clean and sophisticated, suitable as profile cover image, 3:1 wide aspect ratio
```

---

## СИСТЕМНЫЕ ФИКСЫ (делать в любом варианте)

1. **Bottom Navigation** — переписать inline `style={}` на Tailwind
2. **Accessibility** — поднять `text-slate-500` до `text-slate-400` (WCAG AA)
3. **Touch targets** — фильтры минимум `py-2 px-3` (44px height)
4. **Skeleton loading** — `animate-pulse` placeholder-блоки при переходах
5. **Разбить App.jsx** на компоненты: `components/`, `screens/`

---

## КАК ИСПОЛЬЗОВАТЬ

1. Выбери варианты для каждого экрана (A/B/C)
2. Выбери палитру (1/2/3)
3. Выбери типографику (1/2/3)
4. Сгенерируй фото по промптам если нужно
5. Запусти UI Designer агента с выбранными вариантами — он реализует
