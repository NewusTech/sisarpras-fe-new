import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import TitleHeader from "../shared/title";
import { Button } from "../ui/button";
import React from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

const CardHeader = ({ title, route }: { title: string; route?: string }) => {
  const router = useRouter();

  const handleBack = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };
  return (
    <>
      <div className="flex gap-2 items-center justify-start">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft />
          </Button>
          <TitleHeader title={title} />
        </div>
        <Badge variant="secondary">Detail</Badge>
      </div>
      <Separator />
    </>
  );
};

export default CardHeader;
