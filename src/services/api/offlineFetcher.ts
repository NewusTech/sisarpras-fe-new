import { queryClient } from "@/app/QueryProvider";
import { BASE_URL } from "@/constants";
import { db } from "@/db/db";
import Cookies from "js-cookie";

interface OfflineFetcherInit extends RequestInit {
  ttl?: number; // TTL dalam milidetik
  queryKey?: any[];
  parseJson?: boolean; // default true
  headers?: Record<string, string>;
}

const defaultTtl = 1000 * 60 * 2; // 2 menit

/**
 * Local-first (stale-while-revalidate) fetcher.
 * Selalu return cache dulu (kalau ada), lalu update di background.
 */
export async function offlineFetcher<T = any>(
  url: string,
  init?: OfflineFetcherInit
): Promise<T> {
  const cacheKey = url;
  const ttl = init?.ttl ?? defaultTtl;
  const token = Cookies.get("accessToken");

  // =========================================================
  // STEP 1 — Ambil cache dulu agar UI cepat render
  // =========================================================
  const cached = await db.cache.get(cacheKey);
  if (cached) {
    console.log("📦 [OfflineFetcher] return cached:", cacheKey);

    // =========================================================
    // STEP 2 — Lakukan background fetch untuk update cache
    // =========================================================
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/${url}`, {
          ...init,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
          },
        });

        if (!res.ok) throw new Error(`Network error ${res.status}`);

        const data = init?.parseJson === false ? res : await res.json();

        // ✅ Simpan ke IndexedDB
        await db.cache.put({
          key: cacheKey,
          data,
          updatedAt: new Date(),
          expiresAt: new Date(Date.now() + ttl),
        });

        console.log("🔄 [OfflineFetcher] cache updated:", cacheKey);

        // ✅ Update TanStack Query cache → UI auto rerender
        if (init?.queryKey) {
          queryClient.setQueryData(init.queryKey, data);
          console.log(
            "🌀 [OfflineFetcher] React Query updated:",
            init.queryKey
          );
        }

        // ✅ Trigger custom event (opsional listener di UI)
        window.dispatchEvent(
          new CustomEvent("cache-updated", { detail: { key: cacheKey, data } })
        );
      } catch (err) {
        console.warn("⚠️ [OfflineFetcher] background fetch failed:", err);
      }
    })();

    // return cache langsung untuk UI
    return cached.data as T;
  }

  // =========================================================
  // STEP 3 — Kalau belum ada cache, fetch langsung
  // =========================================================
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

    if (!res.ok) throw new Error(`Network error ${res.status}`);
    const data = init?.parseJson === false ? res : await res.json();

    // 💾 Simpan ke IndexedDB
    await db.cache.put({
      key: cacheKey,
      data,
      updatedAt: new Date(),
      expiresAt: new Date(Date.now() + ttl),
    });
    console.log("✅ [OfflineFetcher] fresh data saved:", cacheKey);

    return data;
  } catch (err) {
    console.error("❌ [OfflineFetcher] fetch failed:", cacheKey);
    throw new Error("No network and no cache available");
  }
}

export async function cleanExpiredCache() {
  const now = Date.now();
  await db.cache.where("expiresAt").below(new Date(now)).delete();
  console.log("[CacheCleaner] 🧹 expired cache cleared");
}

// listener auto sync kalau online lagi
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    // console.log("🔄 Online detected, syncing outbox...");
    console.log("🔄 Online detected, cleanExpiredCache...");
    cleanExpiredCache();
  });
  window.addEventListener("load", () => {
    cleanExpiredCache();
  });
}
