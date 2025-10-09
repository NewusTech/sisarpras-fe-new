"use client";

import NotificationIcon from "@/assets/icons/notificationIcon";
import { useGetNotificationCount } from "@/components/parts/notification/api";
import AnimatedNumber from "@/components/shared/animateNumber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotificationMenu() {
  const { data } = useGetNotificationCount();
  const count = data?.data.totalUnRead;
  return (
    <Link href={`/notification`}>
      <Button
        variant={"ghost"}
        className="relative !p-0 hover:bg-transparent group"
      >
        <NotificationIcon className="!size-5 md:!size-7 group-hover:rotate-5" />
        {count && count > 0 ? (
          <Badge className="absolute top-0 right-0 rounded-full !aspect-square !text-[0.4rem] md:!text-[0.6rem] size-4 md:size-5 p-0 items-center justify-center bg-red-500 hover:bg-red-600 !border-1 !border-red-200 !font-mono font-thin">
            <AnimatedNumber value={count ?? 0} />
          </Badge>
        ) : undefined}
      </Button>
    </Link>
  );
}
