import { useState, type ChangeEvent } from "react";
import type { UserData } from "../types";

/* ------------------------------------------------------------------ */
/*  Field definitions per role                                        */
/* ------------------------------------------------------------------ */

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
}

const investorFields: FieldDef[] = [
  { key: "name",    label: "Как вас зовут?",          placeholder: "Имя Фамилия",                  type: "text"     },
  { key: "title",   label: "Должность / роль",        placeholder: "Managing Partner, Angel и т.д.", type: "text"     },
  { key: "fund",    label: "Название фонда",           placeholder: "Название фонда или «Частный инвестор»", type: "text" },
  { key: "bio",     label: "О себе",                   placeholder: "Расскажите коротко о вашем опыте и интересах…", type: "textarea" },
  { key: "sectors", label: "Интересные секторы",       placeholder: "FinTech, AI, HealthTech…",     type: "text"     },
  { key: "stages",  label: "Стадии инвестирования",    placeholder: "Pre-seed, Seed, Series A…",    type: "text"     },
  { key: "ticket",  label: "Размер чека",              placeholder: "$50K – $500K",                 type: "text"     },
  { key: "geo",     label: "География",                placeholder: "Россия, СНГ, Глобально…",     type: "text"     },
];

const startupFields: FieldDef[] = [
  { key: "name",        label: "Как вас зовут?",          placeholder: "Имя Фамилия",                  type: "text"     },
  { key: "title",       label: "Роль в стартапе",         placeholder: "CEO, CTO, Co-founder…",        type: "text"     },
  { key: "startupName", label: "Название стартапа",       placeholder: "Название вашего проекта",       type: "text"     },
  { key: "tagline",     label: "Краткое описание",        placeholder: "Одно предложение о продукте",  type: "text"     },
  { key: "sector",      label: "Сектор",                  placeholder: "FinTech, EdTech, SaaS…",       type: "text"     },
  { key: "stage",       label: "Стадия",                  placeholder: "Idea, MVP, Seed, Series A…",   type: "text"     },
  { key: "raise",       label: "Сколько привлекаете?",    placeholder: "$100K – $2M",                  type: "text"     },
  { key: "bio",         label: "О проекте",               placeholder: "Расскажите подробнее о стартапе, метриках и команде…", type: "textarea" },
];

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG helpers)                                        */
/* ------------------------------------------------------------------ */

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InvestorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 11H25" stroke="currentColor" strokeWidth="1.8" />
      <rect x="6" y="15" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function StartupIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L14 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 3C14 3 20 8 20 14C20 20 14 25 14 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 3C14 3 8 8 8 14C8 20 14 25 14 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 10H23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 18H24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Aurora background (shared between steps)                          */
/* ------------------------------------------------------------------ */

