"use client";

import {
  useGetProfile,
  useUserPhotoMutation,
} from "@/components/parts/users/api";
import {
  ProfilePhotoValidation,
  UserPhotoPayload,
} from "@/components/parts/users/validation";
import { CustomFormDragAndDrop } from "@/components/shared/forms/customFormDragAndDrop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function FormFotoProfile() {
  const qc = useQueryClient();
  const { data } = useGetProfile();
  const user = data?.data;

  const [open, setOpen] = useState(false);

  const userPhotosMutate = useUserPhotoMutation();

  const form = useForm<UserPhotoPayload>({
    resolver: zodResolver(ProfilePhotoValidation),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const profilePicture = watch("photos");

  if (errors) console.log(errors);

  const onSubmit = handleSubmit((data) => {
    const payload = { photos: data.photos };
    userPhotosMutate.mutate(payload, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["useGetProfile"] });
        setOpen(false);
      },
    });
  });

  useEffect(() => {
    if (user) {
      reset({
        photos: user.photos,
      });
    }
  }, [reset, user]);

  return (
    <div>
      <Avatar
        className="rounded-md size-20 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <AvatarImage
          src={user?.photos ?? "https://github.com/shadcn.png"}
          className="object-cover"
        />
        <AvatarFallback>{user?.name}</AvatarFallback>
      </Avatar>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Form {...form}>
              <div className="w-full flex flex-col gap-y-4">
                <CustomFormDragAndDrop<UserPhotoPayload>
                  name="photos"
                  acceptedFileTypes={[
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ]}
                />
                <Button
                  disabled={
                    profilePicture === undefined || userPhotosMutate.isPending
                  }
                  className="ml-auto rounded-full"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
