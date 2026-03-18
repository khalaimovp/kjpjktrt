import { useState, useEffect, useRef, useCallback, type KeyboardEvent } from "react";
import type { Startup } from "../types";

interface ContactModalProps {
  startup: Startup;
  onClose: () => void;
}

export default function ContactModal({ startup, onClose }: ContactModalProps) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
  };

  // Save previous focus and focus modal on mount; restore on unmount
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    modalRef.current?.focus();
    return () => {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    };
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full bg-zinc-900/95 backdrop-blur-xl rounded-t-3xl p-6 border-t border-white/10 animate-slide-up outline-none"
        style={{ maxWidth: "430px" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center mb-5">
          <div className="w-10 h-1 rounded-full bg-white/20" aria-hidden="true" />
        </div>

        {!sent ? (
          /* ===== Form State ===== */
          <div className="flex flex-col gap-4">
            <div>
              <h2
                id="contact-modal-title"
                className="font-heading text-lg font-extrabold tracking-tight text-white"
              >
                Связаться с основателем
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Отправьте сообщение основателю{" "}
                <span className="text-white font-medium">{startup?.name}</span>
              </p>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Представьтесь и опишите, чем вас заинтересовал проект..."
              rows={4}
              maxLength={2000}
              aria-label="Сообщение основателю"
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-zinc-500 resize-none focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex-1 py-3.5 rounded-2xl bg-white text-zinc-900 font-bold text-sm active:scale-[0.98] transition-all disabled:opacity-40 disabled:active:scale-100"
              >
                Отправить
              </button>
              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold text-sm active:scale-[0.98] transition-transform"
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          /* ===== Success State ===== */
          <div role="status" aria-live="polite" className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div>
              <h2 className="font-heading text-lg font-extrabold tracking-tight text-white">
                Сообщение отправлено
              </h2>
              <p className="text-zinc-400 text-sm mt-1.5 max-w-[260px]">
                Основатель {startup?.name} получит ваш запрос и свяжется с вами в ближайшее время
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold text-sm active:scale-[0.98] transition-transform mt-2"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
