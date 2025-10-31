"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Accounts from "./accounts";
import NotificationMenu from "./notificationMenu";
import { useGetProfile } from "@/components/parts/users/api";

export default function NavMenu() {
  const { data } = useGetProfile();
  const user = data?.data;
  return (
    <div className="ml-auto flex items-center gap-x-3 md:gap-x-6">
      <NotificationMenu />
      {/* <ModeToggle /> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-4 text-sm md:text-base">
          <div className="font-semibold text-end hidden sm:block">
            <p className="line-clamp-1">{user?.name ?? "User"}</p>
            <p className="font-normal text-sm line-clamp-1">
              {user?.role?.name ?? "Villager"}
            </p>
          </div>
          <Avatar>
            <AvatarImage
              src={user?.photos ?? "https://github.com/shadcn.png"}
              className="object-cover"
            />
            <AvatarFallback>{user?.name.slice(2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[20svh] mt-3">
          <Accounts />
          <DropdownMenuSeparator />
          <Link href={`/profile`}>
            <DropdownMenuItem>Profil</DropdownMenuItem>
          </Link>
          <Link href={`/log-activity`}>
            <DropdownMenuItem>Log Aktivitas</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
