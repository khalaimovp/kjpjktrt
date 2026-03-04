import { useState } from "react";

// ===================== MOCK DATA =====================
const MOCK_STARTUPS = [
  {
    id: 1,
    name: "NeuroPay",
    logo: "🧠",
    tagline: "ИИ-платёжная система нового поколения",
    sector: "FinTech",
    stage: "Series A",
    location: "Москва, Россия",
    raise: "$2M",
    equity: "8%",
    minInvestment: "$50 000",
    valuation: "$25M",
    description:
      "Платёжная платформа на основе нейросетей для автоматизации B2B расчётов. Снижаем транзакционные издержки на 40% за счёт предиктивного клиринга. Интеграции с 15 банками.",
    metrics: { mrr: "$180K", growth: "+23%", users: "1 200", retention: "89%" },
    tags: ["AI", "Payments", "B2B"],
    founded: "2022",
    team: 14,
    views: 2341,
    savedBy: 87,
    raised: "$320K",
    founderName: "Алексей Морозов",
    founderId: 1,
    deck: true,
    video: true,
  },
  {
    id: 2,
    name: "GreenRoute",
    logo: "🌿",
    tagline: "Логистика с нулевым углеродным следом",
    sector: "GreenTech",
    stage: "Seed",
    location: "Санкт-Петербург, Россия",
    raise: "$800K",
    equity: "12%",
    minInvestment: "$20 000",
    valuation: "$6.7M",
    description:
      "SaaS-платформа для оптимизации маршрутов грузового транспорта. Алгоритмы экономят 30% топлива и сокращают CO₂ выбросы автопарков. Уже работаем с 40+ транспортными компаниями.",
    metrics: { mrr: "$42K", growth: "+41%", users: "340", retention: "92%" },
    tags: ["Logistics", "SaaS", "Climate"],
    founded: "2023",
    team: 7,
    views: 1876,
    savedBy: 54,
    raised: "$150K",
    founderName: "Мария Соколова",
    founderId: 2,
    deck: true,
    video: false,
  },
  {
    id: 3,
    name: "MedScan AI",
    logo: "🔬",
    tagline: "Ранняя диагностика онкологии через МРТ",
    sector: "MedTech",
    stage: "Pre-Seed",
    location: "Новосибирск, Россия",
    raise: "$500K",
    equity: "15%",
    minInvestment: "$10 000",
    valuation: "$3.3M",
    description:
      "Система компьютерного зрения для анализа МРТ-снимков. Точность диагностики 94.7% против 78% у радиологов. Партнёрство с 5 клиниками. Одобрено Минздравом для пилота.",
    metrics: { mrr: "$18K", growth: "+67%", users: "12 клиник", retention: "100%" },
    tags: ["AI", "Healthcare", "DeepTech"],
    founded: "2023",
    team: 5,
    views: 3102,
    savedBy: 129,
    raised: "$0",
    founderName: "Дмитрий Волков",
    founderId: 3,
    deck: true,
    video: true,
  },
  {
    id: 4,
    name: "EduFlow",
    logo: "📚",
    tagline: "Персонализированное обучение через адаптивный ИИ",
    sector: "EdTech",
    stage: "Series A",
    location: "Казань, Россия",
    raise: "$3M",
    equity: "10%",
    minInvestment: "$100 000",
    valuation: "$30M",
    description:
      "EdTech-платформа для корпоративного обучения. ИИ строит персональные траектории для каждого сотрудника. 200+ корпоративных клиентов, 45 000 активных пользователей.",
    metrics: { mrr: "$290K", growth: "+18%", users: "45 000", retention: "85%" },
    tags: ["EdTech", "AI", "B2B", "HR"],
    founded: "2021",
    team: 28,
    views: 4210,
    savedBy: 203,
    raised: "$1.2M",
    founderName: "Екатерина Новикова",
    founderId: 4,
    deck: true,
    video: true,
  },
  {
    id: 5,
    name: "SpaceAgro",
    logo: "🛰️",
    tagline: "Агромониторинг через спутниковые данные",
    sector: "AgriTech",
    stage: "Seed",
    location: "Краснодар, Россия",
    raise: "$1.2M",
    equity: "9%",
    minInvestment: "$30 000",
    valuation: "$13.3M",
    description:
      "Платформа спутникового мониторинга посевов для агрохолдингов. Предсказываем урожайность за 3 месяца до сбора. Работаем с 150 000 га полей по всей России.",
    metrics: { mrr: "$95K", growth: "+35%", users: "47", retention: "96%" },
    tags: ["AgriTech", "Space", "AI", "B2B"],
    founded: "2022",
    team: 11,
    views: 1543,
    savedBy: 61,
    raised: "$400K",
    founderName: "Иван Степанов",
    founderId: 5,
    deck: true,
    video: false,
  },
  {
    id: 6,
    name: "CyberShield",
    logo: "🛡️",
    tagline: "Zero-trust безопасность для МСБ",
    sector: "CyberSecurity",
    stage: "Series B",
    location: "Москва, Россия",
    raise: "$8M",
    equity: "6%",
    minInvestment: "$200 000",
    valuation: "$133M",
    description:
      "Облачная платформа кибербезопасности для малого и среднего бизнеса. Zero-trust архитектура, автоматическое обнаружение угроз. 3 200 клиентов в 12 странах.",
    metrics: { mrr: "$780K", growth: "+14%", users: "3 200", retention: "94%" },
    tags: ["CyberSec", "SaaS", "B2B"],
    founded: "2020",
    team: 67,
    views: 5890,
    savedBy: 312,
    raised: "$4.5M",
    founderName: "Артём Кузнецов",
    founderId: 6,
    deck: true,
    video: true,
  },
];

