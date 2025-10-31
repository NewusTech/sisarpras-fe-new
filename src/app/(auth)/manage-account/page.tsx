"use client";

import { useLogoutMutation } from "@/components/parts/login/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Account } from "@/db/accountDB";
import { useAccounts } from "@/hooks/useAccounts";
import { myAlert } from "@/lib/myAlert";
import { formatDateHuman } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { KeyRoundIcon, Loader, LogOut, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import GoogleIcon from "@/assets/Logo/GoogleIcon";

export default function Page() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const {
    accounts,
    activeAccountId,
    isLoading,
    switchAccount,
    addAccount,
    removeAccount,
  } = useAccounts();

  const handleSelectAccount = (account: Account) => {
    console.log(account);
    switchAccount(account.id);
    router.push(`/dashboard`);
  };

  const handleLogoutAll = () => {
    myAlert
      .confirm("Logout", "Yakin ingin keluar dari semua akun", "Logoout")
      .then(async (res) => {
        if (res) {
          accounts.map(async (acc) => {
            await switchAccount(acc.id);
            logoutMutation.mutate(undefined);
            addAccount({ ...acc, token: "" });
          });
          Cookies.remove("accessToken");
          localStorage.removeItem("activeAccountId");
        }
      });
  };

  const handleAddNewAccount = () => {
    Cookies.remove("accessToken");
    router.push(`/login?type=new-login`);
  };

  const handleDeleteAccount = (account: Account) => {
    myAlert
      .confirm("Hapus", "Yakin ingin Menghapus dari akses cepat?", "Iya")
      .then(async (res) => {
        if (res) {
          removeAccount(account.id);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pilih Akun
          </h1>
          <p className="text-muted-foreground">
            Pilih akun yang ingin Anda gunakan
          </p>
        </div>
        <div className="space-y-3 mb-6">
          {isLoading ? (
            <div className="w-full h-60 flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : accounts.length > 0 ? (
            accounts.map((account) => {
              const decode = account.token
                ? jwtDecode(account.token)
                : undefined;
              return (
                <Card
                  key={account.id}
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => {
                    handleSelectAccount(account);
                  }}
                >
                  <div className="flex items-center gap-5 relative">
                    {account.id === activeAccountId ? (
                      <div className="bg-green-500 w-3 h-3 rounded-full absolute top-0 right-0 animate-pulse" />
                    ) : (
                      <Button
                        className="rounded-full absolute -top-6 -right-6 w-5 h-4"
                        variant={"destructive"}
                        size={"icon"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAccount(account);
                        }}
                      >
                        <X />
                      </Button>
                    )}
                    <Avatar>
                      <AvatarImage
                        src={account?.avatar ?? "https://github.com/shadcn.png"}
                        className="object-cover"
                      />
                      <AvatarFallback>{account?.name}</AvatarFallback>
                    </Avatar>
                    <div className="mr-auto">
                      <p className="font-semibold text-foreground">
                        {account.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {account.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Login terakhir: {formatDateHuman(account.lastUsed)}
                      </p>
                      <div className="flex gap-2">
                        {decode &&
                          differenceInSeconds(
                            new Date(),
                            new Date(Number(decode.exp))
                          ) < 0 && (
                            <Badge className="rounded-full mt-2 bg-yellow-500">
                              Expired
                            </Badge>
                          )}
                        {!account.token && (
                          <Badge className="rounded-full mt-2 bg-red-500">
                            Keluar
                          </Badge>
                        )}
                        {account.encrypt && (
                          <Badge className="rounded-full mt-2 bg-sky-500 gap-2">
                            <KeyRoundIcon className="w-3 h-3" /> Password
                            tersimpan
                          </Badge>
                        )}
                        {account.type === "GOOGLE" && <GoogleIcon />}
                      </div>
                    </div>
                    <div className="text-muted-foreground">→</div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Tidak ada akun yang tersimpan
              </p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Button
            onClick={handleAddNewAccount}
            className="w-full rounded-full"
            variant="default"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Akun Baru
          </Button>

          {accounts.length > 0 && (
            <Button
              onClick={handleLogoutAll}
              variant="outline"
              className="w-full rounded-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout Semua Akun
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
