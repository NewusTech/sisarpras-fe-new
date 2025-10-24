"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  link: string;
}
const LinkButton = (props: Props) => {
  return (
    <Link href={props.link ?? "/-"} className="flex-grow">
      <Button className="rounded-full w-fit">
        <Plus />
        <span className="hidden sm:inline-flex">{props.title ?? "Tambah"}</span>
        <span className="inline-flex sm:hidden">Tambah</span>
      </Button>
    </Link>
  );
};

export default LinkButton;