const MOCK_INVESTORS = [
  {
    id: 1,
    name: "Андрей Петров",
    avatar: "👔",
    title: "Управляющий партнёр",
    fund: "Frontier Capital",
    location: "Москва, Россия",
    totalInvested: "$45M",
    portfolio: 23,
    sectors: ["FinTech", "AI", "SaaS"],
    stages: ["Seed", "Series A"],
    ticketSize: "$500K – $3M",
    bio: "15 лет в венчурных инвестициях. Ранние инвестиции в 3 единорога. Фокус на технологические стартапы с доказанной тягой и опытной командой.",
    deals: ["NeuroPay", "EduFlow", "TechVision"],
    joined: "2021",
    verified: true,
  },
  {
    id: 2,
    name: "Светлана Иванова",
    avatar: "👩‍💼",
    title: "Angel Investor",
    fund: "Личный портфель",
    location: "Санкт-Петербург, Россия",
    totalInvested: "$8M",
    portfolio: 12,
    sectors: ["GreenTech", "MedTech", "EdTech"],
    stages: ["Pre-Seed", "Seed"],
    ticketSize: "$50K – $300K",
    bio: "Экс-CEO крупного ритейлера. Инвестирую в проекты с социальным импактом и устойчивым бизнесом. Помогаю командам выстраивать go-to-market стратегию.",
    deals: ["GreenRoute", "MedScan AI"],
    joined: "2022",
    verified: true,
  },
  {
    id: 3,
    name: "Роман Зайцев",
    avatar: "🧑‍💻",
    title: "Principal",
    fund: "Digital Ventures",
    location: "Казань, Россия",
    totalInvested: "$22M",
    portfolio: 18,
    sectors: ["EdTech", "AgriTech", "CyberSecurity"],
    stages: ["Series A", "Series B"],
    ticketSize: "$1M – $5M",
    bio: "Технический эксперт с опытом в ML/AI. Помогаю стартапам выстраивать продуктовую стратегию помимо инвестиций. Член 4 советов директоров.",
    deals: ["EduFlow", "SpaceAgro", "CyberShield"],
    joined: "2020",
    verified: true,
  },
];

const SECTORS = ["Все", "FinTech", "GreenTech", "MedTech", "EdTech", "AgriTech", "CyberSecurity", "AI", "SaaS"];
const STAGES = ["Все", "Pre-Seed", "Seed", "Series A", "Series B"];

