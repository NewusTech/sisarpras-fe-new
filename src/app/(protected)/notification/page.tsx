"use client";

import { Filter } from "@/components/filters";
import {
  useGetNotification,
  useReadNotificationMutation,
} from "@/components/parts/notification/api";
import CardHeader from "@/components/sections/cardHeader";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { generateLinkNotification } from "@/components/shared/notification";
import Pagination from "@/components/table/pagination";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

const filterTab = [
  { title: "Semua", value: "" },
  { title: "Dibaca", value: "true" },
  { title: "Belum Dibaca", value: "false" },
];

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const qc = useQueryClient();

  const isMobile = useIsMobile();

  const readNotifMutation = useReadNotificationMutation();
  const { data } = useGetNotification(params.toString());
  const notificationData = data?.data;

  const handleRead = (id?: number) => {
    readNotifMutation.mutate(
      { id },
      {
        onSuccess: () => {
          qc.invalidateQueries({
            queryKey: ["useGetNotification"],
          });
          qc.invalidateQueries({
            queryKey: ["useGetNotificationCount"],
          });
        },
      }
    );
  };

  const handleTo = (refId: number, type: notificationType) => {
    const link = generateLinkNotification(refId, type);
    if (link) router.push(link);
  };

  return (
    <main>
      <BreadcrumbSetItem
        items={[
          {
            title: "Notifikasi",
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader title="Notifikasi" />
        <Filter initialValues={{ readStatus: "" }}>
          {({ setValue, values }) => (
            <Tabs
              defaultValue=""
              value={values.readStatus}
              onValueChange={(val) => setValue("readStatus", val)}
            >
              <TabsList className="bg-transparent gap-x-3">
                {filterTab.map((f, i) => (
                  <TabsTrigger
                    key={i}
                    value={f.value}
                    className={cn(
                      "rounded-full !border border-primary text-primary",
                      "data-[state=active]:bg-primary data-[state=active]:text-white text-sm hover:bg-accent"
                    )}
                  >
                    {f.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </Filter>
        {/* <CardHeader className="flex flex-row gap-x-6 mt-4 items-center justify-between overflow-x-scroll">
          

          <Button variant={"link"} onClick={() => handleRead()}>
            Tandai dibaca semua
          </Button>
        </CardHeader> */}
        <Separator className="w-auto" />
        {notificationData?.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "min-h-20 border-b flex gap-x-10 items-center cursor-pointer",
              {
                "bg-gray-200/30": !item.readStatus,
              }
            )}
            onClick={() => {
              handleRead(item.id);
              handleTo(Number(item.refId), item.type as any);
            }}
          >
            <p className="flex-1">{item.message}</p>
            <p className="flex-shrink-0">
              {format(item.deliveredAt, "dd MMMM yyyy hh:mm")}
            </p>
          </div>
        ))}
        {/*  */}
        <Pagination
          currentPage={notificationData?.current_page ?? 1}
          itemsPerPage={notificationData?.items_per_page ?? 10}
          totalItems={notificationData?.total_items ?? 0}
          totalPages={notificationData?.total_pages ?? 1}
          displayItems={!isMobile}
        />
      </Card>
    </main>
  );
}
