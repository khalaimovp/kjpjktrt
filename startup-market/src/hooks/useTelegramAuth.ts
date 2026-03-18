import { useState, useEffect } from "react";

interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

interface AuthState {
  user: TelegramUser | null;
  loading: boolean;
  error: string | null;
}

/**
 * Validates Telegram initData against the backend.
 * Falls back to initDataUnsafe for local development.
 */
export function useTelegramAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // Not in Telegram context — skip auth
    if (!tg?.initData) {
      setState({ user: null, loading: false, error: null });
      return;
    }

    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => {
        setState({ user: data.user, loading: false, error: null });
      })
      .catch((err) => {
        console.warn("Telegram auth failed, using unsafe data:", err.message);
        // Fallback to unverified data for development
        const unsafe = tg.initDataUnsafe?.user;
        setState({
          user: unsafe
            ? {
                id: unsafe.id,
                firstName: unsafe.first_name,
                lastName: unsafe.last_name,
                username: unsafe.username,
                photoUrl: unsafe.photo_url,
              }
            : null,
          loading: false,
          error: "Unverified",
        });
      });
  }, []);

  return state;
}
