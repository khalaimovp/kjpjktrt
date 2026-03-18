/**
 * Vercel Serverless Function: /api/auth
 *
 * Validates Telegram WebApp initData using HMAC-SHA256.
 * Returns user info if valid.
 *
 * Environment variable required:
 *   BOT_TOKEN — Telegram bot token (from @BotFather)
 *
 * Portable: this same logic works in Express, Fastify, or any Node.js server.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

function validateInitData(initData: string, botToken: string): TelegramUser | null {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;

  // Remove hash from params and sort alphabetically
  params.delete("hash");
  const entries = Array.from(params.entries()).sort(([a], [b]) => a.localeCompare(b));
  const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join("\n");

  // HMAC chain: secret = HMAC-SHA256("WebAppData", bot_token)
  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

  // Constant-time comparison to prevent timing attacks
  if (!crypto.timingSafeEqual(Buffer.from(calculatedHash, "hex"), Buffer.from(hash, "hex"))) {
    return null;
  }

  // Check auth_date freshness (reject if older than 1 hour)
  const authDate = parseInt(params.get("auth_date") || "0", 10);
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 3600) {
    return null;
  }

  // Parse user
  const userStr = params.get("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as TelegramUser;
  } catch {
    return null;
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    console.error("BOT_TOKEN environment variable is not set");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const { initData } = req.body || {};
  if (!initData || typeof initData !== "string") {
    return res.status(400).json({ error: "Missing initData" });
  }

  const user = validateInitData(initData, botToken);
  if (!user) {
    return res.status(401).json({ error: "Invalid or expired initData" });
  }

  // Valid! Return user info.
  // In production, generate a JWT or session token here.
  return res.status(200).json({
    ok: true,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      photoUrl: user.photo_url,
    },
  });
}
