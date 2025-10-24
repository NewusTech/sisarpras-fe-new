import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const ModalImage = ({
  id,
  src,
  width = 200,
  height = 200,
  className,
}: {
  id?: string | number;
  src: string | undefined;
  width?: number;
  height?: number;
  className?: string;
}) => {
  const name = src?.split("/").pop() || `Image-${id ?? "no-id"}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          width={width}
          height={height}
          alt={name}
          src={src ?? "/assets/images/default-image.webp"}
          className={clsx("md:w-60 object-contain rounded-md", className)}
        />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="break-words whitespace-wrap max-w-[calc(36rem-3rem)] text-center">
            Dokumentasi
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center border rounded-md md:w-full">
          <Image
            width={400}
            height={400}
            alt={name}
            src={src ?? "/assets/images/default-image.webp"}
            className="rounded-md w-full object-cover max-h-[70vh]"
          />
        </div>
        <Separator />
        <DialogFooter>
          <DialogClose asChild className="mx-auto">
            <Button className="rounded-full">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalImage;