function AuroraBackground() {
  return (
    <>
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/15 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 0 -- Role Selection                                           */
/* ------------------------------------------------------------------ */

type Role = "investor" | "startup";

interface RoleSelectionProps {
  onSelect: (role: Role) => void;
}

function RoleSelection({ onSelect }: RoleSelectionProps) {
  return (
    <div className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 overflow-hidden">
      <img src="/images/bg/onboarding.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none" />
      <AuroraBackground />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-fade-slide">
        {/* Logo */}
        <h1 className="font-heading font-extrabold text-3xl tracking-tight gradient-text mb-2 select-none">
          РынокСтартапов
        </h1>

        <p className="text-zinc-400 text-sm text-center mb-10 leading-relaxed">
          Платформа, где стартапы встречаются<br />с инвесторами
        </p>

        {/* Role cards */}
        <div className="w-full flex flex-col gap-3">
          {/* Investor */}
          <button
            type="button"
            onClick={() => onSelect("investor")}
            className="group w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5
                       flex items-center gap-4 text-left
                       transition-all duration-200
                       hover:bg-white/[0.08] hover:border-white/15
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            aria-label="Я инвестор"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20
                             flex items-center justify-center text-indigo-400 transition-colors
                             group-hover:bg-indigo-500/15 group-hover:border-indigo-500/30">
              <InvestorIcon />
            </span>

            <span className="flex-1 min-w-0">
              <span className="block font-heading font-bold text-white text-base tracking-tight">
                Инвестор
              </span>
              <span className="block text-zinc-400 text-xs mt-0.5 leading-snug">
                Ищу проекты для инвестиций
              </span>
            </span>

            <span className="flex-shrink-0 text-zinc-600 transition-colors group-hover:text-indigo-400">
              <ChevronRight />
            </span>
          </button>

          {/* Startup */}
          <button
            type="button"
            onClick={() => onSelect("startup")}
            className="group w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5
                       flex items-center gap-4 text-left
                       transition-all duration-200
                       hover:bg-white/[0.08] hover:border-white/15
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
            aria-label="Я стартап"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20
                             flex items-center justify-center text-cyan-400 transition-colors
                             group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30">
              <StartupIcon />
            </span>

            <span className="flex-1 min-w-0">
              <span className="block font-heading font-bold text-white text-base tracking-tight">
                Стартап
              </span>
              <span className="block text-zinc-400 text-xs mt-0.5 leading-snug">
                Привлекаю инвестиции в проект
              </span>
            </span>

            <span className="flex-shrink-0 text-zinc-600 transition-colors group-hover:text-cyan-400">
              <ChevronRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Steps 1-8 -- Form Fields                                          */
/* ------------------------------------------------------------------ */

interface FormStepsProps {
  role: Role;
  onComplete: (userData: UserData) => void;
  onBack: () => void;
}

function FormSteps({ role, onComplete, onBack }: FormStepsProps) {
  const fields = role === "investor" ? investorFields : startupFields;
  const totalSteps = fields.length;
  const roleLabel = role === "investor" ? "Регистрация инвестора" : "Регистрация основателя";

  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});
  // Key that forces remount of the animated wrapper on each step transition
  const [animKey, setAnimKey] = useState(0);

  const field = fields[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const value = form[field.key] || "";

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [field.key]: e.target.value }));
  }

  function goNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      setAnimKey((k) => k + 1);
    } else {
      onComplete({ role, ...form } as UserData);
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setAnimKey((k) => k + 1);
    } else {
      onBack();
    }
  }

  function handleSkip() {
    goNext();
  }

  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="relative min-h-screen bg-zinc-950 flex flex-col px-6 pt-5 pb-8 overflow-hidden">
      <AuroraBackground />

      {/* Header: back + progress + counter */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                       text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.08]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            aria-label="Назад"
          >
            <ChevronLeft />
          </button>

          <span className="text-zinc-500 text-xs font-medium tabular-nums">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        </div>
      </div>

      {/* Field content -- animated per step */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex-1 flex flex-col" key={animKey}>
        <div className="animate-fade-slide flex flex-col flex-1">
          {/* Subtitle */}
          <p className="text-zinc-500 text-xs font-medium mb-1.5 tracking-wide uppercase">
            {roleLabel}
          </p>

          {/* Label */}
          <h2 className="font-heading font-extrabold text-2xl tracking-tight text-white mb-6">
            {field.label}
          </h2>

          {/* Input / Textarea */}
          {field.type === "textarea" ? (
            <textarea
              id={`onboarding-field-${field.key}`}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={5}
              maxLength={2000}
              aria-label={field.label}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4
                         text-white text-sm leading-relaxed placeholder-zinc-500
                         focus:border-indigo-400/50 focus:outline-none
                         backdrop-blur-sm resize-none
                         transition-colors duration-200"
            />
          ) : (
            <input
              id={`onboarding-field-${field.key}`}
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              maxLength={200}
              aria-label={field.label}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4
                         text-white text-sm placeholder-zinc-500
                         focus:border-indigo-400/50 focus:outline-none
                         backdrop-blur-sm
                         transition-colors duration-200"
              autoFocus
            />
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA button */}
          <button
            type="button"
            onClick={goNext}
            className="w-full bg-white text-zinc-900 font-bold text-sm rounded-2xl py-3.5
                       transition-all duration-200
                       hover:bg-zinc-100 active:scale-[0.98]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {isLast ? "Завершить" : "Продолжить"}
          </button>

          {/* Skip */}
          {!isLast && (
            <button
              type="button"
              onClick={handleSkip}
              className="w-full text-center text-zinc-500 text-xs mt-3 py-2
                         transition-colors hover:text-zinc-400
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40"
            >
              Пропустить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Onboarding Orchestrator                                      */
/* ------------------------------------------------------------------ */

interface OnboardingProps {
  onComplete: (userData: UserData) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);   // 0 = role selection, 1 = form steps
  const [role, setRole] = useState<Role | null>(null);

  function handleRoleSelect(selectedRole: Role) {
    setRole(selectedRole);
    setStep(1);
  }

  function handleBackToRole() {
    setStep(0);
    setRole(null);
  }

  function handleFormComplete(userData: UserData) {
    onComplete(userData);
  }

  if (step === 0) {
    return <RoleSelection onSelect={handleRoleSelect} />;
  }

  return (
    <FormSteps
      role={role!}
      onComplete={handleFormComplete}
      onBack={handleBackToRole}
    />
  );
}
