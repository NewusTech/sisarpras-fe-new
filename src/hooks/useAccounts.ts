// src/hooks/useAccounts.ts
import { queryClient } from "@/app/QueryProvider";
import { BASE_URL } from "@/constants";
import { Account, accountDB } from "@/db/accountDB";
import { differenceInSeconds } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAccounts() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);

  // 🌀 Tambahkan loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  // 🔄 Load data awal dari IndexedDB
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await accountDB.accounts.toArray();
        setAccounts(data);

        const storedActiveId = localStorage.getItem("activeAccountId");
        if (storedActiveId) {
          const acc = await accountDB.accounts.get(storedActiveId);
          setActiveAccount(acc ?? null);
          setActiveAccountId(storedActiveId);
        }
      } catch (err) {
        console.error("Failed to load accounts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // 🔁 Switch account
  const switchAccount = async (id: string) => {
    setIsSwitching(true);
    try {
      const acc = await accountDB.accounts.get(id);
      const decode = acc && acc.token ? jwtDecode(acc.token) : undefined;
      const isExpired = decode
        ? differenceInSeconds(new Date(), new Date(Number(decode.exp))) < 0
        : false;

      if (acc && !acc.token && !isExpired) {
        Cookies.remove("accessToken");
        if (acc.type === "GOOGLE") {
          router.push(`${BASE_URL}/auth/google`);
        } else {
          router.push(
            `login?email=${acc?.email}&${acc.encrypt ? `encrypt=${acc.encrypt}` : ""}&type=re-login`
          );
        }
        return;
      }
      localStorage.setItem("activeAccountId", id);
      setActiveAccount(acc ?? null);
      setActiveAccountId(id);

      // Simpan token baru ke cookies
      Cookies.set("accessToken", String(acc?.token));

      // Invalidasi query supaya data user refresh
      queryClient.invalidateQueries({ queryKey: ["useGetUserDetail"] });

      // Emit event supaya tab lain ikut update
      window.dispatchEvent(new Event("account-switched"));

      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to switch account:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  // ➕ Add new account
  const addAccount = async (account: Account) => {
    setIsLoading(true);
    try {
      await accountDB.accounts.put(account);
      setAccounts(await accountDB.accounts.toArray());
    } finally {
      setIsLoading(false);
    }
  };

  // ❌ Remove account
  const removeAccount = async (id: string) => {
    setIsLoading(true);
    try {
      await accountDB.accounts.delete(id);
      setAccounts(await accountDB.accounts.toArray());
      if (id === activeAccountId) {
        localStorage.removeItem("activeAccountId");
        setActiveAccount(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🔄 Sync antar tab (account-switched event & localStorage update)
  useEffect(() => {
    const handler = async () => {
      const id = localStorage.getItem("activeAccountId");
      const acc = id ? ((await accountDB.accounts.get(id)) ?? null) : null;
      setActiveAccount(acc);
      setActiveAccountId(id);
    };
    window.addEventListener("account-switched", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("account-switched", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    accounts,
    activeAccount,
    activeAccountId,
    isLoading,
    isSwitching,
    switchAccount,
    addAccount,
    removeAccount,
  };
}
