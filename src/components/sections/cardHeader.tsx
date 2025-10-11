import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import TitleHeader from "../shared/title";
import { Button } from "../ui/button";
import React from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import clsx from "clsx";

interface CardHeaderProps {
  title: string;
  route?: string;
  status?: string;
  className?: string;
  children?: React.ReactNode;
}
const CardHeader = ({
  title,
  route,
  status,
  children,
  className,
}: CardHeaderProps) => {
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
      <div
        className={clsx("flex gap-2 items-center justify-between", className)}
      >
        <div className="flex gap-2 items-center">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft />
          </Button>
          <TitleHeader title={title} />
          {status && <Badge variant="secondary">{status ?? "-"}</Badge>}
        </div>
        {children}
      </div>
      <Separator />
    </>
  );
};

export default CardHeader;
