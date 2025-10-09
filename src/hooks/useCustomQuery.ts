import { BASE_URL } from "@/constants";
import { fetcher } from "@/services/api/fetcher";
import { offlineFetcher } from "@/services/api/offlineFetcher";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

type CachePolicy = "local" | "network";

interface useCustomQueryProps<TData = any, TError = Error>
  extends Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn" | "networkMode"
  > {
  /** Unique query key (React Query key) */
  queryKey: QueryKey;

  /** Relative URL endpoint, tanpa BASE_URL */
  queryUrl: string;

  /** Cache strategy: 'local' pakai Dexie (offline-first), default: 'network' */
  cachePolicy?: CachePolicy;

  /** TTL cache dalam milidetik (hanya untuk local-first) */
  ttl?: number;
}

/**
 * 🧠 Custom useQuery wrapper
 * - cachePolicy: 'local' → pakai Dexie (offline-first)
 * - cachePolicy: 'network' → fetch langsung ke server
 * - ttl: waktu simpan cache di IndexedDB (default 2 menit)
 */
export function useCustomQuery<TData = any, TError = Error>({
  queryKey,
  queryUrl,
  cachePolicy = "local",
  ttl,
  ...options
}: useCustomQueryProps<TData, TError>) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      console.log("cachePolicy :", cachePolicy);
      if (cachePolicy === "local") {
        // Offline-first (Dexie)
        console.log("Offline-first (Dexie)");
        return offlineFetcher<TData>(queryUrl, {
          ttl,
        });
      } else {
        // Network-only
        return fetcher(queryUrl, ttl);
      }
    },
    networkMode: "offlineFirst",
    ...options,
  });
}
