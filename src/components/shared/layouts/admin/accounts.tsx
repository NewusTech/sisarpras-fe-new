import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccounts } from "@/hooks/useAccounts";
import { Cog } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Accounts() {
  const { accounts, switchAccount, activeAccountId } = useAccounts();

  const router = useRouter();

  const handleManageAccount = () => {
    router.replace("/manage-account");
  };

  return (
    <Select
      value={String(activeAccountId ?? "")}
      onValueChange={(val) => switchAccount(val)}
    >
      <SelectTrigger className="border-none [&_svg]:hidden !py-6">
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Select a user" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((user) => (
          <SelectItem
            key={user.id}
            value={String(user.id)}
            className="[&>:first-child]:hidden !pr-2 justify-end"
          >
            <div className="flex gap-x-4 justify-end w-auto">
              <div className="font-semibold text-end">
                <p className="line-clamp-1 tru">{user?.name ?? "User"}</p>
                <p className="font-normal text-sm">
                  {user?.role ?? "Villager"}
                </p>
              </div>
              <Avatar>
                <AvatarImage
                  src={user?.avatar ?? "https://github.com/shadcn.png"}
                  className="object-cover"
                />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </div>
          </SelectItem>
        ))}
        <SelectSeparator />
        <Button
          variant={"ghost"}
          className="w-full"
          onClick={handleManageAccount}
        >
          <Cog />
          Kelola Akun
        </Button>
      </SelectContent>
    </Select>
  );
}
