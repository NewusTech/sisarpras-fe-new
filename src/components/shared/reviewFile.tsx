import { Download, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const ReviewFile = ({ src }: { src: string }) => {
  const fileName = src.split("/").pop();
  return (
    <div className="border shadow-sm flex justify-between items-center p-3 rounded-lg">
      <p>{fileName ?? "-"}</p>
      <div className="flex gap-4 items-center">
        <Link href={src} target="_blank" className="hover:text-primary">
          <Eye />
        </Link>
        <Link href={src} download className="hover:text-primary">
          <Download />
        </Link>
      </div>
    </div>
  );
};

export default ReviewFile;
