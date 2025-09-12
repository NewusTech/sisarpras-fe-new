import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import ModalDelete from "../shared/modalDelete";
import { Button } from "../ui/button";

type actionOptionPops = {
  linkView?: string;
  linkUpdate?: string;
  archiveId?: string;
  linkDelete?: string;
  queryKey?: string[];
  other?: React.ReactNode;
};

export default function ActionOption({
  linkDelete,
  linkUpdate,
  archiveId,
  linkView,
  queryKey,
  other,
}: actionOptionPops) {
  return (
    <div className="flex w-full">
      {linkView && (
        <Link href={linkView}>
          <Button size={"icon"} variant={"ghost"}>
            <Eye className="text-info-500 !stroke-[3]" />
          </Button>
        </Link>
      )}
      {linkUpdate && (
        <Link href={linkUpdate}>
          <Button size={"icon"} variant={"ghost"}>
            <Edit className="text-text-900 !stroke-[3]" />
          </Button>
        </Link>
      )}
      {/* {archiveId && can("write:Arsip") && (
        <Link href={`?archiveId=${archiveId}`}>
          <Button size={"icon"} variant={"ghost"}>
            <Archive className="text-secondary-700 !stroke-[3]" />
          </Button>
        </Link>
      )} */}
      {other}
      {linkDelete && queryKey && (
        <ModalDelete endpoint={linkDelete} queryKey={queryKey} />
      )}
    </div>
  );
}