// ===================== HELPERS =====================
function Badge({ children, color = "blue" }) {
  const colors = {
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Ava({ emoji, size = "md" }) {
  const s = { sm: "w-8 h-8 text-lg", md: "w-12 h-12 text-2xl", lg: "w-16 h-16 text-3xl" };
  return (
    <div className={`${s[size]} rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600/50 flex-shrink-0`}>
      {emoji}
    </div>
  );
}

function Metric({ label, value, sub }) {
  return (
    <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50">
      <div className="text-slate-400 text-xs mb-0.5">{label}</div>
      <div className="text-white font-bold text-base leading-none">{value}</div>
      {sub && <div className="text-emerald-400 text-xs mt-1">{sub}</div>}
    </div>
  );
}

// ===================== ONBOARDING =====================
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({});

  const investorFields = [
    { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text" },
    { key: "title", label: "Должность / роль", placeholder: "Управляющий партнёр, Angel Investor...", type: "text" },
    { key: "fund", label: "Фонд или компания", placeholder: "Название фонда или «Личный портфель»", type: "text" },
    { key: "bio", label: "О себе", placeholder: "Расскажите о вашем опыте, предыдущих инвестициях, экспертизе...", type: "textarea" },
    { key: "sectors", label: "Интересные секторы", placeholder: "FinTech, AI, MedTech...", type: "text" },
    { key: "stages", label: "Стадии инвестирования", placeholder: "Seed, Series A...", type: "text" },
    { key: "ticket", label: "Размер чека", placeholder: "$100K – $1M", type: "text" },
    { key: "geo", label: "География", placeholder: "Россия, СНГ, Европа...", type: "text" },
  ];

  const startupFields = [
    { key: "name", label: "Ваше имя", placeholder: "Алексей Петров", type: "text" },
    { key: "title", label: "Роль в стартапе", placeholder: "CEO, Co-Founder, CTO...", type: "text" },
    { key: "startupName", label: "Название стартапа", placeholder: "Название вашего проекта", type: "text" },
    { key: "tagline", label: "Одна строка о проекте", placeholder: "Что делает ваш стартап?", type: "text" },
    { key: "sector", label: "Сектор", placeholder: "FinTech, MedTech, EdTech...", type: "text" },
    { key: "stage", label: "Стадия", placeholder: "Pre-Seed, Seed, Series A...", type: "text" },
    { key: "raise", label: "Сумма привлечения", placeholder: "$500K", type: "text" },
    { key: "bio", label: "О себе как основателе", placeholder: "Ваш бэкграунд, предыдущие проекты, почему именно вы...", type: "textarea" },
  ];

  const fields = role === "investor" ? investorFields : startupFields;

  if (step === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            РынокСтартапов
          </h1>
          <p className="text-slate-400 text-sm">Платформа для инвесторов и основателей</p>
        </div>
        <p className="text-slate-300 text-center mb-6 font-medium">Кто вы на этой платформе?</p>
        <div className="space-y-3">
          <button
            onClick={() => { setRole("investor"); setStep(1); }}
            className="w-full p-5 rounded-2xl border-2 border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/60 transition-all text-left active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">💼</div>
              <div>
                <div className="text-white font-bold text-lg">Я инвестор</div>
                <div className="text-slate-400 text-sm">Ищу перспективные стартапы</div>
              </div>
              <div className="ml-auto text-blue-400 text-xl">→</div>
            </div>
          </button>
          <button
            onClick={() => { setRole("startup"); setStep(1); }}
            className="w-full p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-all text-left active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🚀</div>
              <div>
                <div className="text-white font-bold text-lg">Я стартап</div>
                <div className="text-slate-400 text-sm">Привлекаю инвестиции в проект</div>
              </div>
              <div className="ml-auto text-emerald-400 text-xl">→</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const field = fields[step - 1];
  const progress = (step / fields.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setStep(s => s - 1)} className="text-slate-400 hover:text-white text-lg">←</button>
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-slate-500 text-xs">{step}/{fields.length}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {field.label}
          </h2>
          <p className="text-slate-500 text-sm">
            {role === "investor" ? "Регистрация инвестора" : "Регистрация основателя"}
          </p>
        </div>

        {field.type === "textarea" ? (
          <textarea
            className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors resize-none text-sm"
            rows={4}
            placeholder={field.placeholder}
            value={form[field.key] || ""}
            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
          />
        ) : (
          <input
            className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors text-sm"
            placeholder={field.placeholder}
            value={form[field.key] || ""}
            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
          />
        )}

        <button
          onClick={() => {
            if (step < fields.length) setStep(s => s + 1);
            else onComplete({ role, ...form });
          }}
          className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          {step < fields.length ? "Далее →" : "Завершить ✓"}
        </button>
        {step < fields.length && (
          <button
            onClick={() => setStep(s => s + 1)}
            className="w-full mt-2 py-3 text-slate-500 text-sm hover:text-slate-400 transition-colors"
          >
            Пропустить
          </button>
        )}
      </div>
    </div>
  );
}

// ===================== STARTUP CARD =====================
function StartupCard({ startup, onClick }) {
  return (
    <div
      onClick={() => onClick(startup)}
      className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600/80 transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start gap-3 mb-3">
        <Ava emoji={startup.logo} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-bold">{startup.name}</h3>
            <Badge color="purple">{startup.stage}</Badge>
          </div>
          <p className="text-slate-400 text-xs mt-0.5 truncate">{startup.tagline}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge color="blue">{startup.sector}</Badge>
            <span className="text-slate-500 text-xs">📍 {startup.location}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm">{startup.raise}</div>
          <div className="text-slate-500 text-xs">Раунд</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-emerald-400 font-bold text-sm">{startup.metrics.growth}</div>
          <div className="text-slate-500 text-xs">Рост MRR</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm">{startup.equity}</div>
          <div className="text-slate-500 text-xs">Доля</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>👁 {startup.views.toLocaleString()}</span>
        <span>🔖 {startup.savedBy}</span>
        <span>💰 min {startup.minInvestment}</span>
      </div>
    </div>
  );
}

// ===================== INVESTOR CARD =====================
function InvestorCard({ investor, onClick }) {
  return (
    <div
      onClick={() => onClick(investor)}
      className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600/80 transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start gap-3 mb-3">
        <Ava emoji={investor.avatar} size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-bold">{investor.name}</h3>
            {investor.verified && <Badge color="blue">✓ Верифицирован</Badge>}
          </div>
          <p className="text-slate-400 text-xs">{investor.title} · {investor.fund}</p>
          <p className="text-slate-500 text-xs">📍 {investor.location}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {investor.sectors.slice(0, 3).map(s => <Badge key={s} color="green">{s}</Badge>)}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm">{investor.totalInvested}</div>
          <div className="text-slate-500 text-xs">Вложил</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm">{investor.portfolio}</div>
          <div className="text-slate-500 text-xs">Проектов</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-2 text-center">
          <div className="text-blue-400 font-bold text-xs leading-tight">{investor.ticketSize}</div>
          <div className="text-slate-500 text-xs">Чек</div>
        </div>
      </div>
      <p className="text-slate-400 text-xs line-clamp-2">{investor.bio}</p>
    </div>
  );
}

// ===================== STARTUP DETAIL =====================
function StartupDetail({ startup, onBack, onContact }) {
  return (
    <div className="min-h-screen bg-slate-950 pb-28">
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white text-xl w-8">←</button>
        <h2 className="text-white font-bold">{startup.name}</h2>
        <Badge color="purple">{startup.stage}</Badge>
      </div>

      <div className="p-4 space-y-4">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-start gap-4 mb-4">
            <Ava emoji={startup.logo} size="lg" />
            <div>
              <h1 className="text-white text-xl font-bold">{startup.name}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{startup.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge color="blue">{startup.sector}</Badge>
                <span className="text-slate-500 text-xs py-0.5">📍 {startup.location}</span>
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{startup.description}</p>
        </div>

        {/* Metrics */}
        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Ключевые метрики</h3>
          <div className="grid grid-cols-2 gap-2">
            <Metric label="MRR" value={startup.metrics.mrr} sub={startup.metrics.growth + " мес/мес"} />
            <Metric label="Пользователи" value={startup.metrics.users} />
            <Metric label="Оценка" value={startup.valuation} />
            <Metric label="Удержание" value={startup.metrics.retention} />
          </div>
        </div>

        {/* Investment */}
        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Условия инвестирования</h3>
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-2.5">
            {[
              ["Раунд", startup.raise, "white"],
              ["Доля за раунд", startup.equity, "white"],
              ["Мин. инвестиция", startup.minInvestment, "emerald"],
              ["Уже привлечено", startup.raised, "white"],
            ].map(([label, val, color]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{label}</span>
                <span className={`font-semibold text-sm ${color === "emerald" ? "text-emerald-400" : "text-white"}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {startup.tags.map(t => <Badge key={t} color="blue">{t}</Badge>)}
          </div>
        </div>

        {/* Media */}
        {(startup.deck || startup.video) && (
          <div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Материалы</h3>
            <div className="flex gap-2">
              {startup.deck && (
                <div className="flex-1 bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50 flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="text-white text-sm font-medium">Презентация</div>
                    <div className="text-slate-500 text-xs">Deck доступен</div>
                  </div>
                </div>
              )}
              {startup.video && (
                <div className="flex-1 bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50 flex items-center gap-2">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <div className="text-white text-sm font-medium">Видео</div>
                    <div className="text-slate-500 text-xs">Питч-видео</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Founder */}
        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Основатель</h3>
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">👤</div>
              <div>
                <div className="text-white font-medium">{startup.founderName}</div>
                <div className="text-slate-400 text-xs">Команда: {startup.team} чел.</div>
              </div>
            </div>
            <div className="text-slate-500 text-xs">с {startup.founded}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30">
          <div className="text-center">
            <div className="text-white font-bold">{startup.views.toLocaleString()}</div>
            <div className="text-slate-500 text-xs">просмотров</div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <div className="text-white font-bold">{startup.savedBy}</div>
            <div className="text-slate-500 text-xs">сохранили</div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <div className="text-emerald-400 font-bold">{startup.raised}</div>
            <div className="text-slate-500 text-xs">привлечено</div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800/50">
        <button
          onClick={() => onContact(startup)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all"
        >
          💬 Запросить контакт основателя
        </button>
      </div>
    </div>
  );
}

// ===================== INVESTOR DETAIL =====================
function InvestorDetail({ investor, onBack }) {
  return (
    <div className="min-h-screen bg-slate-950 pb-8">
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white text-xl w-8">←</button>
        <h2 className="text-white font-bold">{investor.name}</h2>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-start gap-4 mb-4">
            <Ava emoji={investor.avatar} size="lg" />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-white text-xl font-bold">{investor.name}</h1>
                {investor.verified && <Badge color="blue">✓</Badge>}
              </div>
              <Badge color="amber">💼 Инвестор</Badge>
              <p className="text-slate-400 text-sm mt-1">{investor.title}</p>
              <p className="text-slate-500 text-xs">{investor.fund} · {investor.location}</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{investor.bio}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Metric label="Инвестировал" value={investor.totalInvested} />
          <Metric label="Портфель" value={`${investor.portfolio} пр.`} />
          <Metric label="Чек" value={investor.ticketSize} />
        </div>

        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Инвест. фокус</h3>
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-3">
            <div>
              <div className="text-slate-500 text-xs mb-1.5">Секторы</div>
              <div className="flex flex-wrap gap-1.5">{investor.sectors.map(s => <Badge key={s} color="green">{s}</Badge>)}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1.5">Стадии</div>
              <div className="flex flex-wrap gap-1.5">{investor.stages.map(s => <Badge key={s} color="purple">{s}</Badge>)}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Портфельные компании</h3>
          <div className="flex flex-wrap gap-2">
            {investor.deals.map(d => (
              <div key={d} className="bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-700/50 text-slate-300 text-sm">🚀 {d}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== ANALYTICS =====================
function Analytics() {
  const trendData = [
    { sector: "AI/ML", count: 48, growth: "+34%" },
    { sector: "FinTech", count: 36, growth: "+18%" },
    { sector: "MedTech", count: 29, growth: "+41%" },
    { sector: "GreenTech", count: 24, growth: "+67%" },
    { sector: "EdTech", count: 21, growth: "+12%" },
    { sector: "AgriTech", count: 15, growth: "+29%" },
  ];

  return (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-white text-xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Аналитика рынка
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { val: "247", label: "Стартапов", sub: "+23 за месяц", from: "from-blue-600/20", border: "border-blue-500/20", text: "text-blue-300" },
          { val: "89", label: "Инвесторов", sub: "+12 за месяц", from: "from-purple-600/20", border: "border-purple-500/20", text: "text-purple-300" },
          { val: "$48M", label: "Привлечено", sub: "+$8M за месяц", from: "from-emerald-600/20", border: "border-emerald-500/20", text: "text-emerald-300" },
          { val: "312", label: "Коннектов", sub: "+47 за месяц", from: "from-amber-600/20", border: "border-amber-500/20", text: "text-amber-300" },
        ].map(item => (
          <div key={item.label} className={`bg-gradient-to-br ${item.from} to-transparent border ${item.border} rounded-2xl p-4`}>
            <div className="text-3xl font-bold text-white">{item.val}</div>
            <div className={`${item.text} text-xs mt-1`}>{item.label}</div>
            <div className="text-emerald-400 text-xs mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Топ секторов</h3>
        <div className="space-y-2">
          {trendData.map((item, i) => (
            <div key={item.sector} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
              <div className="text-slate-500 text-sm w-4 font-bold">{i + 1}</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm font-medium">{item.sector}</span>
                  <div className="flex gap-2">
                    <span className="text-slate-400 text-xs">{item.count} ст.</span>
                    <span className="text-emerald-400 text-xs">{item.growth}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${(item.count / 48) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Тренды</h3>
        <div className="space-y-2">
          {[
            { label: "AI-стартапы привлекают в среднем на 40% больше капитала", icon: "🤖" },
            { label: "GreenTech — максимальный рост интереса инвесторов +67% МоМ", icon: "🌱" },
            { label: "Медиан чек вырос до $250K в этом году", icon: "💰" },
            { label: "Series A закрывается в среднем за 4.2 месяца", icon: "⚡" },
          ].map((t, i) => (
            <div key={i} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30 flex items-start gap-3">
              <span className="text-xl">{t.icon}</span>
              <p className="text-slate-300 text-sm">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== PROFILE =====================
function Profile({ user, onEdit }) {
  const isInvestor = user.role === "investor";
  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 mt-2">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl flex-shrink-0">
            {isInvestor ? "💼" : "🚀"}
          </div>
          <div className="flex-1">
            <h2 className="text-white text-xl font-bold">{user.name || "Пользователь"}</h2>
            <p className="text-slate-400 text-sm">{user.title || (isInvestor ? "Инвестор" : "Основатель")}</p>
            {user.fund && <p className="text-slate-500 text-xs">{user.fund}</p>}
            <div className="mt-2">
              <Badge color={isInvestor ? "amber" : "green"}>
                {isInvestor ? "💼 Инвестор" : "🚀 Основатель"}
              </Badge>
            </div>
          </div>
        </div>
        {user.bio && <p className="text-slate-300 text-sm leading-relaxed">{user.bio}</p>}
      </div>

      {isInvestor ? (
        <>
          <div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Инвестиционный профиль</h3>
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-2.5">
              {[
                ["Секторы", user.sectors],
                ["Стадии", user.stages],
                ["Чек", user.ticket],
                ["География", user.geo],
              ].filter(([, v]) => v).map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-white text-right max-w-[55%]">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Metric label="Просмотрено" value="34" />
            <Metric label="Сохранено" value="8" />
            <Metric label="Запросы" value="3" />
          </div>
        </>
      ) : (
        <>
          {(user.startupName || user.sector) && (
            <div>
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Мой стартап</h3>
              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-2.5">
                {[
                  ["Проект", user.startupName],
                  ["Описание", user.tagline],
                  ["Сектор", user.sector],
                  ["Стадия", user.stage],
                  ["Привлечение", user.raise],
                ].filter(([, v]) => v).map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-white text-right max-w-[55%]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            <Metric label="Просмотры" value="0" sub="нет данных" />
            <Metric label="Запросы" value="0" />
            <Metric label="Привлечено" value="$0" />
          </div>
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
            <p className="text-blue-300 text-sm">💡 Заполните профиль, чтобы появиться в каталоге и получать запросы от инвесторов.</p>
          </div>
        </>
      )}

      <button
        onClick={onEdit}
        className="w-full py-3.5 rounded-2xl border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white transition-all text-sm font-medium active:scale-[0.98]"
      >
        ✏️ Редактировать профиль
      </button>
    </div>
  );
}

// ===================== CONTACT MODAL =====================
function ContactModal({ startup, onClose }) {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("Здравствуйте! Меня заинтересовал ваш проект. Хотел бы обсудить возможность инвестирования.");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-sm bg-slate-900 rounded-t-3xl p-6 border-t border-slate-700/50"
        onClick={e => e.stopPropagation()}
      >
        {!sent ? (
          <>
            <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-5" />
            <h3 className="text-white text-lg font-bold mb-1">Запрос контакта</h3>
            <p className="text-slate-400 text-sm mb-4">Сообщение основателю <span className="text-white">{startup.name}</span></p>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors resize-none mb-4"
              rows={4}
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 text-sm">Отмена</button>
              <button
                onClick={() => setSent(true)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold"
              >
                Отправить ✓
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-white font-bold text-lg mb-2">Запрос отправлен!</h3>
            <p className="text-slate-400 text-sm mb-6">Основатель {startup.name} получит ваше сообщение и свяжется с вами в течение 24 часов.</p>
            <button onClick={onClose} className="w-full py-3 rounded-xl bg-slate-800 text-white text-sm border border-slate-700">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("startups");
  const [startupSearch, setStartupSearch] = useState("");
  const [investorSearch, setInvestorSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("Все");
  const [stageFilter, setStageFilter] = useState("Все");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [contactTarget, setContactTarget] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredStartups = MOCK_STARTUPS.filter(s => {
    const q = startupSearch.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
    const matchSector = sectorFilter === "Все" || s.sector === sectorFilter || s.tags.includes(sectorFilter);
    const matchStage = stageFilter === "Все" || s.stage === stageFilter;
    return matchSearch && matchSector && matchStage;
  });

  const filteredInvestors = MOCK_INVESTORS.filter(inv => {
    const q = investorSearch.toLowerCase();
    return !q || inv.name.toLowerCase().includes(q) || inv.fund.toLowerCase().includes(q) ||
      inv.sectors.some(s => s.toLowerCase().includes(q));
  });

  if (!user) return <Onboarding onComplete={setUser} />;

  if (selectedStartup) return (
    <>
      <StartupDetail startup={selectedStartup} onBack={() => setSelectedStartup(null)} onContact={setContactTarget} />
      {contactTarget && <ContactModal startup={contactTarget} onClose={() => setContactTarget(null)} />}
    </>
  );

  if (selectedInvestor) return (
    <InvestorDetail investor={selectedInvestor} onBack={() => setSelectedInvestor(null)} />
  );

  const TABS = [
    { key: "startups", label: "Стартапы", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#64748b"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.29-1.5 3.5-1.5 3.5s2.21 0 3.5-1.5c.74-.82.74-2.17 0-3 0 0-1.18 0-2 1z"/><path d="M12 13c-1.94-2.03-2.07-5.27 0-7.5C14.07 7.73 13.94 10.97 12 13z"/><path d="M12 13c2.03-1.94 5.27-2.07 7.5 0-2.23 2.07-5.47 1.94-7.5 0z"/><path d="M12 13c-2.03-1.94-5.27-2.07-7.5 0 2.23 2.07 5.47 1.94 7.5 0z"/><path d="M12 13V21"/></svg> },
    { key: "investors", label: "Инвесторы", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#64748b"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { key: "analytics", label: "Аналитика", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#64748b"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> },
    { key: "profile", label: "Профиль", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#64748b"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24" style={{ maxWidth: "430px", margin: "0 auto", position: "relative" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              РынокСтартапов
            </h1>
            <p className="text-slate-500 text-xs">
              {tab === "startups" ? `${filteredStartups.length} стартапов` :
                tab === "investors" ? `${filteredInvestors.length} инвесторов` :
                  tab === "analytics" ? "Аналитика рынка" : "Мой профиль"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            {user.role === "investor" ? "💼" : "🚀"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* STARTUPS TAB */}
        {tab === "startups" && (
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                <input
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors"
                  placeholder="Поиск по имени, сектору, тегу..."
                  value={startupSearch}
                  onChange={e => setStartupSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2.5 rounded-xl border transition-colors text-sm ${showFilters ? "bg-blue-600/20 border-blue-500/40 text-blue-300" : "border-slate-700 text-slate-400"}`}
              >
                ⚙️
              </button>
            </div>

            {showFilters && (
              <div className="space-y-2 bg-slate-800/40 rounded-2xl p-3 border border-slate-700/30">
                <div>
                  <p className="text-slate-500 text-xs mb-1.5">Сектор</p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                    {SECTORS.map(s => (
                      <button key={s} onClick={() => setSectorFilter(s)}
                        className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap border transition-colors ${sectorFilter === s ? "bg-blue-600/30 border-blue-500/50 text-blue-300" : "border-slate-700 text-slate-400"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1.5">Стадия</p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                    {STAGES.map(s => (
                      <button key={s} onClick={() => setStageFilter(s)}
                        className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap border transition-colors ${stageFilter === s ? "bg-purple-600/30 border-purple-500/50 text-purple-300" : "border-slate-700 text-slate-400"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {filteredStartups.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-medium">Стартапы не найдены</p>
                <p className="text-xs mt-1">Попробуйте другие фильтры</p>
              </div>
            ) : (
              filteredStartups.map(s => <StartupCard key={s.id} startup={s} onClick={setSelectedStartup} />)
            )}
          </div>
        )}

        {/* INVESTORS TAB */}
        {tab === "investors" && (
          <div className="p-4 space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors"
                placeholder="Поиск по имени, фонду, сектору..."
                value={investorSearch}
                onChange={e => setInvestorSearch(e.target.value)}
              />
            </div>
            {filteredInvestors.map(inv => <InvestorCard key={inv.id} investor={inv} onClick={setSelectedInvestor} />)}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === "analytics" && <Analytics />}

        {/* PROFILE TAB */}
        {tab === "profile" && <Profile user={user} onEdit={() => setUser(null)} />}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 4px)" }}>
        <div style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(148,163,184,0.15)",
          padding: "8px 4px 6px",
          maxWidth: "430px",
          margin: "0 auto"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {TABS.map(item => {
              const active = tab === item.key;
              return (
                <button key={item.key} onClick={() => setTab(item.key)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: "3px", padding: "6px 2px", background: "none", border: "none", cursor: "pointer",
                    WebkitTapHighlightColor: "transparent"
                  }}>
                  {item.icon(active)}
                  <span style={{
                    fontSize: "10px",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#c7d2fe" : "#64748b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%"
                  }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {contactTarget && <ContactModal startup={contactTarget} onClose={() => setContactTarget(null)} />}
    </div>
  );
}
