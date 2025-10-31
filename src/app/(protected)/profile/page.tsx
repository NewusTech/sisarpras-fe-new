"use client";

import EditIcon from "@/assets/icons/editIcon";
import { useGetProfile } from "@/components/parts/users/api";
import CardHeader from "@/components/sections/cardHeader";
import FormFotoProfile from "@/components/sections/profile/formFotoProfile";
import FormProfile from "@/components/sections/profile/formProfile";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProfileStore } from "@/store/formProfileStore";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

export default function Page() {
  const { edit, closeEdit, openEdit } = FormProfileStore();
  const { data } = useGetProfile();
  const user = data?.data;
  const handleChangeEdit = () => {
    if (edit) {
      closeEdit();
    } else {
      openEdit();
    }
  };
  return (
    <main>
      <BreadcrumbSetItem
        items={[
          {
            title: "Profil",
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader title="Profile">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleChangeEdit}
          >
            <EditIcon /> Edit
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 mt-6">
          <div className="flex gap-6">
            <FormFotoProfile />
            <div>
              <p className="font-semibold text-2xl ">{user?.name ?? "User"}</p>
              <p className="">{user?.employee.position ?? "Pegawai"}</p>
            </div>
            <div>
              <Badge variant="secondary">{user?.role.name}</Badge>
            </div>
          </div>
          <h1 className="font-normal text-lg">Detail Informasi</h1>
          <FormProfile />
        </CardContent>
      </Card>
    </main>
  );
}
